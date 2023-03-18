import React from "react";
// import { useSnackbar } from "notistack";
// import Swal from "sweetalert2";
import { debounce } from "lodash";
import { motion } from "framer-motion";
import {
  DashboardColumnItem,
  UnitValueDisplay,
  LPTokenDisplay
} from "../../components/SigmaValueDisplay";
import { TOKENS } from "../../web3/constants";
import { LoadingModal } from "../../components/Loading";

import useTimeout from "../../hooks/useTimeout";
import useDidMount from "../../hooks/useDidMount";
import useSigmaCurrencyInput from "../../hooks/TextField/useSigmaCurrencyInput";
import SigmaButton from "../../components/Animation/SigmaButton";
import useERC20 from "../../web3/hooks/ERC20/useERC20";
import MESHTokenContract from "../../web3/contracts/MESHTokenContract";
import Connector from "../../context/WalletConnector/Connector";
import LockdropContract from "../../web3/contracts/LockdropContract";
import useLockdropConstants from "../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import useLDDepositMESH from "../../web3/hooks/Lockdrop/useLDDepositMESH";
import { STAGE_TYPES } from ".";

import {
  SigmaFormatAlert,
  ALERT_TYPE,
  useSigmaAlert
} from "../../components/SigmaAlert";
import LockdropWithdrawOneNumberInput from "./Modal/LockdropWithdrawOneNumberInput";
import useSigmaDidMount from "../../hooks/useSigmaDidMount";

const LOCK_PERIODS_INFO = [
  { month: 1, weightRate: 0.8, seconds: "2628000" },
  { month: 3, weightRate: 2.7, seconds: "7884000" },
  { month: 6, weightRate: 6, seconds: "15770000" },
  { month: 9, weightRate: 11, seconds: "23650000" },
  { month: 12, weightRate: 22, seconds: "31540000" }
];

const LDDepositDashboard = ({
  STAGE_TWO_END_UNIX,
  stageType,
  MOTION_VARIANTS,
  onSuccessTransaction
}) => {
  // const { enqueueSnackbar } = useSnackbar();
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();
  const didMount = useDidMount();

  const [lockPeriodIndex, setLockPeriodIndex] = React.useState(3);
  const lockMonth = React.useMemo(
    () => LOCK_PERIODS_INFO[lockPeriodIndex].seconds,
    [lockPeriodIndex]
  );

  const {
    displayDeposit,
    displayLockedUntil,
    withdrewAtPhase2,
    isValidWithdrewAtPhase2,
    isLoadingDepositInfo,
    isPositiveDeposit,
    fetchDepositInfo,

    isLoadingAllocatedSHO,
    displayExpectedSHOReward,
    fetchAllocatedSHO,

    isLoadingEstimatedSHOReward,
    isValidEstimatedSHOReward,
    displayNumberFormatEstimatedSHOReward,
    setEstimatedSIGRewardLoading,
    fetchEstimatedSHOReward
  } = useLockdropConstants(address);

  const {
    balance: MESHBalance,
    isPositiveBalance,
    fetchBalance: fetchMESHBalance,
    displayBalance: displayMESHBalance,
    isLoadingBalance: isLoadingMESHBalance,

    /** isApproved */
    isApproved,
    isLoadingAllowance,
    isAllowanceCallSuccess,
    fetchAllowance,

    /** Approve */
    isLoadingApproveTrx,
    fetchApprove,

    isLoadingApproveButton
  } = useERC20(MESHTokenContract);

  const {
    inputComponent: MeshDepositInput,
    maxComponent: MeshDepositInputMax,
    numberValue,
    isPositive: isInputPositive,
    weiValue,
    isBiggerThanBalance
  } = useSigmaCurrencyInput({
    name: "MESH",
    placeholder: "MESH to deposit",
    balance: MESHBalance
  });

  const {
    isCallSuccessDepositMESHTxFee,
    isLoadingDepositMESHTxFee,
    fetchDepositMESHTxFee,
    setDepositMESHTxFeeLoading,
    displayDepositMESHTxFee,

    isLoadingDepositMESHTx,
    fetchDepositMESHTx
  } = useLDDepositMESH();

  /** Life Cycles */
  useSigmaDidMount(() => {
    fetchMESHBalance(address);
    fetchAllowance(address, LockdropContract.address);
    fetchDepositInfo(address);
    fetchAllocatedSHO(address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (
      isInputPositive &&
      isWalletConnected &&
      isApproved &&
      !isBiggerThanBalance
    ) {
      if (!isLoadingEstimatedSHOReward) setEstimatedSIGRewardLoading();
      if (!isLoadingDepositMESHTxFee) setDepositMESHTxFeeLoading(true);
      onDebounceEstimateSIG(weiValue, lockMonth, address);
      onDebounceDepositMESHGas(weiValue, lockMonth, address);
    }
  }, [
    isInputPositive,
    weiValue,
    lockPeriodIndex,
    isWalletConnected,
    isApproved,
    isBiggerThanBalance
  ]);

  const onDebounceEstimateSIG = React.useCallback(
    debounce(async (amount, lockMonth, address) => {
      fetchEstimatedSHOReward(amount, lockMonth);
    }, 1000),
    []
  );

  const onDebounceDepositMESHGas = React.useCallback(
    debounce((amount, lockMonth, address) => {
      fetchDepositMESHTxFee(amount, lockMonth);
    }, 1000),
    []
  );

  /** Event */

  const onClickDeposit = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidDepositTransaction) return;
    fetchDepositMESHTx(weiValue, lockMonth).then(() => {
      fetchMESHBalance(address);
      fetchDepositInfo(address);
      fetchAllocatedSHO(address);
    });
  };

  const onClickApprove = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidApproveTransaction) return;
    fetchApprove(LockdropContract.address).then(() => {
      fetchAllowance(address, LockdropContract.address);
    });
  };

  const onClickLockPeriod = (index) => {
    setLockPeriodIndex(index);
  };

  const onClickWithdraw = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidWithdraw) {
      if (!isValidWithdrewAtPhase2) return;
      if (withdrewAtPhase2) {
        SigmaFormatAlert({
          alertType: ALERT_TYPE.LOCKDROP_ALEADY_WITHDRAW_KSP
        });
      }
      return;
    }
    openModal();
  };

  const onSuccessTransactions = (type) => {
    switch (type) {
      case "withdraw":
        closeModal();
        fetchMESHBalance(address);
        fetchDepositInfo(address);
        fetchAllocatedSHO(address);
        break;

      default:
        break;
    }
  };

  /** Validations */
  const isValidApproveTransaction = React.useMemo(() => {
    return !isLoadingApproveTrx && isAllowanceCallSuccess;
  }, [isLoadingApproveTrx, isAllowanceCallSuccess]);

  const isValidDepositTransaction = React.useMemo(() => {
    return (
      isInputPositive &&
      !isBiggerThanBalance &&
      isPositiveBalance &&
      isApproved &&
      isCallSuccessDepositMESHTxFee &&
      !isLoadingDepositMESHTx &&
      isWalletConnected
    );
  }, [
    isInputPositive,
    isBiggerThanBalance,
    isPositiveBalance,
    isApproved,
    isCallSuccessDepositMESHTxFee,
    isLoadingDepositMESHTx,
    isWalletConnected
  ]);

  const isValidWithdraw = React.useMemo(() => {
    return (
      isPositiveDeposit &&
      !withdrewAtPhase2 &&
      isValidWithdrewAtPhase2 &&
      isWalletConnected
    );
  }, [
    isPositiveDeposit,
    withdrewAtPhase2,
    isValidWithdrewAtPhase2,
    isWalletConnected
  ]);

  /** UI */

  const displayLockingAmount = React.useMemo(() => {
    return numberValue / 2;
  }, [numberValue]);

  const { popupComponent, openModal, closeModal } = useSigmaAlert({
    defaultInfo: { title: "Withdraw" },
    children: (
      <LockdropWithdrawOneNumberInput
        displayDeposit={displayDeposit}
        onSuccessTransactions={onSuccessTransactions}
        isUnlimited={stageType === STAGE_TYPES.UNLIMITED.key}
      />
    )
  });

  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className="md:w-[780px] w-full flex flex-col items-center "
    >
      {/* Withdraw */}
      <div className=" w-full flex md:flex-row flex-col justify-between items-center shogun_bg-secondary md:px-[30px] px-[20px] py-[20px] rounded-md ">
        <DashboardColumnItem
          className="md:w-[calc((100%-60px)/2)] w-full"
          title="Your Deposits"
          contentNode={<p>{`${displayDeposit} MESH`}</p>}
          loading={isLoadingDepositInfo}
          isWalletConnected={isWalletConnected}
        />
        <DashboardColumnItem
          className="md:w-[calc((100%-60px)/2)] w-full"
          title="Locked until"
          contentNode={
            <p className="whitespace-pre-line">{displayLockedUntil}</p>
          }
          loading={isLoadingDepositInfo}
          isWalletConnected={isWalletConnected}
        />

        <DashboardColumnItem
          className="md:w-[calc((100%-60px)/2)] w-full"
          title="Expected SHO rewards"
          contentNode={<p className="">{`${displayExpectedSHOReward} SHO`}</p>}
          loading={isLoadingAllocatedSHO}
          isWalletConnected={isWalletConnected}
        />
        <SigmaButton
          className={`${
            isValidWithdraw ? "" : "opacity-50 cursor-not-allowed"
          } md:w-[calc((100%-60px)/2)] w-full main_bg text-black  sm:min-h-[60px] min-h-[48px] flex justify-center items-center sm:text-[18px] text-[14px]  font-semibold rounded-md  md:mt-0 mt-[15px]`}
          onClick={onClickWithdraw}
        >
          Withdraw
        </SigmaButton>
        {popupComponent}
      </div>
      <div className=" min-h-[20px]" />
      {/* Deposit */}
      {stageType === STAGE_TYPES.UNLIMITED.key && (
        <div className="w-full flex flex-col items-center shogun_bg-secondary p-[30px]  rounded-md ">
          <UnitValueDisplay
            title="Balance"
            value={displayMESHBalance}
            unit={"MESH"}
            className="mb-[10px]"
            loading={isLoadingMESHBalance}
            error={false}
            isWalletConnected={isWalletConnected}
          />
          <div className="flex w-full ">
            {MeshDepositInput}
            {MeshDepositInputMax}
            <LPTokenDisplay
              tokenInfo={TOKENS.MESH}
              className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
            />
          </div>

          <div className=" min-h-[40px]" />

          <LockPeriod
            LOCK_PERIODS_INFO={LOCK_PERIODS_INFO}
            lockPeriodIndex={lockPeriodIndex}
            onClickLockPeriod={onClickLockPeriod}
          />

          <div className=" flex flex-col w-full my-[24px] ">
            <UnitValueDisplay
              title="Locking Amount"
              value={displayLockingAmount}
              unit={`MESH / ${displayLockingAmount} shoMESH`}
              className="mb-[5px]"
              loading={false}
              error={null}
            />

            <div className="flex  mb-[5px] ">
              <UnitValueDisplay
                title="Expected SHO rewards"
                value={
                  isApproved
                    ? displayNumberFormatEstimatedSHOReward
                    : "Please approve first"
                }
                unit={isApproved ? TOKENS.SHO.name : ""}
                className=" w-fit "
                loading={isLoadingEstimatedSHOReward}
                error={null}
              />
            </div>

            {isWalletConnected && isApproved && (
              <UnitValueDisplay
                title="Tx Fee"
                value={displayDepositMESHTxFee}
                unit={TOKENS.MATIC.name}
                className="mt-[5px]"
                loading={isLoadingDepositMESHTxFee}
                error={false}
              />
            )}
          </div>
          {isApproved ? (
            <SigmaButton
              className={`relative overflow-hidden 
              ${
                isValidDepositTransaction ? "" : "opacity-50 cursor-not-allowed"
              }
          w-full h-[60px] flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
              onClick={onClickDeposit}
            >
              <p>Deposit</p>
              {isLoadingDepositMESHTx && (
                <LoadingModal
                  className="absolute z-10 main_bg w-full h-full"
                  loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                  message={null}
                />
              )}
            </SigmaButton>
          ) : (
            <SigmaButton
              className={`relative overflow-hidden ${
                isValidApproveTransaction ? "" : "opacity-50 cursor-not-allowed"
              }
    
          w-full sm:min-h-[60px] min-h-[48px] flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
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
      )}
    </motion.div>
  );
};

const LockPeriod = ({
  lockPeriodIndex,
  onClickLockPeriod,
  LOCK_PERIODS_INFO
}) => {
  return (
    <div className="flex flex-col items-center w-full">
      <p className="md:text-[20px] text-[16px] mb-[24px]">
        Choose Lock Period (Months)
      </p>
      <div className="flex w-full h-[60px]  rounded-md">
        {LOCK_PERIODS_INFO.map((periodInfo, index) => {
          const isLastIndex = index === 4;
          const isFirstIndex = index === 0;
          return (
            <SigmaButton
              className={`flex justify-center items-center w-[20%] hover:border-hidden hover:bg-[#aa00ff] border-[#ffffff50]  border-y-[1px]  ${
                !isLastIndex && "border-r-[1px] "
              } ${isFirstIndex && "rounded-l-md border-l-[1px]"} ${
                isLastIndex && "rounded-r-md border-r-[1px]"
              } ${
                lockPeriodIndex === index && "main_bg text-black border-hidden"
              }`}
              key={`LockPeriodItem-${index}`}
              onClick={() => {
                onClickLockPeriod(index);
              }}
            >
              {periodInfo.month}
            </SigmaButton>
          );
        })}
      </div>
    </div>
  );
};

export default LDDepositDashboard;
