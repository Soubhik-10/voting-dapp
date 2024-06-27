import React, { useState, useEffect } from "react";
import { readContract } from "thirdweb";
import { Link } from "react-router-dom";
import { useVotingContext } from "../context/context";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { createWallet } from "thirdweb/wallets";
interface Candidate {
  candidateAddress: string;
  name: string;
  symbol: string;
  desc: string;
  votes: bigint;
}

const Result = () => {
  const [winner, setWinner] = useState<Candidate | null>(null);
  const { contract, client } = useVotingContext();
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const getCandidates = async () => {
    try {
      const wallet = createWallet("io.metamask");

      // connect the wallet, this returns a promise that resolves to the connected account
      const account = await wallet.connect({
        // pass the client you created with `createThirdwebClient()`
        client,
      });
      const transaction = await prepareContractCall({
        contract,
        method:
          "function getResults() returns ((address candidateAddress, string name, string symbol, string desc, uint256 votes)[])",
        params: [],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transaction) {
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
      }
      //   console.log(formattedCandidates);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    getCandidates();
  }, []);
  useEffect(() => {
    if (candidates.length > 0) {
      const sortedCandidates = [...candidates].sort(
        (a, b) => Number(b.votes) - Number(a.votes),
      );
      setWinner(sortedCandidates[0]);
    }
  }, [candidates]);

  return (
    <div className="h-screen w-full bg-gray-900 text-white p-8">
      <h1 className="text-4xl font-bold text-center mb-8">Election Results</h1>
      <div className="space-y-4">
        {candidates.map((candidate) => (
          <div
            key={candidate.candidateAddress}
            className={`p-4 rounded-lg shadow-md ${
              winner?.candidateAddress === candidate.candidateAddress
                ? "bg-green-600"
                : "bg-gray-800"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="text-3xl">{candidate.symbol}</div>
                <div>
                  <h2 className="text-2xl font-bold">{candidate.name}</h2>
                  <p className="text-gray-400">{candidate.desc}</p>
                </div>
              </div>
              <div className="text-2xl font-bold">
                {Number(candidate.votes)} votes
              </div>
            </div>
          </div>
        ))}
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

export default Result;
