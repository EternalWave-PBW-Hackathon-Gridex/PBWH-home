import React from "react";

import AKTooltip from "../../../../components/AKTooltip";
import FarmListRowValue from "../FarmListRowValue";

import { TripleButtonGroup } from "../../../../components/SigmaValueDisplay";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import { TOKENS } from "../../../../web3/constants";
import Connector from "../../../../context/WalletConnector/Connector";
import useSMSConstants from "../../../../web3/hooks/SHOMESHStaking/ReadOnly/useSMSConstants";
import useERC20TotalSupply from "../../../../web3/hooks/ERC20/useERC20TotalSupply";
import TokenPriceConnector from "../../../../context/TokenPriceConnector";
import { getAbbreviateNumberFormat } from "../../../../web3/utils/numberFormat";
import { BN } from "../../../../web3/utils/AKBN";
import SHOMESHStakingContract from "../../../../web3/contracts/SHOMESHStakingContract";
import SHOMESHStakeModal from "./Modal/SHOMESHStakeModal";
import { useSigmaAlert } from "../../../../components/SigmaAlert";
import SHOMESHWithdrawModal from "./Modal/SHOMESHWithdrawModal";
import SHOMESHClaimConfirmModal from "./Modal/SHOMESHClaimConfirmModal";
import useHarvest from "../../../../hooks/Strapi/useHarvest";
import FundDetails from "./FundDetails";

import ArrowDownIcon from "../../../../assets/images/global_icon_arrow-down.png";
import SigmaButton from "../../../../components/Animation/SigmaButton";
import WETHTokenContract from "../../../../web3/contracts/WETHTokenContract";
import GDXTokenContract from "../../../../web3/contracts/GDXTokenContract";
import useBIConstants from "../../../../web3/hooks/BIIndexFund/ReadOnly/useBIConstants";

const tokens = [
  { ...TOKENS["wETH"], share: 20, contract: WETHTokenContract },
  { ...TOKENS["GDX"], share: 80, contract: GDXTokenContract }
];

const FundAListRow = () => {
  const [openDetails, setOpenDetails] = React.useState(false);
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();

  const {
    ethBalance,
    ethBalanceBN,
    isLoadingETHBalance,
    isCallSuccessETHBalance,
    isValidETHBalance,
    isPositiveETHBalance,
    numberedETHBalance,

    displayETHBalance,
    fetchETHBalance,

    gdxBalance,
    gdxBalanceBN,
    isLoadingGDXBalance,
    isCallSuccessGDXBalance,
    isValidGDXBalance,
    isPositiveGDXBalance,
    numberedGDXBalance,

    displayGDXBalance,
    fetchGDXBalance
  } = useBIConstants(address);

  const tvl = React.useMemo(() => {}, []);

  const {
    isLoadingSHOMESHPrice,
    shoMESHPriceBN,
    isPositiveSHOMESHPrice,
    fetchSHOMESHPrice,

    isLoadingSHOPrice,
    shoPriceBN,
    isPositiveSHOPrice,
    fetchSHOPrice
  } = TokenPriceConnector.useContainer();

  const {
    isLoadingTotalSupply: isLoadingSHOMESHTotalSupply,
    totalSupplyBN: shoMESHTotalSupplyBN,
    isPositiveTotalSupply: isPositiveSHOMESHTotalSupply,

    fetchTotalSupply: fetchSHOMESHTotalSupply
  } = useERC20TotalSupply(SHOMESHStakingContract);

  const {
    isLoadingEarnedInfo,
    displayNumberFormatSHOEarned,
    displayNumberFormatSHOMESHEarned,
    fetchEarnedInfo,

    isLoadingSHOMESHBalance,
    displayNumberFormatSHOMESHBalance,
    fetchSHOMESHBalance
  } = useSMSConstants(address);

  const {
    isLoadingDailyStakingHarvest,
    isValidDailyStakingHarvest,
    dailyStakingHarvest,

    fetchDailyStakingHarvest,

    isLoadingDailyPoolVotingHarvest,
    isValidDailyPoolVotingHarvest,
    dailyPoolVotingHarvest,

    fetchDailyPoolVotingHarvest
  } = useHarvest();

  /** Life Cycle */

  useSigmaDidMount(
    () => {
      fetchSHOMESHTotalSupply();
      fetchSHOMESHPrice();
      fetchSHOPrice();
      fetchDailyStakingHarvest();
      fetchDailyPoolVotingHarvest();
    },
    [],
    false
  );

  useSigmaDidMount(() => {
    fetchSHOMESHBalance();
    fetchEarnedInfo();
  });

  const onClickDetail = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
    setOpenDetails(openDetails ? false : true);
  };

  /** TVL Item */

  const isValidTVL = React.useMemo(() => {
    return isPositiveSHOMESHPrice && isPositiveSHOMESHTotalSupply;
  }, [isPositiveSHOMESHPrice, isPositiveSHOMESHTotalSupply]);

  const isLoadingTVL = React.useMemo(() => {
    return isLoadingSHOMESHPrice || isLoadingSHOMESHTotalSupply;
  }, [isLoadingSHOMESHPrice, isLoadingSHOMESHTotalSupply]);

  const tvlBN = React.useMemo(() => {
    if (!isValidTVL) return BN(0);
    return shoMESHPriceBN.times(shoMESHTotalSupplyBN);
  }, [isValidTVL, shoMESHPriceBN, shoMESHTotalSupplyBN]);

  const displayTVL = React.useMemo(() => {
    if (!isValidTVL) return "-";
    return getAbbreviateNumberFormat({
      maximumFractionDigits: 2
    }).format(tvlBN.toString());
  }, [isValidTVL, tvlBN]);

  /** APR Item */

  const isValidAPR = React.useMemo(() => {
    return (
      isValidTVL &&
      isPositiveSHOPrice &&
      isPositiveSHOMESHPrice &&
      isValidDailyStakingHarvest &&
      isValidDailyPoolVotingHarvest
    );
  }, [
    isValidTVL,
    isPositiveSHOPrice,
    isPositiveSHOMESHPrice,
    isValidDailyStakingHarvest,
    isValidDailyPoolVotingHarvest
  ]);

  const isLoadingAPR = React.useMemo(() => {
    return (
      isLoadingTVL ||
      isLoadingSHOPrice ||
      isLoadingSHOMESHPrice ||
      isLoadingDailyStakingHarvest ||
      isLoadingDailyPoolVotingHarvest
    );
  }, [
    isLoadingTVL,
    isLoadingSHOPrice,
    isLoadingSHOMESHPrice,
    isLoadingDailyStakingHarvest,
    isLoadingDailyPoolVotingHarvest
  ]);

  const displayARP = React.useMemo(() => {
    if (!isValidAPR) return { sum: "-", SHO: "-", shoMESH: "-" };

    const dailyStakingHarvestSHOMESHBN = BN(
      dailyStakingHarvest.shoMESH.distributedShoMESH
    );
    const dailyPoolVotingHarvestSHOMESHBN = BN(
      dailyPoolVotingHarvest.SHO.shoToShoMESHStakingPool
    );

    const isValidHarvest =
      !dailyStakingHarvestSHOMESHBN.isNaN() &&
      !dailyPoolVotingHarvestSHOMESHBN.isNaN();
    if (!isValidHarvest) return { sum: "-", SHO: "-", shoMESH: "-" };

    const SHORewardValueBN = shoPriceBN.times(dailyPoolVotingHarvestSHOMESHBN);
    const shoMESHRewardValueBN = shoMESHPriceBN.times(
      dailyStakingHarvestSHOMESHBN
    );
    const SHO = SHORewardValueBN.times(365 * 100)
      .div(tvlBN)
      .toString();
    const shoMESH = shoMESHRewardValueBN
      .times(365 * 100)
      .div(tvlBN)
      .toString();
    const sum = SHORewardValueBN.plus(shoMESHRewardValueBN)
      .times(365 * 100)
      .div(tvlBN)
      .toString();

    return {
      sum: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(sum),
      SHO: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(SHO),
      shoMESH: getAbbreviateNumberFormat({
        maximumFractionDigits: 2
      }).format(shoMESH)
    };
  }, [isValidAPR, shoPriceBN, shoMESHPriceBN]);

  return (
    <div className="relative flex flex-col w-full  sm:p-[30px] p-[10px] shogun_bg-secondary mb-[15px] rounded-md transition-all hover:scale-[102%]">
      <div className="w-full  flex sm:flex-row flex-col">
        <div className="flex relative sm:min-w-[13%] min-w-full  items-center   sm:mt-0 mt-[10px] ">
          <TokenDisplay tokens={tokens} />
        </div>
        <div className="flex relative sm:w-[43%] w-full  items-center sm:mt-0 mt-[10px] ">
          <Composition tokens={tokens} />
        </div>
        <div className="sm:w-[9%] w-full flex sm:justify-center justify-between items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[10px]">
          <div className="sm:hidden flex opacity-50 ">TVL</div>
          <FarmListRowValue
            isWalletConnected={true}
            loading={isLoadingTVL}
            error={false}
            valueNode={<p>{`${displayTVL} $`}</p>}
          />
        </div>
        <div className=" sm:w-[9%] w-full  flex sm:justify-center justify-between items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px] ">
          <div className="sm:hidden flex opacity-50 ">APR</div>
          <div className="flex items-center ">
            <FarmListRowValue
              isWalletConnected={true}
              loading={isLoadingAPR}
              error={false}
              valueNode={<p> {`${displayARP.sum} %`}</p>}
            />
          </div>
        </div>

        <div className="sm:w-[13%] w-full  flex sm:justify-center justify-between  items-center xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Deposits</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingSHOMESHBalance}
            error={false}
            valueNode={
              <p className="">{`${displayNumberFormatSHOMESHBalance}`}</p>
            }
          />
        </div>
        {/* Your Earning */}
        {/* <div className="sm:w-[13%] w-full flex  sm:justify-center justify-between items-center whitespace-pre-wrap xlg:text-[16px] lg:text-[14px] md:text-[13px] text-[12px] sm:mt-0 mt-[5px]">
          <div className="sm:hidden flex opacity-50 ">Your Earnings</div>
          <FarmListRowValue
            isWalletConnected={isWalletConnected}
            loading={isLoadingEarnedInfo}
            error={false}
            valueNode={
              <div>
                {
                  <div className="flex flex-col">
                    <p className="">{`${displayNumberFormatSHOEarned} ${TOKENS.SHO.name}`}</p>
                    <p className="">{`${displayNumberFormatSHOMESHEarned} ${TOKENS.shoMESH.name}`}</p>
                  </div>
                }
              </div>
            }
          />
        </div> */}
      </div>
      {openDetails && <FundDetails tokens={tokens} />}

      <SigmaButton
        whileHover={{ scale: 1.03 }}
        className={`mt-[10px] main_bg overflow-hidden w-full sm:min-h-[30px] flex justify-center items-center rounded-md   `}
        onClick={onClickDetail}
      >
        <img
          className={`w-[20px] h-[20px] ${openDetails ? "rotate-180" : ""}`}
          src={ArrowDownIcon}
          alt="ArrowDown"
        />
      </SigmaButton>
    </div>
  );
};

export default FundAListRow;

const TokenDisplay = ({ tokens }) => {
  return (
    <div className="flex  relative items-center xlg:h-[50px] lg:h-[40px] h-[35px] ">
      {tokens.map((token, index) => {
        const { name, logo } = token;
        return (
          <div
            className={`absolute h-full xlg:w-[50px] lg:w-[40px] w-[35px]`}
            style={{
              left: `${index * 25}px`,
              zIndex: index + 1
            }}
          >
            <img src={logo} alt="logo" className="w-full h-full" />
          </div>
        );
      })}
    </div>
  );
};

const Composition = ({ tokens }) => {
  return (
    <div className="w-full h-full flex items-center rounded-md overflow-hidden">
      {tokens.map((token, index) => {
        return (
          <div
            className={`w-[${token.share}%]   h-full flex justify-center items-center sm:text-[16px] text-[12px] `}
            style={{ width: `${token.share}%`, height: "100%" }}
          >
            <div className="bg-[#EAF0F6] w-full h-full rounded m-[3px] flex justify-center items-center text-black font-light">{`${token.name} ${token.share}%`}</div>
          </div>
        );
      })}
    </div>
  );
};
