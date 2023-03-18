import React from "react";
import GovernStakingDetailItem from "../GovernStakingDetailItem";
import InfoIcon from "../../../assets/images/global_icon_info.png";

import useSigmaDidMount from "../../../hooks/useSigmaDidMount";
import Connector from "../../../context/WalletConnector/Connector";
import { TOKENS } from "../../../web3/constants";
import useERC20TotalSupply from "../../../web3/hooks/ERC20/useERC20TotalSupply";
import xSHOTokenContract from "../../../web3/contracts/xSHOTokenContract";
import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import useXSHOStakingRowERC20 from "./useXSHOStakingRowERC20";
import vxSHOTokenContract from "../../../web3/contracts/vxSHOTokenContract";
import XSHOFarm from "../../../web3/contracts/XSHOFarmContract/XSHOFarm";
import useXSFConstants from "../../../web3/hooks/XSHOFarm/ReadOnly/useXSFConstants";

const XSHOStakingDetails = () => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    isLoadingBalance: isLoadingXSHOFarmXSHOBalance,
    balanceBN: XSHOFarmXSHOBalanceBN,
    isPositiveBalance: isPositiveXSHOFarmXSHOBalance,

    fetchBalance: fetchXSHOFarmXSHOBalance
  } = useERC20Balance(xSHOTokenContract);
  const {
    totalSupplyBN: xSHOTotalSupplyBN,
    isLoadingTotalSupply: isLoadingXSHOTotalSupply,
    isPositiveTotalSupply: isPositiveXSHOTotalSupply,
    displayNumberFormatTotalSupply: displayNumberFormatXSHOTotalSupply,

    fetchTotalSupply: fetchXSHOTotalSupply
  } = useERC20TotalSupply(xSHOTokenContract);

  const {
    isLoadingTotalSupply: isLoadingVXSHOTotalSupply,
    displayNumberFormatTotalSupply: displayNumberFormatVXSHOTotalSupply,
    fetchTotalSupply: fetchVXSHOTotalSupply,

    isLoadingBalance: isLoadingVXSHOBalance,
    displayNumberFormatBalance: displayNumberFormatVXSHOBalance,
    fetchBalance: fetchVXSHOBalance
  } = useXSHOStakingRowERC20(vxSHOTokenContract);

  const {
    isLoadingStakedXSHO,
    displayNumberFormatStakedXSHO,
    displayVXSHOPerDay,
    fetchStakedXSHO
  } = useXSFConstants(address);

  /** Life Cycle */
  useSigmaDidMount(() => {
    fetchXSHOFarmXSHOBalance(XSHOFarm.address);
    fetchXSHOTotalSupply();

    fetchVXSHOTotalSupply();
    fetchVXSHOBalance(address);

    fetchStakedXSHO();
  });

  /** Event */

  /** Validations */

  /** Total XSHO Staked Item */
  const isValidTotalXSHOStaked = React.useMemo(
    () => isPositiveXSHOTotalSupply && isPositiveXSHOFarmXSHOBalance,
    [isPositiveXSHOTotalSupply, isPositiveXSHOFarmXSHOBalance]
  );

  const isLoadingTotalXSHOStaked = React.useMemo(
    () =>
      isLoadingXSHOTotalSupply ||
      isLoadingXSHOFarmXSHOBalance[
        (isLoadingXSHOTotalSupply, isLoadingXSHOFarmXSHOBalance)
      ]
  );

  const displayTotalXSHOStaked = React.useMemo(() => {
    if (!isValidTotalXSHOStaked) return "-";

    return `${XSHOFarmXSHOBalanceBN.div(xSHOTotalSupplyBN)
      .times(100)
      .decimalPlaces(6)}`;
  }, [isValidTotalXSHOStaked, XSHOFarmXSHOBalanceBN, xSHOTotalSupplyBN]);

  return (
    <div className=" flex flex-col sm:mt-[30px] mt-[10px]">
      <div className="flex w-full sm:flex-row flex-col  ">
        <div className="min-w-[4.84%] " />
        <div className="flex w-full ">
          <div className="w-[15px] h-[15px] mr-[8px]">
            <img src={InfoIcon} alt="icon" />
          </div>
          <p className="whitespace-pre-wrap md:text-[14px] sm:text-[12px] text-[10px]">{`Pledge your ${TOKENS.xSHO.name} to earn ${TOKENS.vxSHO.name} over time. Each ${TOKENS.xSHO.name} token can earn up to 100 ${TOKENS.vxSHO.name}.\nThere is no lock on pledging ${TOKENS.xSHO.name}. Unpledging any amount of ${TOKENS.xSHO.name} will reset your ${TOKENS.vxSHO.name} balance to zero.`}</p>
        </div>
      </div>
      <div className="min-h-[25px]" />
      <div className="w-full flex sm:flex-row flex-col ">
        <div className="w-[4.84%] mr-[10px] " />
        <GovernStakingDetailItem
          className="sm:w-[17.16%] w-full  "
          title={`${TOKENS.xSHO.name} Staked`}
          loading={isLoadingTotalXSHOStaked}
          isWalletConnected={isWalletConnected}
          contentNode={<p className="">{`${displayTotalXSHOStaked} %`}</p>}
        />
        <div className=" flex sm:w-[47%] w-full  sm:flex-row flex-col ">
          <GovernStakingDetailItem
            className="sm:w-[33.33%] w-full"
            title={`${TOKENS.vxSHO.name} Supply`}
            loading={isLoadingVXSHOTotalSupply}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayNumberFormatVXSHOTotalSupply} ${TOKENS.vxSHO.name}`}</p>
            }
          />
        </div>

        <div className=" flex justify-center items-center  w-[31%] max-w-[31%] " />
      </div>
      <div className="w-full  flex sm:flex-row flex-col sm:mt-[30px] mt-[10px]">
        <div className="min-w-[4.84%]  sm:flex hidden" />
        <div className="w-full flex  sm:flex-row flex-col shogun_bg-primary px-[10px] pt-[30px] pb-[10px] rounded-md">
          <GovernStakingDetailItem
            className="sm:w-[18.03%] w-full opacity-50 "
            title="Pledged"
            loading={isLoadingStakedXSHO}
            isWalletConnected={isWalletConnected}
            contentNode={
              <p className="">{`${displayNumberFormatStakedXSHO} ${TOKENS.xSHO.name}`}</p>
            }
          />
          <div className=" flex sm:w-[49.38%]  w-full   sm:flex-row flex-col opacity-50">
            <GovernStakingDetailItem
              className="sm:w-[33.33%] w-full"
              title={`${TOKENS.vxSHO.name} Earned`}
              loading={isLoadingVXSHOBalance}
              isWalletConnected={isWalletConnected}
              contentNode={
                <p>
                  {`${displayNumberFormatVXSHOBalance} ${TOKENS.vxSHO.name}`}{" "}
                </p>
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
          <div className=" flex justify-center items-center  sm:w-[32.57%] sm:max-w-[32.57%] w-full max-w-full  sm:mt-0 mt-[10px]"></div>
        </div>
      </div>
    </div>
  );
};

export default XSHOStakingDetails;
