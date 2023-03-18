import React from "react";
import BoostIcon from "../../../assets/images/global_icon_boost.png";
import QuestionIcon from "../../../assets/images/global_question.png";
import AKTooltip from "../../../components/AKTooltip";
import { TOKENS } from "../../../web3/constants";
import GovernStakingDetailItem from "../GovernStakingDetailItem";
import Connector from "../../../context/WalletConnector/Connector";
import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import vxSHOTokenContract from "../../../web3/contracts/vxSHOTokenContract";
import useXSFConstants from "../../../web3/hooks/XSHOFarm/ReadOnly/useXSFConstants";
import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import useXSFActivateBoost from "../../../web3/hooks/XSHOFarm/useXSFActivateBoost";
import { LoadingModal } from "../../../components/Loading";
import SigmaButton from "../../../components/Animation/SigmaButton";

const BoostActivationRow = () => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    isLoadingBalance: isLoadingVXSHOBalance,
    displayNumberFormatBalance: displayNumberFormatVXSHOBalance,
    fetchBalance: fetchVXSHOBalance
  } = useERC20Balance(vxSHOTokenContract);

  const {
    isLoadingStakedXSHO,
    displayVXSHOPerDay,
    fetchStakedXSHO,

    isLoadingClaimableVXSHO,
    isPositiveClaimableVXSHO,
    displayNumberFormatClaimableVXSHO,
    fetchClaimableVXSHO
  } = useXSFConstants(address);

  const {
    isLoadingActivateBoostTxFee,
    fetchActivateBoostTxFee,
    /** Tx */
    isLoadingActivateBoostTx,
    fetchActivateBoostTx,

    /** Helpers */
    isValidActivateBoostTx
  } = useXSFActivateBoost();

  useSigmaDidMount(() => {
    fetchVXSHOBalance(address);

    fetchClaimableVXSHO();
    fetchStakedXSHO();
    fetchActivateBoostTxFee();
  });

  const onClickActivate = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    if (!isValidTransaction) return;

    fetchActivateBoostTx().then(() => {
      fetchVXSHOBalance(address);
      fetchClaimableVXSHO();
      fetchStakedXSHO();
    });
  };

  const isValidTransaction = React.useMemo(() => {
    return (
      isPositiveClaimableVXSHO && isValidActivateBoostTx && isWalletConnected
    );
  }, [isPositiveClaimableVXSHO, isValidActivateBoostTx, isWalletConnected]);

  return (
    <div className="flex flex-col w-full lg:p-[30px] p-[20px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      <div className="w-full  flex sm:flex-row flex-col ">
        <div className="flex sm:w-[22%] w-full min-w-[60px]  items-center ">
          <div className="xlg:min-w-[60px] xlg:w-[60px] xlg:h-[60px] lg:min-w-[50px] lg:w-[50px] lg:h-[50px] min-w-[40px] w-[40px] h-[40px] flex rounded-full mr-[10px]">
            <img src={BoostIcon} alt="boost" />
          </div>

          <AKTooltip
            parent={
              <div className="flex flex-col items-center justify-center cursor-help ">
                <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium w-full">
                  {`${TOKENS.vxSHO.name} Boost`}
                </p>

                <div className=" flex items-center w-full">
                  <p className="xlg:text-[20px] lg:text-[18px] text-[16px] xlg:font-semibold font-medium">
                    {`Activation`}
                  </p>
                  <div className="w-[18px] h-[18px] ml-[3px]">
                    <img src={QuestionIcon} alt="icon" />
                  </div>
                </div>
              </div>
            }
            tooltipElement={
              <p className="text-[14px]">
                {`You must activate ${TOKENS.vxSHO.name} to benefit from yield boosting.`}
              </p>
            }
          />
        </div>
        <div className="sm:my-0 my-[10px] flex sm:flex-row flex-col  sm:w-[47%] w-full  justify-center  xlg:text-[16px] lg:text-[15px] text-[14px] relative">
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`Active ${TOKENS.vxSHO.name}`}
            loading={isLoadingVXSHOBalance}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayNumberFormatVXSHOBalance} ${TOKENS.vxSHO.name}`}</p>
            }
          />
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`Inactive ${TOKENS.vxSHO.name}`}
            loading={isLoadingClaimableVXSHO}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayNumberFormatClaimableVXSHO} ${TOKENS.vxSHO.name}`}</p>
            }
          />
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`${TOKENS.vxSHO.name} per day`}
            loading={isLoadingStakedXSHO}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayVXSHOPerDay} ${TOKENS.vxSHO.name}`}</p>
            }
          />
        </div>

        <div className="flex justify-center items-center  sm:w-[31%] sm:max-w-[31%] w-full max-w-full sm:mt-0 mt-[10px]">
          <SigmaButton
            className={`${
              isValidTransaction ? "" : "opacity-50 cursor-not-allowed"
            } relative h-[50px] text-black xlg:text-[18px] lg:text-[16px] text-[14px] font-semibold w-full rounded-md flex justify-center items-center   main_bg`}
            onClick={onClickActivate}
          >
            <p>Activate</p>
            {(isLoadingActivateBoostTx || isLoadingActivateBoostTxFee) && (
              <LoadingModal
                className="absolute z-10 main_bg w-full h-full"
                loadingClassName="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px]"
                message={null}
              />
            )}
          </SigmaButton>
        </div>
      </div>
    </div>
  );
};

export default BoostActivationRow;
