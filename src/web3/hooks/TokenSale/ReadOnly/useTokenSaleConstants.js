import useTSTotalDeposit from "./useTSTotalDeposit";
import useTSTotalSHOSupply from "./useTSTotalSHOSupply";
import useTSDepositInfo from "./useTSDepositInfo";
import useTSWithdrawableToken from "./useTSWithdrawableToken";
import useTSWithdrawableUSDC from "./useTSWithdrawableUSDC";
import useTSIsSHOTokenReleased from "./useTSIsSHOTokenReleased";

export default function useTokenSaleConstants(fromAddress) {
  return {
    ...useTSTotalDeposit(fromAddress),
    ...useTSTotalSHOSupply(fromAddress),
    ...useTSDepositInfo(fromAddress),
    ...useTSWithdrawableToken(fromAddress),
    ...useTSWithdrawableUSDC(fromAddress),
    ...useTSIsSHOTokenReleased(fromAddress)
  };
}
