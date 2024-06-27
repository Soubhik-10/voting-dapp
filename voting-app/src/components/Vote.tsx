import React, { useState, useEffect } from "react";
import Counter from "./Counter";
import { readContract } from "thirdweb";
import { useVotingContext } from "../context/context";
import CandidateList from "./CandidateList";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
import { Link } from "react-router-dom";
interface Candidate {
  candidateAddress: string;
  name: string;
  symbol: string;
  desc: string;
  votes: bigint;
}

const Vote = () => {
  const { contract, client } = useVotingContext();
  const [time, setTime] = useState<number>(0);
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [isVoter, setIsVoter] = useState<boolean | null>(null);
  const [voted, setVoted] = useState<boolean | null>(false);
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const address = useActiveAccount()?.address;
  const OWNER = import.meta.env.VITE_OWNER as string;
  if (address) {
    const { data, isLoading } = useReadContract({
      contract,
      method: "function isVoter(address) view returns (bool)",
      params: [address],
    });

    useEffect(() => {
      if (data !== undefined) {
        setIsVoter(data);
        //console.log(data);

        if (address == OWNER) {
          setIsOwner(true);
        }
      }
    }, [data]);
  }
  const getTime = async () => {
    try {
      const data = await readContract({
        contract,
        method: "function getRemainingTime() view returns (uint256)",
        params: [],
      });
      setTime(Number(data));
    } catch (error) {
      console.error("Error fetching remaining time:", error);
    }
  };

  useEffect(() => {
    getTime();
  }, []);

  const getCandidates = async () => {
    try {
      const data = await readContract({
        contract,
        method:
          "function getCandidates() view returns ((address candidateAddress, string name, string symbol, string desc, uint256 votes)[])",
        params: [],
      });
      // Ensure that the returned data is correctly typed as Candidate[]
      const formattedCandidates: Candidate[] = data.map((candidate: any) => ({
        candidateAddress: candidate.candidateAddress,
        name: candidate.name,
        symbol: candidate.symbol,
        desc: candidate.desc,
        votes: BigInt(candidate.votes),
      }));
      setCandidates(formattedCandidates);
      //   console.log(formattedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);

  const handleVote = async (candidateAddress: string) => {
    const wallet = createWallet("io.metamask");

    // connect the wallet, this returns a promise that resolves to the connected account
    const account = await wallet.connect({
      // pass the client you created with `createThirdwebClient()`
      client,
    });
    const transaction = await prepareContractCall({
      contract,
      method: "function vote(address toBeVoted)",
      params: [`0x${candidateAddress.slice(2)}`],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
  };
  const resetVote = async () => {
    const wallet = createWallet("io.metamask");

    // connect the wallet, this returns a promise that resolves to the connected account
    const account = await wallet.connect({
      // pass the client you created with `createThirdwebClient()`
      client,
    });
    const transaction = await prepareContractCall({
      contract,
      method: "function resetVote()",
      params: [],
    });
    const { transactionHash } = await sendTransaction({
      transaction,
      account,
    });
  };
  return (
    <div className="h-screen scrollbar-hide">
      <div className=" top-0 mt-2">
        <Counter time={time} />
      </div>
      <div className="h-screen w-full bg-welcome flex flex-col items-center justify-center">
        {isVoter && !voted && (
          <CandidateList candidates={candidates} onVote={handleVote} />
        )}

        <div className="flex flex-col justify-center m-2 p-1">
          {isOwner && (
            <button
              onClick={resetVote}
              className="w-full bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
            >
              Reset Voting
            </button>
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
    </div>
  );
};

export default Vote;
