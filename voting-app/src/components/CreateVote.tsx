import React, { useState, useEffect, FC } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useVotingContext } from "../context/context";
import { useActiveAccount } from "thirdweb/react";
import { Link } from "react-router-dom";
import { createWallet } from "thirdweb/wallets";
const CreateVote = () => {
  const [candidateName, setCandidateName] = useState<string>("");
  const [candidateAddress, setCandidateAddress] = useState<string>("");
  const [candidateSymbol, setCandidateSymbol] = useState<string>("");
  const [candidateDesc, setCandidateDesc] = useState<string>("");
  const [voteDuration, setVoteDuration] = useState<string>("");
  const [isOwner, setIsOwner] = useState(false);
  const { contract, wallets, client } = useVotingContext();
  const [success, setSuccess] = useState(false);
  const [voteCreated, setVoteCreated] = useState(false);
  const OWNER = import.meta.env.VITE_OWNER as string;
  const address = useActiveAccount()?.address;
  useEffect(() => {
    const timer = setTimeout(() => {
      setSuccess(false);
      setVoteCreated(false);
    }, 10000);
    return () => clearTimeout(timer);
  }, [success, voteCreated]);
  useEffect(() => {
    if (address == OWNER) {
      setIsOwner(true);
    }
  }, []);
  const handleCreateVote = async () => {
    setVoteCreated(false);
    const wallet = createWallet("io.metamask");
    const account = await wallet.connect({
      client,
    });
    const time = BigInt(voteDuration) * BigInt(3600);
    if (wallet && isOwner) {
      const transaction = await prepareContractCall({
        contract,
        method: "function startVote(uint256 time)",
        params: [time],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        setVoteCreated(true);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSuccess(false);
    const candidateDetails = {
      name: candidateName,
      address: candidateAddress,
      symbol: candidateSymbol,
      desc: candidateDesc,
    };
    setCandidateName("");
    setCandidateAddress("");
    setCandidateSymbol("");
    setCandidateDesc("");
    const wallet = createWallet("io.metamask");
    const account = await wallet.connect({
      client,
    });
    if (wallet && isOwner) {
      const transaction = await prepareContractCall({
        contract,
        method:
          "function addCandidates(address _candidateAddress, string _name, string _symbol, string _desc)",
        params: [
          `0x${candidateDetails.address.slice(2)}`,
          candidateDetails.name,
          candidateDetails.symbol,
          candidateDetails.desc,
        ],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        setSuccess(true);
      }
    }
  };

  return (
    <div className="h-screen w-full flex flex-col md:flex-col items-center justify-center bg-welcome gradient-bg-welcome">
      <div className="max-w-lg mx-auto bg-gray-900 rounded-lg shadow-md p-6 space-y-6 text-white green-glassmorphism">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-white">Candidate Name</label>
            <input
              type="text"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block  text-white">Candidate Address</label>
            <input
              type="text"
              value={candidateAddress}
              onChange={(e) => setCandidateAddress(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div className="">
            <label className="block  text-white w-auto">Candidate Symbol</label>
            <input
              type="text"
              value={candidateSymbol}
              onChange={(e) => setCandidateSymbol(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <div>
            <label className="block  text-white">Candidate Description</label>
            <textarea
              value={candidateDesc}
              onChange={(e) => setCandidateDesc(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 border-gray-700 text-white"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
          >
            Submit Candidate
          </button>
          {success && (
            <h2 className="bold bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
              Successfully Created
            </h2>
          )}
        </form>
        <div>
          <label className="block  text-white">Vote Duration (hrs)</label>
          <input
            type="number"
            value={voteDuration}
            onChange={(e) => setVoteDuration(e.target.value)}
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500 bg-gray-800 border-gray-700 text-white"
          />
          <button
            onClick={handleCreateVote}
            className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
          >
            Create Vote
          </button>
          {voteCreated && (
            <h2 className="bold bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
              Successfully Created
            </h2>
          )}
        </div>
      </div>
      <div className="w-full flex items-center justify-center">
        <Link
          to="/"
          className="bg-gray-500 text-white py-2 px-4 mt-1 rounded-md hover:bg-gray-600"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default CreateVote;
