import React from "react";
import { SnackbarProvider } from "notistack";
import { SigmaSnackbar, durationTime } from "./SigmaSnackbar";

const SigmaSnackbarProvider = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={4}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      autoHideDuration={durationTime}
      disableWindowBlurListener={true}
      content={(key, message) => {
        return <SigmaSnackbar key={key} message={message} />;
      }}
    >
      {children}
    </SnackbarProvider>
  );
};

export default SigmaSnackbarProvider;
