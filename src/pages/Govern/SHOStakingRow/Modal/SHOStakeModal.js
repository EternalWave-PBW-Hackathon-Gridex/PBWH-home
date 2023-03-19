import React from "react";
import { debounce } from "lodash";

import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../../components/SigmaValueDisplay";
import { LoadingModal } from "../../../../components/Loading";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import Connector from "../../../../context/WalletConnector/Connector";
import SHOTokenContract from "../../../../web3/contracts/SHOTokenContract";
import useSFStakeSHO from "../../../../web3/hooks/SHOFarm/useSFStakeSHO";
import useSigmaCurrencyInput from "../../../../hooks/TextField/useSigmaCurrencyInput";
import SHOFarm from "../../../../web3/contracts/SHOFarmContract/SHOFarm";
import { TOKENS } from "../../../../web3/constants";
import useERC20 from "../../../../web3/hooks/ERC20/useERC20";
import SigmaButton from "../../../../components/Animation/SigmaButton";
import GRINFarm from "../../../../web3/contracts/GRINFarmContract/GRINFarm";
import GRINTokenContract from "../../../../web3/contracts/GRINTokenContract";

const SHOStakeModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance: SHOBalance,
    fetchBalance: fetchSHOBalance,
    displayBalance: displaySHOBalance,
    isLoadingBalance: isLoadingSHOBalance,

    /** isApproved */
    isApproved,
    fetchAllowance,

    /** Approve */
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  } = useERC20(GRINTokenContract);

  const {
    isLoadingStakeSHOTxFee,
    fetchStakeSHOTxFee,
    displayStakeSHOTxFee,
    setStakeSHOTxFeeLoading,

    isLoadingStakeSHOTx,
    fetchStakeSHOTx,
    isValidStakeSHOTx
  } = useSFStakeSHO();

  const {
    inputComponent,
    maxComponent,
    initInput,
    bn: inputBN,
    isValid: isValidInput,
    weiValue,
    isValidTxInInput
  } = useSigmaCurrencyInput({
    name: TOKENS.GRIN.name,
    placeholder: `${TOKENS.GRIN.name} to Stake`,
    balance: SHOBalance
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchSHOBalance(address);
    fetchAllowance(address, GRINFarm.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isValidTxInERC20) {
      if (!isLoadingStakeSHOTxFee) setStakeSHOTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isValidTxInERC20, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchStakeSHOTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Event */
  const onClickApprove = async () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidApproveTransaction) return;
    fetchApprove(GRINFarm.address).then(() => {
      fetchAllowance(address, GRINFarm.address);
    });
  };

  const onClickStake = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchStakeSHOTx(weiValue).then(() => {
      handleCancelPopup("Stake");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Stake");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isValidTxInInput && isValidTxInERC20 && isValidStakeSHOTx;
  }, [isValidTxInInput, isValidTxInERC20, isValidStakeSHOTx]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <UnitValueDisplay
        title="Balance"
        value={displaySHOBalance}
        unit={TOKENS.GRIN.name}
        className="mb-[10px]"
        loading={isLoadingSHOBalance}
      />
      <div
        className={`${
          isApproved ? "pointer-events-auto" : "pointer-events-none opacity-50"
        } flex w-full  transition-all hover:scale-105`}
      >
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.GRIN}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div>
      {isApproved && (
        <UnitValueDisplay
          title="Tx Fee"
          value={displayStakeSHOTxFee}
          unit={TOKENS.ETH.name}
          className="mt-[5px]"
          loading={isLoadingStakeSHOTxFee}
          error={false}
        />
      )}

      <div className="min-h-[10px]" />

      <div className="flex justify-between w-full sm:h-[60px] h-[50px]">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50] sm:text-[18px] text-[14px] font-semibold  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Stake");
          }}
        >
          Cancel
        </SigmaButton>
        {isApproved ? (
          <SigmaButton
            className={`relative overflow-hidden w-[46%] 
          ${isValidTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickStake}
          >
            <p>Stake</p>
            {isLoadingStakeSHOTx && (
              <LoadingModal
                className="absolute z-10 main_bg w-full h-full"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        ) : (
          <SigmaButton
            className={`relative overflow-hidden w-[46%] 
          ${isValidApproveTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickApprove}
          >
            <p>Approve</p>
            {isLoadingApproveButton && (
              <LoadingModal
                className="absolute z-10 main_bg w-full h-full"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        )}
      </div>
    </div>
  );
};

export default SHOStakeModal;
