import React from "react";
import { motion } from "framer-motion";
import SigmaButton from "../../../../../../components/Animation/SigmaButton";
import { LoadingModal } from "../../../../../../components/Loading";
import {
  LPTokenDisplay,
  UnitValueDisplay
} from "../../../../../../components/SigmaValueDisplay";
import Connector from "../../../../../../context/WalletConnector/Connector";
import useSigmaCurrencyInput from "../../../../../../hooks/TextField/useSigmaCurrencyInput";
import useSigmaDidMount from "../../../../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../../../../web3/constants";
import useERC20 from "../../../../../../web3/hooks/ERC20/useERC20";

const FundDeposit = ({ tokenTabInfo }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance,
    fetchBalance,
    displayBalance,
    isLoadingBalance,

    /** isApproved */
    isApproved,
    allowanceBN,
    fetchAllowance,

    /** Approve */
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  } = useERC20(tokenTabInfo.contract);

  const {
    inputComponent: DepositInput,
    maxComponent: DepositInputMax,
    numberValue,
    isPositive: isInputPositive,
    weiValue,
    isBiggerThanBalance
  } = useSigmaCurrencyInput({
    name: tokenTabInfo.name,
    placeholder: `${tokenTabInfo.name} to deposit`,
    balance: balance
  });

  useSigmaDidMount(() => {
    fetchBalance(address);
    fetchAllowance(address, "FundDeposit Contract address");
  }, [tokenTabInfo]);

  const onClickApprove = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidApproveTransaction) return;
    fetchApprove("FundDeposit Contract address").then(() => {
      fetchAllowance(address, "FundDeposit Contract address");
    });
  };

  const onClickDeposit = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    // if (!isValidDepositTransaction) return;
    // fetchDepositMESHTx(weiValue, lockMonth).then(() => {
    //   fetchMESHBalance(address);
    //   fetchDepositInfo(address);
    //   fetchAllocatedSHO(address);
    // });
  };

  return (
    <motion.div
      // variants={MOTION_VARIANTS}
      className="w-full flex flex-col items-center "
    >
      <div className="w-full flex flex-col items-center shogun_bg-secondary  rounded-md ">
        <UnitValueDisplay
          title="Balance"
          value={displayBalance}
          unit={tokenTabInfo.name}
          className="mb-[10px]"
          loading={isLoadingBalance}
          error={false}
          isWalletConnected={isWalletConnected}
        />
        <div className="flex w-full ">
          {DepositInput}
          {DepositInputMax}
          <LPTokenDisplay
            tokenInfo={tokenTabInfo}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>

        <div className=" flex flex-col w-full my-[24px] ">
          <UnitValueDisplay
            title="expected LP"
            value={"displayLockingAmount"}
            unit={`BTC_ETH_USDC_LP`}
            loading={false}
            error={null}
          />

          {isApproved && (
            <UnitValueDisplay
              title="Tx Fee"
              value={"displayDepositMESHTxFee"}
              unit={TOKENS.ETH.name}
              className="mt-[5px]"
              loading={false}
              error={false}
            />
          )}
        </div>
        {isApproved ? (
          <SigmaButton
            className={`relative overflow-hidden 
          ${"isValidDepositTransaction" ? "" : "opacity-50 cursor-not-allowed"}
      w-full h-[60px] flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
            onClick={onClickDeposit}
          >
            <p>Deposit</p>
            {"isLoadingDepositMESHTx" && (
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
    </motion.div>
  );
};

export default FundDeposit;
