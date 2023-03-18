import useSMSBalanceOf from "./useSMSBalanceOf";
import useSMSEarned from "./useSMSEarned";

export default function useSMSConstants(fromAddress) {
  return { ...useSMSEarned(fromAddress), ...useSMSBalanceOf(fromAddress) };
}
