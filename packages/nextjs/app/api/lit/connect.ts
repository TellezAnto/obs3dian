import { LitNetwork } from "@lit-protocol/constants";
import * as LitJsSdk from "@lit-protocol/lit-node-client";
import { NextApiRequest, NextApiResponse } from "next";

let litNodeClient: LitJsSdk.LitNodeClient | null = null;

const connectLit = async () => {
  if (!litNodeClient) {
    litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: LitNetwork.Cayenne,
    });
    await litNodeClient.connect();
  }
  return litNodeClient;
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await connectLit();
    res.status(200).json({ message: "Connected to Lit Network" });
  } catch (error) {
    res.status(500).json({ error: "Failed to connect to Lit Network" });
  }
};

export default handler;
