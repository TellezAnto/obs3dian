"use client";

import { useEffect, useState } from "react";
import { LitAbility, LitAccessControlConditionResource } from "@lit-protocol/auth-helpers";
import { LitNetwork } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { ethers } from "ethers";

const chain = "ethereum";

const useLit = () => {
  const [litNodeClient, setLitNodeClient] = useState<LitJsSdk.LitNodeClient | null>(null);

  useEffect(() => {
    const connectLit = async () => {
      const client = new LitJsSdk.LitNodeClient({
        litNetwork: LitNetwork.Cayenne,
      });
      await client.connect();
      setLitNodeClient(client);
    };

    connectLit();

    return () => {
      litNodeClient?.disconnect();
    };
  }, [litNodeClient]);

  const encryptMessage = async (message: string) => {
    if (!litNodeClient) return;

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

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: message,
        chain,
      },
      litNodeClient,
    );

    return {
      ciphertext,
      dataToEncryptHash,
    };
  };

  const decryptMessage = async (ciphertext: string, dataToEncryptHash: string) => {
    if (!litNodeClient) return;

    const sessionSigs = await litNodeClient.getSessionSigs({
      chain,
      resourceAbilityRequests: [
        {
          resource: new LitAccessControlConditionResource("*"),
          ability: LitAbility.AccessControlConditionDecryption,
        },
      ],
      authNeededCallback: async () => {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const walletAddress = await signer.getAddress();

        const latestBlockhash = await litNodeClient.getLatestBlockhash();

        const toSign = {
          domain: window.location.host,
          address: walletAddress,
          statement: "Sign in with Ethereum to the app.",
          uri: window.location.origin,
          version: "1",
          chainId: 1,
          nonce: latestBlockhash,
          issuedAt: new Date().toISOString(),
          expirationTime: new Date(Date.now() + 1000 * 60 * 60 * 24).toISOString(),
        };

        const authSig = await signer.signMessage(JSON.stringify(toSign));

        return {
          sig: authSig,
          derivedVia: "web3.eth.personal.sign",
          signedMessage: JSON.stringify(toSign),
          address: walletAddress,
        };
      },
    });

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
        sessionSigs,
      },
      litNodeClient,
    );

    return decryptedString;
  };

  return { encryptMessage, decryptMessage };
};

export default useLit;
