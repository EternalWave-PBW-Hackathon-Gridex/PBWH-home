import React from "react";
import { debounce } from "lodash";

import { LoadingModal } from "../../../components/Loading";
import {
  UnitValueDisplay,
  LPTokenDisplay
} from "../../../components/SigmaValueDisplay";
import {
  BN,
  convertToETH,
  isBNPositive,
  BN_FORMAT,
  convertToWei
} from "../../../web3/utils/AKBN";
// import useFarmDepositLP from "../../hooks/Farm/useFarmDepositLP";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import useSigmaCurrencyInput from "../../../hooks/TextField/useSigmaCurrencyInput";
import useERC20 from "../../../web3/hooks/ERC20/useERC20";
import Connector from "../../../context/WalletConnector/Connector";
import LPFarm from "../../../web3/contracts/LPFarmContract/LPFarm";
import { TOKENS } from "../../../web3/constants";
import SigmaButton from "../../../components/Animation/SigmaButton";
import useLFDepositLP from "../../../web3/hooks/LPFarm/useLFDepositLP";
import useFFDepositLP from "../../../web3/hooks/FundFarm/useFFDepositLP";
import FundFarmContract from "../../../web3/contracts/FundFarmContract";

const FarmLPDeposit = ({
  onSuccessTransactions,
  farmItem,
  LPTokenContract
}) => {
  const { poolId, checkAllowanceRequest, approveRequest, getBalanceRequest } =
    farmItem.lp;
  const { token } = farmItem;

  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance: LPTokenBalance,
    isPositiveBalance,
    fetchBalance: fetchLPTokenBalance,
    displayBalance: displayLPTokenBalance,
    isLoadingBalance: isLoadingLPTokenBalance,

    /** isApproved */
    isApproved,
    isLoadingAllowance,
    isAllowanceCallSuccess,
    fetchAllowance,

    /** Approve */
    isLoadingApproveTrx,
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton
  } = useERC20(LPTokenContract);

  const {
    inputComponent,
    maxComponent,
    isPositive: isInputPositive,
    weiValue,
    mweiValue,
    isBiggerThanBalance
  } = useSigmaCurrencyInput({
    name: token.name,
    placeholder: `${token.name} to Deposit`,
    balance: LPTokenBalance
  });

  const {
    /** Tx Fee */
    isCallSuccessDepositLPTxFee,
    isLoadingDepositLPTxFee,
    fetchDepositLPTxFee,
    displayDepositLPTxFee,
    setDepositLPTxFeeLoading,

    /** Tx */
    isLoadingDepositLPTx,
    fetchDepositLPTx,

    /** Helpers */
    isValidDepositLPTx
  } = useFFDepositLP();

  /** LifeCycle */

  useSigmaDidMount(() => {
    fetchLPTokenBalance(address);
    fetchAllowance(address, FundFarmContract.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (
      isWalletConnected &&
      isInputPositive &&
      isApproved &&
      !isBiggerThanBalance
    ) {
      if (!isLoadingDepositLPTxFee) setDepositLPTxFeeLoading(true);
      onDebounce(weiValue);
    }
  }, [
    isApproved,
    weiValue,
    isWalletConnected,
    isInputPositive,
    isBiggerThanBalance
  ]);

  const onDebounce = React.useCallback(
    debounce((weiValue) => {
      fetchDepositLPTxFee(weiValue);
    }, 1000),
    [address]
  );

  /** Initializers */

  /** Event */

  const onClickApprove = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidApproveTransaction) return;
    fetchApprove(FundFarmContract.address).then(() => {
      fetchAllowance(address, FundFarmContract.address);
    });
  };

  const onClickFarm = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidDepositTransaction) return;
    fetchDepositLPTx(weiValue).then(() => {
      if (typeof onSuccessTransactions === "function")
        onSuccessTransactions("depositLP");
    });
  };

  /** UI */

  /** Validations */

  const isValidDepositTransaction = React.useMemo(() => {
    return (
      isInputPositive &&
      !isBiggerThanBalance &&
      isPositiveBalance &&
      isApproved &&
      isWalletConnected &&
      isValidDepositLPTx
    );
  }, [
    isInputPositive,
    isBiggerThanBalance,
    isPositiveBalance,
    isApproved,
    isWalletConnected,
    isValidDepositLPTx
  ]);

  return (
    <div className={` flex flex-col items-center relative`}>
      {isLoadingDepositLPTx && (
        <LoadingModal
          className="absolute w-full h-full z-10 outer_bg "
          loadingClassName={"sm:w-[80px] w-[50px] sm:h-[80px] h-[50px]"}
          messageClassName={
            "sm:text-[20px] text-[16px] md:mt-[20px] mt-[10px] text-white"
          }
        />
      )}

      <div className="w-full">
        <UnitValueDisplay
          title={`Balance`}
          value={displayLPTokenBalance}
          unit={farmItem.token.name}
          className=" text-white mt-[5px]"
          loading={isLoadingLPTokenBalance}
        />
        <div className="min-h-[5px]" />

        <div
          className={`${
            isApproved
              ? "pointer-events-auto"
              : "pointer-events-none opacity-50"
          } flex w-full  transition-all hover:scale-105`}
        >
          {inputComponent}
          {maxComponent}

          <LPTokenDisplay
            tokenInfo={farmItem.token}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>
      </div>

      {isWalletConnected && isApproved && (
        <UnitValueDisplay
          title="Tx Fee"
          value={displayDepositLPTxFee}
          unit={TOKENS.ETH.name}
          className="mt-[5px] text-white"
          loading={isLoadingDepositLPTxFee}
          error={false}
        />
      )}
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        {isApproved ? (
          <SigmaButton
            className={`${
              !isValidDepositTransaction ? "cursor-not-allowed opacity-50" : ""
            } w-full overflow-hidden  h-full    flex justify-center items-center rounded-md main_bg text-black `}
            onClick={onClickFarm}
          >
            <p>Farm</p>
          </SigmaButton>
        ) : (
          <SigmaButton
            className={`relative overflow-hidden 
          ${isValidApproveTransaction ? "" : "opacity-50 cursor-not-allowed"}
           w-full h-full flex justify-center items-center main_bg text-black rounded-md   `}
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

export default FarmLPDeposit;
