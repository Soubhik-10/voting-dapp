// components/InspectorButtons.tsx
import React, { useEffect, useState, useContext } from "react";
import { useVotingContext } from "../context/context";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Contract } from "ethers";
import Landing from "./Landing";
import { Link } from "react-router-dom";
import { SiEthereum } from "react-icons/si";
import { BsInfoCircle } from "react-icons/bs";
const OWNER = import.meta.env.VITE_OWNER as string;
interface ReadContractResponse {
  data: boolean | null;
  isLoading: boolean;
}

const Features = () => {
  const { contract } = useVotingContext();
  const wallet = useActiveAccount()?.address;
  const [isInspector, setIsInspector] = useState<boolean | null>(null);
  const [isVoter, setIsVoter] = useState<boolean | null>(null);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isActive, setIsActive] = useState<boolean | null>(true);

  if (wallet) {
    const { data, isLoading } = useReadContract({
      contract,
      method: "function isInspector(address) view returns (bool)",
      params: [wallet],
    });

    useEffect(() => {
      if (data !== undefined) {
        setIsInspector(data);
      }
    }, [data]);
  }
  if (wallet) {
    const { data, isLoading } = useReadContract({
      contract,
      method: "function isVoter(address) view returns (bool)",
      params: [wallet],
    });

    useEffect(() => {
      if (data !== undefined) {
        setIsVoter(data);
      }
    }, [data]);
  }
  if (wallet) {
    const { data, isLoading } = useReadContract({
      contract,
      method: "function isVoter(address) view returns (bool)",
      params: [wallet],
    });

    useEffect(() => {
      if (data !== undefined) {
        setIsInspector(data);
        console.log(data);
      }
      if (wallet == OWNER) {
        setIsOwner(true);
      }
    }, [data]);
  }

  return (
    <div className="h-screen w-full flex flex-col md:flex-col items-center justify-center bg-welcome gradient-bg-welcome">
      {/* Left section: Ethereum Card */}
      <div className="flex flex-row items-center justify-center w-full md:w-1/2 md:mt-0 mt-10 px-4 white-glassmorphism">
        <div className="p-3 flex flex-col my-5 h-40 sm:w-72 w-full m-2">
          <p className="text-semibold text-xl">
            Welcome User :{" "}
            {wallet?.slice(0, 7) + "..." + wallet?.slice(35, wallet?.length)}{" "}
            <br /> to the ultimate voting app. Choose your options from the menu
            below.
          </p>
        </div>
        <div className="p-3 flex flex-col my-5 white-glassmorphism eth-card rounded-xl h-40 sm:w-72 w-full">
          <div className="flex flex-col w-full h-full justify-between">
            <div className="flex justify-between items-start">
              <div className="w-10 h-10 border-2 border-white flex justify-center items-center rounded-full">
                <SiEthereum fontSize={21} color="white" />
              </div>
              <BsInfoCircle fontSize={17} color="white" />
            </div>
            <div>
              <p className="text-white font-light text-sm">
                {wallet?.slice(0, 5) +
                  "..." +
                  wallet?.slice(39, wallet?.length)}
              </p>
              <p className="text-white font-bold text-lg mt-1">Ethereum</p>
            </div>
          </div>
        </div>
      </div>

      {/* Right section: Voting Buttons */}
      <div className="w-full md:w-1/2 p-8 white-glassmorphism rounded-lg shadow-lg space-y-6">
        {isOwner && (
          <div className="">
            <div className="flex flex-col gap-2">
              {isActive && (
                <Link to="/createvote" className="w-full flex">
                  <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                    Create New Vote
                  </button>
                </Link>
              )}
              <Link to="/adduser" className="w-full flex">
                <button className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
                  Add new Voting Inspector
                </button>
              </Link>
            </div>
          </div>
        )}

        {isInspector && (
          <div className="flex flex-row justify-center">
            <Link to="/adduser" className="w-full flex">
              <button className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600">
                Add voters
              </button>
            </Link>
          </div>
        )}

        {isVoter ? (
          <div className="flex flex-col gap-2">
            <Link to="/vote" className="w-full flex">
              <button className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600">
                Vote Now
              </button>
            </Link>
            <Link to="/result" className="w-full flex">
              <button className="w-full bg-yellow-500 text-white py-2 px-4 rounded-md hover:bg-yellow-600">
                View Results
              </button>
            </Link>
          </div>
        ) : (
          <div className="text-center">
            <p className="text-gray-500">You are not a registered Voter</p>
          </div>
        )}
        <div className="w-full flex items-center justify-center">
          <Link
            to="/"
            className="bg-gray-500 text-white flex py-2 px-4 mt-1 rounded-md hover:bg-gray-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};
export default Features;
