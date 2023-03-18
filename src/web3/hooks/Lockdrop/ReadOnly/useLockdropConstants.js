import useLDEstimatedSHOReward from "./useLDEstimatedSHOReward";
import useLDDepositInfo from "./useLDDepositInfo";
import useLDAllocatedSHO from "./useLDAllocatedSHO";
import useLDWithdrawableMESH from "./useLDWithdrawableMESH";
import useLDVestingPeriod from "./useLDVestingPeriod";
import useLDClaimableSHO from "./useLDClaimableSHO";
import useLDWithdrawableLP from "./useLDWithdrawableLP";
import useLDIsSHOTokenReleased from "./useLDIsSHOTokenReleased";
import useLDTotalDeposit from "./useLDTotalDeposit";

export default function useLockdropConstants(fromAddress) {
  return {
    ...useLDEstimatedSHOReward(fromAddress),
    ...useLDDepositInfo(fromAddress),
    ...useLDAllocatedSHO(fromAddress),
    ...useLDWithdrawableMESH(fromAddress),
    ...useLDVestingPeriod(fromAddress),
    ...useLDClaimableSHO(fromAddress),
    ...useLDWithdrawableLP(fromAddress),
    ...useLDIsSHOTokenReleased(fromAddress),
    ...useLDTotalDeposit(fromAddress)
  };
}
