import React from "react";
import SigmaSnackbarProvider from "./components/Snackbar/SigmaSnackbarProvider";
import SigmaOnboardProvider from "./context/WalletConnector/SigmaOnboardProvider";
import SigmaRouterProvider from "./components/SigmaRouterProvider";

function App() {
  return (
    <SigmaOnboardProvider>
      <SigmaSnackbarProvider>
        <SigmaRouterProvider />
      </SigmaSnackbarProvider>
    </SigmaOnboardProvider>
  );
}

export default App;
