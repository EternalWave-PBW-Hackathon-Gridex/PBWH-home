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
import useSMFFarm from "../../../../../web3/hooks/SHOMESHFarm/useSMFFarm";
import SHOMESHFarm from "../../../../../web3/contracts/SHOMESHFarmContract/SHOMESHFarm";

const SHOMESHFarmModal = ({ handleCancelPopup, onSuccessTransactions }) => {
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
    fetchFarmTxFee,
    displayFarmTxFee,
    isLoadingFarmTxFee,
    setFarmTxFeeLoading,

    isLoadingFarmTx,
    fetchFarmTx,
    isValidFarmTx
  } = useSMFFarm();

  const { inputComponent, maxComponent, weiValue, isValidTxInInput } =
    useSigmaCurrencyInput({
      name: TOKENS.shoMESH.name,
      placeholder: `${TOKENS.shoMESH.name} to Farm`,
      balance: SHOMESHBalance
    });

  /** LifeCycle */
  useSigmaDidMount(() => {
    fetchSHOMESHBalance(address);
    fetchAllowance(address, SHOMESHFarm.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (isWalletConnected && isValidTxInInput && isValidTxInERC20) {
      if (!isLoadingFarmTxFee) {
        setFarmTxFeeLoading();
      }
      onDebounce(weiValue);
    }
  }, [isValidTxInInput, isValidTxInERC20, weiValue, isWalletConnected]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchFarmTxFee(weiValue);
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
    fetchApprove(SHOMESHFarm.address).then(() => {
      fetchAllowance(address, SHOMESHFarm.address);
    });
  };

  const onClickFarm = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidTransaction) return;
    fetchFarmTx(weiValue).then(() => {
      handleCancelPopup("Farm");
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("Farm");
    });
  };

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return isValidTxInInput && isValidTxInERC20 && isValidFarmTx;
  }, [isValidTxInInput, isValidTxInERC20, isValidFarmTx]);

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
          value={displayFarmTxFee}
          unit={TOKENS.MATIC.name}
          className="mt-[5px]"
          loading={isLoadingFarmTxFee}
          error={false}
        />
      )}

      <div className="min-h-[10px]" />

      <div className="flex justify-between w-full sm:h-[60px] h-[50px]">
        <SigmaButton
          className="w-[46%] h-full flex justify-center items-center text-white border-[1px] border-[#ffffff50] sm:text-[18px] text-[14px] font-semibold  rounded-md AKBtnEffect"
          onClick={() => {
            handleCancelPopup("Farm");
          }}
        >
          Cancel
        </SigmaButton>
        {isApproved ? (
          <SigmaButton
            className={`relative overflow-hidden w-[46%] 
          ${isValidTransaction ? "" : "opacity-50 cursor-not-allowed"}
            h-full flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickFarm}
          >
            <p>Farm</p>
            {isLoadingFarmTx && (
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

export default SHOMESHFarmModal;
