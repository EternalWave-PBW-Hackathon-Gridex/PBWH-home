import useERC20Balance from "../../ERC20/useERC20Balance";
import useBIETHBalance from "./useBIETHBalance";
import useBIGDXBalance from "./useBIGDXBalance";
// import useLFBasePending from "./useLFBasePending";
import useLFBoostPending from "./useLFBoostPending";
import useLFLockdropWithdrawable from "./useLFLockdropWithdrawable";
import useLFPoolInfo from "./useLFPoolInfo";
import useLFUserInfo from "./useLFUserInfo";

export default function useBIConstants(fromAddress) {
  return {
    ...useBIETHBalance(fromAddress),
    ...useBIGDXBalance(fromAddress)
  };
}
