import React from "react";
import { useSnackbar } from "notistack";
import { TOAST_TYPE } from "../components/Snackbar/SigmaSnackbar";

export default function useSigmaSnackbar() {
  const { enqueueSnackbar } = useSnackbar();

  const showSnackbar = {
    success: (text, tx = null) => {
      enqueueSnackbar({
        text,
        type: TOAST_TYPE.SUCCESS,
        tx
      });
    },
    fail: (text) => {
      enqueueSnackbar({
        text,
        type: TOAST_TYPE.FAIL
      });
    },
    info: (text) => {
      enqueueSnackbar({
        text,
        type: TOAST_TYPE.INFO
      });
    }
  };

  return { showSnackbar };
}
