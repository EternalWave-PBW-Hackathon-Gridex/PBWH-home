import useSFRedeemableSHO from "./useSFRedeemableSHO";
import useSFWithdrawInfos from "./useSFWithdrawInfo";
import useSFXSHOExchangeRate from "./useSFXSHOExchangeRate";

export default function useSFConstants(fromAddress) {
  return {
    ...useSFXSHOExchangeRate(fromAddress),
    ...useSFWithdrawInfos(fromAddress),
    ...useSFRedeemableSHO(fromAddress)
  };
}
