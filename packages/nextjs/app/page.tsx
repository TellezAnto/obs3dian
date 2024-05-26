"use client";

import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="avatar">
          <div className="w-24 rounded">
            <img src="https://www.depot62.com/cdn/shop/files/obsidian.jpg?v=1683474096" />
          </div>
        </div>
        <div className="px-5">
          <h1 className="text-center">
            <span className="block text-2xl mb-2">Web 3 your digital brain</span>
            <span className="block text-4xl font-bold">OBS3DIAN</span>
          </h1>
          <div className="flex justify-center items-center space-x-2">
            <p className="my-2 font-medium">Connected Address:</p>
            <Address address={connectedAddress} />
          </div>
        </div>

        <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12"></div>
      </div>
    </>
  );
};

export default Home;
