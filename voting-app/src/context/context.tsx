import React, { useContext, createContext, ReactNode } from "react";
import {
  createThirdwebClient,
  getContract,
  defineChain,
  // useMetamask,
  ThirdwebClient,
} from "thirdweb";
import { createWallet } from "thirdweb/wallets";
const wallets = [createWallet("io.metamask")];
//import { ethers } from "ethers";

interface VotingContextProps {
  //connect: () => void;
  contract: any;
  wallets: any;
  client: any;
}

const VotingContext = createContext<VotingContextProps | undefined>(undefined);

const client: ThirdwebClient = createThirdwebClient({
  clientId: import.meta.env.VITE_CLIENT_ID as string,
});

interface VotingContextProviderProps {
  children: ReactNode;
}

export const VotingContextProvider = ({
  children,
}: VotingContextProviderProps) => {
  const contract = getContract({
    client,
    chain: defineChain(11155111),
    address: "0x237D79C076933260CDaC6835c10D879C312A6BBE",
  });

  // const connect =;

  return (
    <VotingContext.Provider
      value={{
        // connect,
        contract,
        wallets,
        client,
      }}
    >
      {children}
    </VotingContext.Provider>
  );
};

export const useVotingContext = () => {
  const context = useContext(VotingContext);
  if (context === undefined) {
    throw new Error(
      "useStateContext must be used within a VotingContextProvider",
    );
  }
  return context;
};
