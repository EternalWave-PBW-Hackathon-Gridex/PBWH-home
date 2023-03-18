import React from "react";
import useDidMount from "./useDidMount";
import useTimeout from "./useTimeout";
import Connector from "../context/WalletConnector/Connector";

export default function useSigmaDidMount(
  callback,
  dependencies = [],
  isWalletCheck = true
) {
  const didMount = useDidMount();
  let { isWalletConnected, address } = Connector.useContainer();
  const walletDependencies = isWalletCheck ? [isWalletConnected] : [];

  useTimeout(
    () => {
      if (!didMount) return;
      if (isWalletCheck && !isWalletConnected) return;
      if (typeof callback === "function") callback();
    },
    1000,
    [didMount, address, ...dependencies, ...walletDependencies]
  );
}
