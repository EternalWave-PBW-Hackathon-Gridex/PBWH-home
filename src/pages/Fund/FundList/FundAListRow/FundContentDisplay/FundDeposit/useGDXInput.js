import React from "react";
import useERC20 from "../../../../../../web3/hooks/ERC20/useERC20";
import useSigmaCurrencyInput from "../../../../../../hooks/TextField/useSigmaCurrencyInput";
import Connector from "../../../../../../context/WalletConnector/Connector";
import {
  LPTokenDisplay,
  UnitValueDisplay
} from "../../../../../../components/SigmaValueDisplay";
import SigmaButton from "../../../../../../components/Animation/SigmaButton";
import useSigmaDidMount from "../../../../../../hooks/useSigmaDidMount";
import { LoadingModal } from "../../../../../../components/Loading";
import BIIndexFundContract from "../../../../../../web3/contracts/BIIndexFundContract";

export default function useGDXInput({ token }) {
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
  } = useERC20(token.contract);

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
    name: token.name,
    placeholder: `${token.name} to deposit`,
    balance: balance
  });

  useSigmaDidMount(() => {
    fetchBalance(address);
    fetchAllowance(address, BIIndexFundContract.address);
  });

  const onClickApprove = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidApproveTransaction) return;
    fetchApprove(BIIndexFundContract.address).then(() => {
      fetchAllowance(address, BIIndexFundContract.address);
    });
  };

  /** Component */
  const component = React.useMemo(() => {
    return (
      <div className="w-full flex flex-col items-center shogun_bg-secondary  rounded-md ">
        <UnitValueDisplay
          title="Balance"
          value={displayBalance}
          unit={token.name}
          className="mb-[10px]"
          loading={isLoadingBalance}
          error={false}
          isWalletConnected={isWalletConnected}
        />
        <div className="flex w-full ">
          {inputComponent}
          {maxComponent}
          <LPTokenDisplay
            tokenInfo={token}
            className="sm:min-w-[33%] min-w-[28%] border-[#ffffff20] border-[1px] rounded-r-md"
          />
        </div>

        {!isApproved && (
          <SigmaButton
            className={`mt-[10px] relative overflow-hidden ${
              isValidApproveTransaction ? "" : "opacity-50 cursor-not-allowed"
            }

w-full sm:min-h-[40px] min-h-[32px] flex justify-center items-center main_bg text-black sm:text-[16px] text-[13px] font-semibold rounded-md   `}
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
    );
  }, [
    displayBalance,
    isLoadingBalance,
    isWalletConnected,
    inputComponent,
    maxComponent,
    isApproved,
    isValidApproveTransaction,
    isLoadingApproveButton
  ]);

  /** Actions */
  // const initInput = () => {
  //   setTextValue("");
  // };

  return {
    component,
    isApproved,
    setInput,
    setIsEnable,
    fetchBalance,
    stringValue,
    weiValue,
    numberValue,
    isInputPositive,
    isBiggerThanBalance
  };
}
