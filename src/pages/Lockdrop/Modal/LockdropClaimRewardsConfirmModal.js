import React from "react";

import { LoadingModal } from "../../../components/Loading";
import { UnitValueDisplay } from "../../../components/SigmaValueDisplay";
import { TOKENS } from "../../../web3/constants";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import Connector from "../../../context/WalletConnector/Connector";
import useLockdropConstants from "../../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import useLDClaimSHO from "../../../web3/hooks/Lockdrop/useLDClaimSHO";

const LockdropClaimRewardsConfirmModal = ({ onSuccessTransactions }) => {
  let { address } = Connector.useContainer();
  const {
    isLoadingClaimableSHO,
    isPositiveClaimableSHO,
    displayClaimableSHO,
    fetchClaimableSHO
  } = useLockdropConstants(address);

  const {
    /** Tx Fee */
    isCallSuccessClaimSHOTxFee,
    isLoadingClaimSHOTxFee,
    fetchClaimSHOTxFee,
    displayClaimSHOTxFee,

    /** Tx */

    isLoadingClaimSHOTx,
    fetchClaimSHOTx
  } = useLDClaimSHO(address);

  useSigmaDidMount(() => {
    fetchClaimableSHO(address);
    fetchClaimSHOTxFee();
  }, [address]);

  /** Fetching */

  /** Event */

  const onClickClaim = () => {
    if (!isValidTransaction) return;
    fetchClaimSHOTx().then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("claimSHO");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return (
      isPositiveClaimableSHO &&
      isCallSuccessClaimSHOTxFee &&
      !isLoadingClaimSHOTx
    );
  }, [isPositiveClaimableSHO, isCallSuccessClaimSHOTxFee, isLoadingClaimSHOTx]);

  return (
    <div className={` flex flex-col w-full items-center relative`}>
      <div className="w-full flex items-center  mt-[5px]">
        <UnitValueDisplay
          title="Claimable SHO"
          value={displayClaimableSHO}
          unit={TOKENS.SHO.name}
          className=" text-white"
          loading={isLoadingClaimableSHO}
        />
      </div>

      <UnitValueDisplay
        title="Tx Fee"
        value={displayClaimSHOTxFee}
        unit={TOKENS.MATIC.name}
        className="mt-[5px] text-white"
        loading={isLoadingClaimSHOTxFee}
        error={false}
      />
      <div
        className={`${
          isValidTransaction ? "" : "cursor-not-allowed opacity-50"
        } relative overflow-hidden sm:h-[50px] h-[40px] mt-[15px]   w-full flex justify-center items-center rounded-md main_bg text-black sm:text-[18px]  text-[16px] font-medium`}
        onClick={onClickClaim}
      >
        <p>Claim</p>
        {isLoadingClaimSHOTx && (
          <LoadingModal
            className="absolute w-full h-full z-10 main_bg"
            loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
            message={null}
          />
        )}
      </div>
    </div>
  );
};

export default LockdropClaimRewardsConfirmModal;
