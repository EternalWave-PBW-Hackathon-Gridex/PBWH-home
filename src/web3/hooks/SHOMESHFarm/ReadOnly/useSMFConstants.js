import useSMFBasePending from "./useSMFBasePending";
import useSMFBoostPending from "./useSMFBoostPending";
import useSMFTotalBoostWeight from "./useSMFTotalBoostWeight";
import useSMFUserInfo from "./useSMFUserInfo";

export default function useSMFConstants(fromAddress) {
  return {
    ...useSMFUserInfo(fromAddress),
    ...useSMFBasePending(fromAddress),
    ...useSMFBoostPending(fromAddress),
    ...useSMFTotalBoostWeight(fromAddress)
  };
}
