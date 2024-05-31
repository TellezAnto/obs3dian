"use client";

import HomeFeed from "../components/HomeFeed";
import { Address } from "../components/scaffold-eth/Address";
import { Post } from "../interfaces/post";
import { useAccount } from "wagmi";

const HomeContent = ({ allPosts }: { allPosts: Post[] }) => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex items-center flex-col flex-grow pt-10">
      <div className="px-5">
        <h1 className="text-center">
          <span className="block text-4xl font-bold ">OBS3DIAN</span>
          <span className="block text-2xl ">Your web3 digital brain </span>
        </h1>
        <div className="flex justify-center items-center space-x-2">
          <p className="my-2 font-medium">Connected Address:</p>
          <Address address={connectedAddress} />
        </div>
      </div>
      <div className="flex-grow bg-base-300 w-full mt-16 px-8 py-12">
        <HomeFeed allPosts={allPosts} />
      </div>
    </div>
  );
};

export default HomeContent;
