import React from "react";
import { ethers } from "ethers";
import LockdropContract from "../../../contracts/LockdropContract";
import { ContractCallState } from "../../../constants";
import useConstantProperties from "../../useConstantProperties";
import useNumericTokenConstants from "../../useNumericTokenConstants";

export default function useLDVestingPeriod(fromAddress) {
  /** vestingPeriod */
  const [vestingPeriod, setVestingPeriod] = React.useState(null);
  const [vestingPeriodState, setVestingPeriodState] = React.useState(
    ContractCallState.NEW
  );

  const fetch = async () => {
    try {
      setVestingPeriodState(ContractCallState.FETCHING);
      let vestingPeriod = await LockdropContract.vestingPeriod({
        from: fromAddress
      });

      setVestingPeriodState(ContractCallState.SUCCESS);
      setVestingPeriod(vestingPeriod.toString());
    } catch (error) {
      console.error(error.message);
      setVestingPeriodState(ContractCallState.ERROR);
      setVestingPeriod(null);
    }
  };
  const { isCallSuccess, isLoading } =
    useConstantProperties(vestingPeriodState);
  const { bn, isValid } = useNumericTokenConstants(
    vestingPeriod,
    isCallSuccess
  );

  const numbered = React.useMemo(() => (isValid ? bn.toNumber() : 0));

  return {
    vestingPeriod,
    numberedVestingPeriod: numbered,
    isLoadingVestingPeriod: isLoading,
    isCallSuccessVestingPeriod: isCallSuccess,

    fetchVestingPeriod: fetch
  };
}
