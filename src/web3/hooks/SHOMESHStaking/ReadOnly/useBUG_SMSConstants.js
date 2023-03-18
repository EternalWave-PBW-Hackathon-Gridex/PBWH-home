import useSMSBalanceOf from "./useBUG_SMSBalanceOf";
import useSMSEarned from "./useBUG_SMSEarned";

export default function useSMSConstants(fromAddress) {
  return { ...useSMSEarned(fromAddress), ...useSMSBalanceOf(fromAddress) };
}
