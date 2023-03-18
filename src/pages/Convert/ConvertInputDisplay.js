import React from "react";
import { debounce } from "lodash";

import { BN, convertToETH, isBNPositive } from "../../web3/utils/AKBN";
import {
  FlexDualButton,
  UnitValueDisplay
} from "../../components/SigmaValueDisplay";

import { TOKENS } from "../../web3/constants";
import useSigmaCurrencyInput from "../../hooks/TextField/useSigmaCurrencyInput";
import useSigmaDidMount from "../../hooks/useSigmaDidMount";
import Connector from "../../context/WalletConnector/Connector";
import useERC20 from "../../web3/hooks/ERC20/useERC20";
import MESHTokenContract from "../../web3/contracts/MESHTokenContract";
import useCDepositMESH from "../../web3/hooks/Convert/useCDepositMESH";
import MeshswapEscrow from "../../web3/contracts/MeshswapEscrowContract/MeshswapEscrow";

const ConvertInputDisplay = () => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    balance: MESHBalance,
    fetchBalance: fetchMESHBalance,
    displayBalance: displayMESHBalance,
    isLoadingBalance: isLoadingMESHBalance,

    /** isApproved */
    isApproved,
    fetchAllowance,

    /** Approve */
    fetchApprove,
    isValidApproveTransaction,
    isLoadingApproveButton,
    isValidTxInERC20
  } = useERC20(MESHTokenContract);

  const {
    isLoadingDepositMESHTxFee,
    fetchDepositMESHTxFee,
    displayDepositMESHTxFee,
    setDepositMESHTxFeeLoading,

    isLoadingDepositMESHTx,
    fetchDepositMESHTx,
    isValidDepositMESHTx
  } = useCDepositMESH();

  const {
    inputComponent,
    maxComponent,
    initInput,
    bn: inputBN,
    isValid: isValidInput,
    stringValue,
    isValidTxInInput
  } = useSigmaCurrencyInput({
    name: TOKENS.MESH.name,
    placeholder: `${TOKENS.MESH.name} for ${TOKENS.shoMESH.name}`,
    balance: MESHBalance
  });

  const isInputValueInteger = React.useMemo(() => {
    return isValidInput && inputBN.isInteger();
  }, [inputBN, isValidInput]);

  useSigmaDidMount(() => {
    fetchMESHBalance(address);
    fetchAllowance(address, MeshswapEscrow.address);
  });

  /** Debounce */
  React.useEffect(() => {
    if (
      isWalletConnected &&
      isValidTxInInput &&
      isInputValueInteger &&
      isValidTxInERC20
    ) {
      if (!isLoadingDepositMESHTxFee) setDepositMESHTxFeeLoading();
      onDebounce(stringValue);
    }
  }, [
    isValidTxInInput,
    isValidTxInERC20,
    stringValue,
    isWalletConnected,
    isInputValueInteger
  ]);

  const onDebounce = React.useCallback(
    debounce((stringValue) => {
      fetchDepositMESHTxFee(stringValue);
    }, 1000),
    [address]
  );

  /** Events */

  const onClickApprove = async () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidApproveTransaction) return;
    fetchApprove(MeshswapEscrow.address).then(() => {
      fetchAllowance(address, MeshswapEscrow.address);
    });
  };

  const onClickConvert = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }

    if (!isValidConvertTransaction) return;
    fetchDepositMESHTx(stringValue).then(() => {
      fetchMESHBalance(address);
      initInput();
    });
  };

  /** Validation */

  const isValidConvertTransaction = React.useMemo(() => {
    return (
      isInputValueInteger &&
      isValidTxInInput &&
      isValidTxInERC20 &&
      isValidDepositMESHTx
    );
  }, [
    isInputValueInteger,
    isValidTxInInput,
    isValidTxInERC20,
    isValidDepositMESHTx
  ]);

  /** UI */
  const displayConverting = React.useMemo(() => {
    if (isValidInput) {
      return inputBN.decimalPlaces(0).toNumber();
    } else {
      return 0;
    }
  }, [isValidInput, inputBN]);

  return (
    <div>
      <p className="font-semibold xlg:text-[20px] lg:text-[19px] md:text-[18px] text-[16px] md:mt-[30px] mt-[20px] mb-[20px] ml-[30px]">{`Convert & Stake ${TOKENS.MESH.name} into ${TOKENS.shoMESH.name}`}</p>
      <div className="w-full shogun_bg-secondary flex flex-col  p-[30px] rounded-md relative transition-all hover:scale-105">
        <p className="lg:text-[18px] md:text-[16px] text-[14px]   mb-[10px] error_c ">
          This process is irreversible
        </p>
        <div className="flex justify-between items-center">
          <div className=" flex flex-col  w-full">
            <UnitValueDisplay
              title="Balance"
              value={displayMESHBalance}
              unit={TOKENS.MESH.name}
              className=" mb-[15px]"
              loading={isLoadingMESHBalance}
              isWalletConnected={isWalletConnected}
            />
            <div className="flex w-full">
              <div
                className={`${
                  isApproved
                    ? "pointer-events-auto"
                    : "pointer-events-none opacity-50 "
                }  flex  w-full`}
              >
                {inputComponent}
                {maxComponent}
              </div>
              <div className="min-w-[35%] md:block hidden">
                <FlexDualButton
                  className="ml-[30px]"
                  leftButtonClassName={`${
                    isValidApproveTransaction
                      ? ""
                      : "cursor-not-allowed opacity-50"
                  } ${
                    isApproved
                      ? "border-[1px] border-[#ffffff50] shogun_bg-secondary text-[#ffffff] opacity-50"
                      : ""
                  }`}
                  rightButtonClassName={`${
                    isValidConvertTransaction
                      ? ""
                      : "cursor-not-allowed opacity-50"
                  } ${
                    isApproved
                      ? `main_bg main_bg ${
                          isValidConvertTransaction ? "opacity-100" : ""
                        } text-[#1A1C29] border-none`
                      : ""
                  }`}
                  leftBtn={{ title: "Approve", onClick: onClickApprove }}
                  rightBtn={{ title: "Convert", onClick: onClickConvert }}
                  leftBtnLoading={isLoadingApproveButton}
                  rightBtnLoading={isLoadingDepositMESHTx}
                />
              </div>
            </div>
            {!isInputValueInteger && isApproved && (
              <p className="error_c text-[12px] mt-[5px]">
                Only integer values are allowed
              </p>
            )}

            {isApproved && (
              <UnitValueDisplay
                title="Tx Fee"
                value={displayDepositMESHTxFee}
                unit={TOKENS.MATIC.name}
                className="mt-[5px]"
                isWalletConnected={isWalletConnected}
                loading={isLoadingDepositMESHTxFee}
              />
            )}
            <div className="lg:text-[16px] md:text-[14px] text-[12px] md:mt-[16px] mt-[8px] flex w-full">
              <p className="opacity-50 mr-[5px]">Converting</p>
              <p className="mr-[5px]">
                {`${displayConverting} ${TOKENS.MESH.name}`}
              </p>
              <p className="opacity-50 mr-[5px]">{`tokens to`}</p>
              <p>{`${displayConverting} ${TOKENS.shoMESH.name}`}</p>
            </div>
            <div className="w-full md:hidden block md:h-0 h-[54px] mt-[8px] ">
              <FlexDualButton
                leftButtonClassName={`${
                  isValidApproveTransaction
                    ? ""
                    : "cursor-not-allowed opacity-50"
                } ${
                  isApproved
                    ? "border-[1px] border-[#ffffff50] shogun_bg-secondary"
                    : ""
                }`}
                rightButtonClassName={`${
                  isValidConvertTransaction
                    ? ""
                    : "cursor-not-allowed opacity-50"
                }`}
                leftBtn={{ title: "Approve", onClick: onClickApprove }}
                rightBtn={{ title: "Convert", onClick: onClickConvert }}
                leftBtnLoading={isLoadingApproveButton}
                rightBtnLoading={isLoadingDepositMESHTx}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConvertInputDisplay;
