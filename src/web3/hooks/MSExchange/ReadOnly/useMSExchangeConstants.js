import useMSECurrentPool from "./useMSECurrentPool";
import useMSMESHPrice from "./useMSMESHPrice";
import useMSETotalSupply from "./useMSETotalSupply";
import useMSSHOPrice from "./useMSSHOPrice";
import useMSSHOMESHPrice from "./useMSSHOMESHPrice";
export default function useMSExchangeConstants(fromAddress) {
  return {
    ...useMSECurrentPool(fromAddress),
    ...useMSMESHPrice(fromAddress),
    ...useMSSHOPrice(fromAddress),
    ...useMSSHOMESHPrice(fromAddress),
    ...useMSETotalSupply(fromAddress)
  };
}
