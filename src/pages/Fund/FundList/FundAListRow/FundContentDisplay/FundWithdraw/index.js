import { motion } from "framer-motion";
import React from "react";
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
const FundWithdraw = () => {
  /** States */
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const { balance, fetchBalance, displayBalance, isLoadingBalance } =
    useERC20("LP Contract");

  const {
    inputComponent,
    maxComponent,
    numberValue,
    isPositive: isInputPositive,
    weiValue,
    isBiggerThanBalance,
    setInput,
    setIsEnable,
    stringValue
  } = useSigmaCurrencyInput({
    name: "Index LP",
    placeholder: `ETH-GDX Index Fund LP to deposit`,
    balance: balance
  });

  useSigmaDidMount(() => {
    fetchBalance(address);
  });

  const onClickWithdraw = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    // if (!isValidWithdrawTransaction) return;
    // fetchWithdrawMESHTx(weiValue, lockMonth).then(() => {
    //   fetchMESHBalance(address);
    //   fetchWithdrawInfo(address);
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
          unit={"ETH-GDX Index LP"}
          className="mb-[10px]"
          loading={isLoadingBalance}
          error={false}
          isWalletConnected={isWalletConnected}
        />
        <div className="flex w-full ">
          {inputComponent}
          {maxComponent}
          <LPTokenDisplay
            tokenInfo={{
              name: "ETH-GDX"
            }}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>
      </div>
      <div className="w-full flex flex-col items-center shogun_bg-secondary  rounded-md ">
        <div className=" flex flex-col w-full my-[24px] ">
          <UnitValueDisplay
            title="Tx Fee"
            value={"displayWithdrawMESHTxFee"}
            unit={TOKENS.ETH.name}
            className="mt-[5px]"
            loading={false}
            error={false}
          />
        </div>
        <SigmaButton
          className={`relative overflow-hidden 
      ${"isValidWithdrawTransaction" ? "" : "opacity-50 cursor-not-allowed"}
  w-full h-[40px] flex justify-center items-center main_bg text-black sm:text-[18px] text-[14px] font-semibold rounded-md   `}
          onClick={onClickWithdraw}
        >
          <p>Withdraw</p>
          {"isLoadingWithdrawMESHTx" && (
            <LoadingModal
              className="absolute z-10 main_bg w-full h-full"
              loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
              message={null}
            />
          )}
        </SigmaButton>
      </div>
    </motion.div>
  );
};

export default FundWithdraw;
