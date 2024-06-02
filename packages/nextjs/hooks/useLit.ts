"use client";

import { useEffect, useState } from "react";
import { LitNetwork } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";
import { SiweMessage } from "siwe";

const chain = "ethereum";

const useLit = () => {
  const [litNodeClient, setLitNodeClient] = useState<LitJsSdk.LitNodeClient | null>(null);

  useEffect(() => {
    const connectLit = async () => {
      const client = new LitJsSdk.LitNodeClient({
        litNetwork: LitNetwork.Habanero,
      });
      await client.connect();
      setLitNodeClient(client);
    };

    connectLit();

    return () => {
      litNodeClient?.disconnect();
    };
  }, [litNodeClient]);

  const getAuthSig = async () => {
    if (!litNodeClient) throw new Error("LitNodeClient is not connected");

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const signer = provider.getSigner();
    const walletAddress = await signer.getAddress();

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address: walletAddress,
      statement: "Sign in with Ethereum to the app.",
      uri: window.location.origin,
      version: "1",
      chainId: 1,
      nonce: await litNodeClient.getLatestBlockhash(),
      issuedAt: new Date().toISOString(),
      expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
    });

    const messageToSign = siweMessage.prepareMessage();
    const signature = await signer.signMessage(messageToSign);

    return {
      sig: signature,
      derivedVia: "web3.eth.personal.sign",
      signedMessage: messageToSign,
      address: walletAddress,
    };
  };

  const encryptMessage = async (message: string) => {
    if (!litNodeClient) throw new Error("LitNodeClient is not connected");

    const accessControlConditions: Array<any> = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];

    const authSig = await getAuthSig();

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: message,
        chain,
        authSig,
      },
      litNodeClient,
    );

    return {
      ciphertext,
      dataToEncryptHash,
    };
  };

  const decryptMessage = async (ciphertext: string, dataToEncryptHash: string) => {
    if (!litNodeClient) throw new Error("LitNodeClient is not connected");

    const authSig = await getAuthSig();

    const accessControlConditions: Array<any> = [
      {
        contractAddress: "",
        standardContractType: "",
        chain: "ethereum",
        method: "eth_getBalance",
        parameters: [":userAddress", "latest"],
        returnValueTest: {
          comparator: ">=",
          value: "1000000000000", // 0.000001 ETH
        },
      },
    ];

    const decryptedString = await LitJsSdk.decryptToString(
      {
        accessControlConditions,
        chain,
        ciphertext,
        dataToEncryptHash,
        authSig,
      },
      litNodeClient,
    );

    return decryptedString;
  };

  return { encryptMessage, decryptMessage };
};

export default useLit;
