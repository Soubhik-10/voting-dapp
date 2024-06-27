import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { ThirdwebProvider } from "thirdweb/react";
import { VotingContextProvider } from "./context/context";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThirdwebProvider>
      <VotingContextProvider>
        <App />
      </VotingContextProvider>
    </ThirdwebProvider>
  </React.StrictMode>,
);
