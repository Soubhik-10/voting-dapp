import { createThirdwebClient, getContract, resolveMethod } from "thirdweb";
import { defineChain } from "thirdweb/chains";
import { ThirdwebProvider } from "thirdweb/react";
import Landing from "./components/Landing";
import Features from "./components/Features";
import AddUser from "./components/AddUser";
import Vote from "./components/Vote";
import Result from "./components/Result";
// create the client with your clientId, or secretKey if in a server environment
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateVote from "./components/CreateVote";
export const client = createThirdwebClient({
  clientId: "YOUR_CLIENT_ID",
});

function App() {
  return (
    <ThirdwebProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/createvote" element={<CreateVote />} />
          <Route path="/adduser" element={<AddUser />} />
          <Route path="/vote" element={<Vote />} />
          <Route path="/result" element={<Result />} />
        </Routes>
      </Router>
    </ThirdwebProvider>
  );
}
export default App;
