import React from "react";
import { ConnectButton } from "thirdweb/react";
import { useVotingContext } from "../context/context"; // Adjust the import path as needed
import { useState, useEffect } from "react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";
import Features from "./Features";

const Landing: React.FC = () => {
  const { contract, wallets, client } = useVotingContext();
  const [isConnected, setIsConnected] = useState(false);
  const commonstyles =
    "min-h-[70px] sm:px-0 px-2 sm:min-w-[120px] flex justify-center items-center border-[0.5px] border-gray-400 text-sm font-light text-white";
  return (
    <div className="landing bg-cover bg-center h-screen flex flex-col items-center justify-center ">
      <div className=" text-white">
        <div className="blue-glassmorphism p-8 rounded-md text-center">
          <h1 className="font-bold text-6xl p-4">
            The Future of Voting is Here!
          </h1>
          <p className="text-lg p-4">
            Welcome to our innovative voting platform, powered by the Ethereum
            blockchain. Our app brings you a secure, transparent, and
            tamper-proof way to conduct elections and polls. With the power of
            blockchain technology, every vote is immutable and verifiable,
            ensuring the integrity of the voting process. Join us in embracing
            the future of democratic participation, where every vote counts and
            the process is fair for everyone.
          </p>
          <div className="grid sm:grid-cols-3 grid-cols-2 sm:w-full md:w-auto m-1 p-2 blue-glassmorphism">
            <div className={`rounded-tl-2xl ${commonstyles}`}>Reliability</div>
            <div className={`rounded-tr-2xl md:rounded-none ${commonstyles}`}>
              Security
            </div>
            <div className={`sm:rounded-tr-2xl ${commonstyles}`}>Ethereum</div>
            <div className={`sm:rounded-bl-2xl ${commonstyles}`}>Web-3.0</div>
            <div className={`rounded-bl-2xl md:rounded-none ${commonstyles}`}>
              Transparent
            </div>
            <div className={` rounded-br-2xl ${commonstyles}`}>Blockchain</div>
          </div>
          <ConnectButton
            client={client}
            wallets={wallets}
            theme="dark"
            connectModal={{ size: "wide" }}
          />
        </div>
      </div>
      <div className="flex border-white border-2 p-4">
        {useActiveWalletConnectionStatus() == "connected" ? (
          <Features />
        ) : (
          <p className="font-bold capitalize text-yellow-200">
            Connect wallet to get started
          </p>
        )}
      </div>
    </div>
  );
};

export default Landing;
{
  /*  <ConnectButton
        client={client}
        wallets={wallets}
        theme="dark"
        connectModal={{ size: "compact" }}
      /> */
}
