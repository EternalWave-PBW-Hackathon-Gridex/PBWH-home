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
import useETHInput from "./useETHInput";
import useGDXInput from "./useGDXInput";

import SwapIcon from "../../../../../../assets/images/global_icon-swap.png";

const FundDeposit = ({ tokens }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    component: ETHComponent,
    setInput: setETHInput,
    setIsEnable: setIsETHEnable,
    stringValue: ethStringValue
  } = useETHInput({
    token: tokens[0]
  });

  const {
    component: GDXComponent,
    setInput: setGDXInput,
    setIsEnable: setIsGDXEnable,
    stringValue: gdxStringValue
  } = useGDXInput({
    token: tokens[1]
  });
  // const [isGDXEnable, setIsGDXEnable] = React.useState(true);

  useSigmaDidMount(() => {
    setGDXInput(0);
    setETHInput(0);
  }, []);

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

  React.useEffect(() => {
    setIsETHEnable(false);
    setGDXInput(ethStringValue);
    setIsGDXEnable(true);
  }, [ethStringValue]);

  React.useEffect(() => {
    setIsGDXEnable(false);
    setETHInput(gdxStringValue);
    setIsETHEnable(true);
  }, [gdxStringValue]);

  return (
    <motion.div
      // variants={MOTION_VARIANTS}
      className="w-full flex flex-col items-center "
    >
      {ETHComponent}
      <div className="flex justify-center items-center w-full min-h-[60px] my-[10px]">
        <img className="w-[60px]" src={SwapIcon} alt="swap" />
      </div>
      {GDXComponent}
      <div className="w-full flex flex-col items-center shogun_bg-secondary  rounded-md ">
        <div className=" flex flex-col w-full my-[24px] ">
          <UnitValueDisplay
            title="expected LP"
            value={"displayLockingAmount"}
            unit={`BTC_ETH_USDC_LP`}
            loading={false}
            error={null}
          />

          <UnitValueDisplay
            title="Tx Fee"
            value={"displayDepositMESHTxFee"}
            unit={TOKENS.ETH.name}
            className="mt-[5px]"
            loading={false}
            error={false}
          />
        </div>
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
      </div>
    </motion.div>
  );
};

export default FundDeposit;
