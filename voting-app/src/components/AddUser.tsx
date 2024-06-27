import React, { useState, useEffect } from "react";
import { prepareContractCall, sendTransaction } from "thirdweb";
import { useVotingContext } from "../context/context";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Link } from "react-router-dom";
import { createWallet } from "thirdweb/wallets";

const AddUser: React.FC = () => {
  const [voterAddress, setVoterAddress] = useState("");
  const [inspectorAddress, setInspectorAddress] = useState("");
  const [voterSuccess, setVoterSuccess] = useState(false);
  const [inspectorSuccess, setInspectorSuccess] = useState(false);
  const { contract, wallets, client } = useVotingContext();
  const [isOwner, setIsOwner] = useState<boolean | null>(null);
  const [isInspector, setIsInspector] = useState<boolean | null>(true);
  const address = useActiveAccount()?.address;
  const OWNER = import.meta.env.VITE_OWNER as string;
  if (address) {
    const { data, isLoading } = useReadContract({
      contract,
      method: "function isInspector(address) view returns (bool)",
      params: [address],
    });

    useEffect(() => {
      if (data !== undefined) {
        setIsInspector(data);
      }
    }, [data]);
    useEffect(() => {
      if (address == OWNER) {
        setIsOwner(true);
      }
    }, [data]);
  }
  const handleAddVoter = async () => {
    if (isInspector || isOwner) {
      console.log(`Adding inspector: ${inspectorAddress}`);
      const wallet = createWallet("io.metamask");
      const account = await wallet.connect({
        client,
      });
      const transaction = await prepareContractCall({
        contract,
        method: "function addInspector(address _inspector)",
        params: [`0x${voterAddress.slice(2)}`],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        setVoterSuccess(true);
      }
      setTimeout(() => setVoterSuccess(false), 3000); // Hide message after 3 seconds
      setVoterAddress("");
    }
  };

  const handleAddInspector = async () => {
    // Simulating a successful transaction
    if (isOwner) {
      console.log(`Adding inspector: ${inspectorAddress}`);
      const wallet = createWallet("io.metamask");
      const account = await wallet.connect({
        client,
      });
      const transaction = await prepareContractCall({
        contract,
        method: "function addInspector(address _inspector)",
        params: [`0x${inspectorAddress.slice(2)}`],
      });
      const { transactionHash } = await sendTransaction({
        transaction,
        account,
      });
      if (transactionHash) {
        setInspectorSuccess(true);
      }
      setTimeout(() => setInspectorSuccess(false), 3000);
      // Hide message after 3 seconds
      setInspectorAddress("");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-welcome text-white p-4">
      <div className="w-full max-w-md space-y-8 white-glassmorphism p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-8 text-center">Add Users</h1>
        {(isOwner || isInspector) && (
          <div>
            <label className="block mb-2 text-lg">Voter Address</label>
            <input
              type="text"
              value={voterAddress}
              onChange={(e) => setVoterAddress(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="Enter voter wallet address"
            />
            <button
              onClick={handleAddVoter}
              className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg font-semibold"
            >
              Add Voter
            </button>
            {voterSuccess && (
              <h2 className="className=bold bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
                Voter Added Successfully!
              </h2>
            )}
          </div>
        )}
        {isOwner && (
          <div>
            <label className="block mb-2 text-lg">
              Voting Inspector Address
            </label>
            <input
              type="text"
              value={inspectorAddress}
              onChange={(e) => setInspectorAddress(e.target.value)}
              className="w-full p-3 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Enter inspector wallet address"
            />
            <button
              onClick={handleAddInspector}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold"
            >
              Add Inspector
            </button>
            {inspectorSuccess && (
              <h2 className="bold bg-green-500 text-black rounded-lg font-serif text-xl text-center border-2 border-yellow-50 p-2">
                Voting Inspector Added Successfully
              </h2>
            )}
          </div>
        )}
        <div className="w-full flex items-center justify-center">
          <Link
            to="/"
            className="bg-gray-500 text-white py-2 px-4 mt-1 rounded-md hover:bg-gray-600"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AddUser;
