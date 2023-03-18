import useXSFClaimableVXSHO from "./useXSFClaimableVXSHO";
import useXSFStakedXSHO from "./useXSFStakedXSHO";

export default function useXSFConstants(fromAddress) {
  return {
    ...useXSFClaimableVXSHO(fromAddress),
    ...useXSFStakedXSHO(fromAddress)
  };
}
