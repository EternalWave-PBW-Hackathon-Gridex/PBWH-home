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
  convertToWei,
  convertToSixDecimalWei,
  convertToSixDecimalETH
} from "../../../web3/utils/AKBN";
import useSigmaSlippage from "../../../hooks/TextField/useSigmaSlippage";

import FarmPlus from "../../../assets/images/farm_plus.png";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../web3/constants";
import useSigmaCurrencyInput from "../../../hooks/TextField/useSigmaCurrencyInput";

const SHOUSDCLPFarmAddLiquidity = ({
  onSuccessTransactions: onSuccessFarmTransactions,
  farmItem,
  handleNext
}) => {
  /** Initializers */
  const { poolId, tokenA, tokenB } = farmItem.lp;

  /**  Input Values */

  // const onSuccessAddLiquidityTransactions = (type, _trxHash) => {
  //   switch (type) {
  //     case "tokenAApprove":
  //       tokenA_fetchCheckAllowance();
  //       break;
  //     case "tokenBApprove":
  //       tokenB_fetchCheckAllowance();
  //       break;
  //     case "addKctLiquidityWithLimit":
  //       handleNext();
  //       break;

  //     default:
  //       break;
  //   }
  //   if (
  //     onSuccessFarmTransactions &&
  //     typeof onSuccessFarmTransactions === "function"
  //   )
  //     onSuccessFarmTransactions(type, _trxHash);
  // };

  /** Add Liquidity */
  // const {
  //   trxError,
  //   trxHash,
  //   trxLoading,
  //   fetchAddKctLiquidityWithLimit,
  //   gasError,
  //   gas,
  //   gasLoading,
  //   setGasLoading,
  //   isValidGas,
  //   txFee,
  //   displayTxFee,
  //   fetchAddKctLiquidityWithLimitEstimateGas
  // } = useFarmAddLiquidity({
  //   sigmaST,
  //   onSuccessTransactions: onSuccessAddLiquidityTransactions
  // });

  // /** KSExchange Constants */
  // const {
  //   estimatedPOS,
  //   estimatedPOSError,
  //   estimatedPOSLoading,
  //   isValidEstimatedPOS,
  //   convertedEstimatePOS: tokenA_convertedEstimatePOS,
  //   fetchEstimatedPOS: tokenA_fetchEstimatedPOS
  // } = useKSExchangeConstants({
  //   sigmaST
  // });

  // const _tokenA_convertedEstimatePOS = React.useMemo(() => {
  //   if (!isValidEstimatedPOS) return 0;
  //   const estimatedPOSBN = BN(estimatedPOS);
  //   return tokenA.token === TOKENS.sigKSP
  //     ? convertToETH(estimatedPOSBN).toNumber()
  //     : convertToSixDecimalETH(estimatedPOSBN);
  // });

  /** Slippage */
  const { slippage, slippageComponent, isValidSlippage } = useSigmaSlippage();

  /** LifeCycle */
  useSigmaDidMount(() => {
    // tokenA_fetchCheckAllowance();
    //       tokenA_fetchBalance();
    //       tokenB_fetchCheckAllowance();
    //       tokenB_fetchBalance();
    //       tokenA_fetchEstimatedPOS({
    //         exchangeContractAddress: KLAYSWAP_LP_EXCHANGES[farmItem.token.name],
    //         pairTokenAddress: tokenA_contractAddress
    //       });
  });

  /** Debounce */
  // React.useEffect(() => {
  //   const isValidInputValue =
  //     isValidTokenA_inputValue && isValidTokenB_inputValue;
  //   const isValidApprove =
  //     tokenA_isValidApprove && tokenB_isValidApprove && isValidSlippage;
  //   if (sigmaST && isValidInputValue && isValidApprove) {
  //     if (!gasLoading) setGasLoading(true);
  //     onDebounce(tokenA_inputValue, tokenB_inputValue, slippage);
  //   }
  // }, [
  //   tokenA_inputValue,
  //   tokenB_inputValue,
  //   slippage,
  //   sigmaST,
  //   isValidTokenA_inputValue,
  //   isValidTokenB_inputValue,
  //   tokenA_isValidApprove,
  //   tokenB_isValidApprove,
  //   isValidSlippage
  // ]);

  // const onDebounce = React.useCallback(
  //   debounce((amountA, amountB, slippage) => {
  //     fetchAddKctLiquidityWithLimitEstimateGas({
  //       amountA,
  //       amountB,
  //       slippage,
  //       exchangeContractAddress: KLAYSWAP_LP_EXCHANGES[farmItem.token.name]
  //     });
  //   }, 1000),
  //   []
  // );

  /** Event */

  const onClickProvideLP = () => {
    // if (!isValidTransaction) return;
    // fetchAddKctLiquidityWithLimit({
    //   amountA: tokenA_inputValue,
    //   amountB: tokenB_inputValue,
    //   slippage,
    //   exchangeContractAddress: KLAYSWAP_LP_EXCHANGES[farmItem.token.name]
    // });
  };

  /** UI */

  // token A : token B  = 1 : estimatedTokenARate

  /** Validations */

  const isValidTransaction = React.useMemo(() => {
    return true;
  }, []);

  return (
    <div className={` flex flex-col items-center relative`}>
      {false && (
        <LoadingModal
          className="absolute w-full h-full z-10 outer_bg "
          loadingClassName={"sm:w-[80px] w-[50px] sm:h-[80px] h-[50px]"}
          messageClassName={"sm:text-[20px] text-[16px] md:mt-[20px] mt-[10px]"}
        />
      )}

      <div className="flex flex-col w-full items-center border-[1px] border-white p-[20px] rounded-md">
        {/* TokenA */}
        <div className="w-full flex flex-col">
          <UnitValueDisplay
            title={`Balance`}
            value={"tokenA_displayBalance"}
            unit={tokenA.token.name}
            className=" text-white mt-[5px]"
            loading={false}
          />
          <div className="min-h-[5px]" />

          <div
            className={`${
              "tokenA_isValidApprove"
                ? "pointer-events-auto"
                : "pointer-events-none opacity-50"
            } flex w-full  transition-all hover:scale-105`}
          >
            {/* <SigmaTextField2
              className="w-full rounded-l"
              label={`${tokenA.token.name}`}
              name="tokenA_inputValue"
              value={"tokenA_displayInputValue"}
              onChange={onChangeTextfield}
              type={"numeric"}
            />
            <div
              className="sm:min-w-[60px] min-w-[50px] flex justify-center items-center cursor-pointer transition-all hover:opacity-70 sm:text-[18px] text-[14px] font-medium bg-white text-[#1a1c29]"
              onClick={tokenA_onClickMax}
            >
              MAX
            </div> */}

            <LPTokenDisplay
              tokenInfo={tokenA.token}
              className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
            />
          </div>
          <UnitValueDisplay
            title={`1 ${tokenA.token.name}`}
            symbol="~="
            value={"_tokenA_convertedEstimatePOS"}
            unit={tokenB.token.name}
            className=" text-white mt-[5px]"
            loading={false}
            error={false}
          />
          {!"tokenA_isValidApprove" && (
            <div
              className={`relative overflow-hidden 
          ${
            "tokenA_isValidApproveButton" ? "" : "opacity-50 cursor-not-allowed"
          }
           w-full sm:h-[50px] h-[40px] flex justify-center items-center main_bg text-black rounded-md  mt-[15px] `}
              onClick={() => {}}
            >
              <p>Approve</p>
              {false && (
                <LoadingModal
                  className="absolute z-10 main_bg w-full h-full"
                  loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                  message={null}
                />
              )}
            </div>
          )}
        </div>

        <div className="w-[60px] h-[60px] mt-[20px]">
          <img src={FarmPlus} alt="plus" />
        </div>

        {/* TokenB */}
        <div className="w-full">
          <UnitValueDisplay
            title={`Balance`}
            value={`tokenB.token.name === "oUSDT"
                ? tokenB_displaySixPointBalance
                : tokenB_displayBalance`}
            unit={tokenB.token.name}
            className=" text-white mt-[5px]"
            loading={false}
          />
          <div className="min-h-[5px]" />

          <div
            className={`${
              "tokenB_isValidApprove"
                ? "pointer-events-auto"
                : "pointer-events-none opacity-50"
            } flex w-full  transition-all hover:scale-105`}
          >
            {/* <SigmaTextField2
              className="w-full rounded-l"
              label={`${tokenB.token.name}`}
              name="tokenB_inputValue"
              value={"tokenB_displayInputValue"}
              onChange={onChangeTextfield}
              type={"numeric"}
            />
            <div
              className="sm:min-w-[60px] min-w-[50px] flex justify-center items-center cursor-pointer transition-all hover:opacity-70 sm:text-[18px] text-[14px] font-medium bg-white text-[#1a1c29]"
              onClick={tokenB_onClickMax}
            >
              MAX
            </div> */}

            <LPTokenDisplay
              tokenInfo={tokenB.token}
              className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
            />
          </div>
          <UnitValueDisplay
            title={`1 ${tokenB.token.name}`}
            symbol="~="
            value={"tokenB_convertedEstimatePOS"}
            unit={tokenA.token.name}
            className=" text-white mt-[5px]"
            loading={false}
            error={false}
          />
          {!"tokenB_isValidApprove" && (
            <div
              className={`relative overflow-hidden 
          ${
            "tokenB_isValidApproveButton" ? "" : "opacity-50 cursor-not-allowed"
          }
           w-full sm:h-[50px] h-[40px] flex justify-center items-center main_bg text-black rounded-md  mt-[15px] `}
              onClick={() => {}}
            >
              <p>Approve</p>
              {false && (
                <LoadingModal
                  className="absolute z-10 main_bg w-full h-full"
                  loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                  message={null}
                />
              )}
            </div>
          )}
        </div>
      </div>

      <div className="min-h-[20px]" />

      {slippageComponent}
      {"tokenA_isValidApprove" && "tokenB_isValidApprove" && (
        <UnitValueDisplay
          title="Tx Fee"
          value={"displayTxFee"}
          unit={TOKENS.MATIC.name}
          className="mt-[5px] text-white"
          loading={false}
          error={false}
        />
      )}
      <div className="flex justify-between w-full sm:h-[50px] h-[40px] mt-[15px] sm:text-[18px]  text-[16px] font-medium">
        <div
          className={`${
            !"isValidTransaction" ? "cursor-not-allowed opacity-50" : ""
          } w-full overflow-hidden  h-full    flex justify-center items-center rounded-md main_bg text-black `}
          onClick={onClickProvideLP}
        >
          <p>Provide LP</p>
        </div>
      </div>
    </div>
  );
};

export default SHOUSDCLPFarmAddLiquidity;
