import React from "react";
import { ConnectButton } from "thirdweb/react";
import { useVotingContext } from "../context/context"; // Adjust the import path as needed
import { useState, useEffect } from "react";
import { useActiveWalletConnectionStatus } from "thirdweb/react";

const Landing: React.FC = () => {
  const { contract, wallets, client } = useVotingContext();
  const [isConnected, setIsConnected] = useState(false);

  return (
    <div className="landing bg-cover bg-center h-screen flex flex-col items-center justify-center ">
      <div className=" text-white">
        <div className="bg-black bg-opacity-50 p-8 rounded-md text-center">
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
          <ConnectButton
            client={client}
            wallets={wallets}
            theme="dark"
            connectModal={{ size: "wide" }}
          />
        </div>
      </div>
      <div>
        {useActiveWalletConnectionStatus() == "connected" ? (
          <p>djksn</p>
        ) : (
          <p>Connect wallet to get started</p>
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
