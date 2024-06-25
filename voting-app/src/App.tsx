import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";

// create the client with your clientId, or secretKey if in a server environment
export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});

// connect to your contract
export const contract = getContract({
  client,
  chain: defineChain(11155111),
  address: "0x69915C04EA5ad1ED199fd73C7f06C8ca5690a6Da",
});

function App() {
  return (
    <ThirdwebProvider>
      <div>Yoooo</div>
    </ThirdwebProvider>
  );
}
