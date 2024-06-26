// components/InspectorButtons.tsx
import React, { useEffect, useState, useContext } from "react";
import { useVotingContext } from "../context/context";
import { useActiveAccount, useReadContract } from "thirdweb/react";
import { Contract } from "ethers";
import Landing from "./Landing";

interface UseReadContractProps {
  contract: Contract;
  method: string;
  params: any[];
}

interface ReadContractResponse {
  data: boolean | null;
  isLoading: boolean;
}

const Features = () => {
  const { contract } = useVotingContext();
  const wallet = useActiveAccount()?.address;
  const [isInspector, setIsInspector] = useState<boolean | null>(null);

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
    console.log(data);
  }

  return (
    <div>
      {isInspector ? (
        <div>
          <button>add voters</button>
          <button>vote</button>
        </div>
      ) : (
        <div>You are not an inspector</div>
      )}
    </div>
  );
};
export default Features;
