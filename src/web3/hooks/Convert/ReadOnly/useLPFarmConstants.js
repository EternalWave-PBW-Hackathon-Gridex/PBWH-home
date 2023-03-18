import useERC20Balance from "../../ERC20/useERC20Balance";
import useLFBasePending from "./useLFBasePending";
import useLFBoostPending from "./useLFBoostPending";
import useLFLockdropWithdrawable from "./useLFLockdropWithdrawable";
import useLFPoolInfo from "./useLFPoolInfo";
import useLFUserInfo from "./useLFUserInfo";

export default function useLPFarmConstants(fromAddress) {
  return {
    ...useLFLockdropWithdrawable(fromAddress),
    ...useLFUserInfo(fromAddress),
    ...useLFBasePending(fromAddress),
    ...useLFBoostPending(fromAddress),
    ...useLFPoolInfo(fromAddress)
  };
}
