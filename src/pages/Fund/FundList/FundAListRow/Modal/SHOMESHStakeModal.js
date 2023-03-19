import React from "react";
import { debounce } from "lodash";

import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../../../components/SigmaValueDisplay";
import { LoadingModal } from "../../../../../components/Loading";
import useSigmaDidMount from "../../../../../hooks/useSigmaDidMount";
import Connector from "../../../../../context/WalletConnector/Connector";
import useSigmaCurrencyInput from "../../../../../hooks/TextField/useSigmaCurrencyInput";
import { TOKENS } from "../../../../../web3/constants";
import useERC20 from "../../../../../web3/hooks/ERC20/useERC20";
import SigmaButton from "../../../../../components/Animation/SigmaButton";
import MeshswapEscrowContract from "../../../../../web3/contracts/MeshswapEscrowContract";
import useSMSStake from "../../../../../web3/hooks/SHOMESHStaking/useSMSStake";
import SHOMESHStaking from "../../../../../web3/contracts/SHOMESHStakingContract/SHOMESHStaking";

const SHOMESHStakeModal = ({ handleCancelPopup, onSuccessTransactions }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance: SHOMESHBalance,
    fetchBalance: fetchSHOMESHBalance,
    displayBalance: displaySHOMESHBalance,
    isLoadingBalance: isLoadingSHOMESHBalance,

    /** isApproved */
    isApproved,
    allowanceBN,
    fetchAllowance,

    /** Approve */
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  } = useERC20(MeshswapEscrowContract);

  const {
    fetchStakeTxFee,
    displayStakeTxFee,
    isLoadingStakeTxFee,
    setStakeTxFeeLoading,

    isLoadingStakeTx,
    fetchStakeTx,
    isValidStakeTx
  } = useSMSStake();

  const {
    inputComponent,
    maxComponent,
    initInput,
    bn: inputBN,
    isValid: isValidInput,
    weiValue,
    stringValue,
    isValidTxInInput
  } = useSigmaCurrencyInput({
    name: TOKENS.shoMESH.name,
    placeholder: `${TOKENS.shoMESH.name} to Stake`,
    balance: SHOMESHBalance
  });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchSHOMESHBalance(address);
    fetchAllowance(address, SHOMESHStaking.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isValidTxInERC20) {
      if (!isLoadingStakeTxFee) setStakeTxFeeLoading();
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isValidTxInERC20, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchStakeTxFee(weiValue);
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
    fetchApprove(SHOMESHStaking.address).then(() => {
      fetchAllowance(address, SHOMESHStaking.address);
    });
  };

  const onClickStake = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchStakeTx(weiValue).then(() => {
      handleCancelPopup("Stake");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Stake");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isValidTxInInput && isValidTxInERC20 && isValidStakeTx;
  }, [isValidTxInInput, isValidTxInERC20, isValidStakeTx]);

  /** UI */

  return (
    <div className={`mt-[35px] flex flex-col items-center relative w-full`}>
      <UnitValueDisplay
        title="Balance"
        value={displaySHOMESHBalance}
        unit={TOKENS.shoMESH.name}
        className="mb-[10px]"
        loading={isLoadingSHOMESHBalance}
      />
      <div
        className={`${
          isApproved ? "pointer-events-auto" : "pointer-events-none opacity-50"
        } flex w-full  transition-all hover:scale-105`}
      >
        {inputComponent}
        {maxComponent}

        <LPTokenDisplay
          tokenInfo={TOKENS.shoMESH}
          className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
        />
      </div>
      {isApproved && (
        <UnitValueDisplay
          title="Tx Fee"
          value={displayStakeTxFee}
          unit={TOKENS.ETH.name}
          className="mt-[5px]"
          loading={isLoadingStakeTxFee}
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
            {isLoadingStakeTx && (
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

export default SHOMESHStakeModal;
