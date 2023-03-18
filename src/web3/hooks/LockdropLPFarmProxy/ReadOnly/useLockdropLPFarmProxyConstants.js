import useLDPIsForwarded from "./useLDPIsForwarded";
import useLDPIsLPTokenReleased from "./useLDPIsLPTokenReleased";
import useLDPWithdrawableLP from "./useLDPWithdrawableLP";

export default function useLockdropLPFarmProxyConstants(fromAddress) {
  return {
    ...useLDPIsForwarded(fromAddress),
    ...useLDPIsLPTokenReleased(fromAddress),
    ...useLDPWithdrawableLP(fromAddress)
  };
}
