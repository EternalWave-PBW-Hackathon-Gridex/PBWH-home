import React from "react";
import useSigmaDidMount from "../../../../hooks/useSigmaDidMount";
import Connector from "../../../../context/WalletConnector/Connector";
import { Tabs, Tab } from "@mui/material";
import FundContentDisplay from "./FundContentDisplay";
import useERC20Balance from "../../../../web3/hooks/ERC20/useERC20Balance";

const FundDetails = ({ tokens }) => {
  let { address, isWalletConnected, connectWallet } = Connector.useContainer();
  const [depositTabIndex, setDepositTabIndex] = React.useState(0);
  const [tokenTabIndex, setTokenTabIndex] = React.useState(0);

  /** Life Cycle */
  useSigmaDidMount(() => {});

  /** Event */
  const handleDepositTabIndexChange = (event, newValue) => {
    setDepositTabIndex(newValue);
  };

  const handleTokenTabIndexChange = (event, newValue) => {
    setTokenTabIndex(newValue);
  };

  const onClickRedeem = () => {
    if (!isWalletConnected) {
      connectWallet();
      return;
    }
  };

  /** UI */
  let voteContents = <></>;
  switch (depositTabIndex) {
    case 0:
      voteContents = <></>;
      break;
    case 1:
      voteContents = <></>;
      break;

    default:
      break;
  }

  return (
    <div className=" flex flex-col mt-[10px] rounded-md  border-[1px] border-[#ffffff50] ">
      <div className="flex flex-col m-[10px] items-center">
        <Tabs
          value={depositTabIndex}
          onChange={handleDepositTabIndexChange}
          aria-label="basic tabs example"
          variant="fullWidth"
          sx={{
            "&": {
              border: "1px solid #ffffff50",
              width: "100%",

              borderTopLeftRadius: "6px",
              borderTopRightRadius: "6px"
            },
            "& .MuiTabs-indicator": {
              backgroundColor: "#33ff99",
              bottom: 0
            },
            "& .MuiTab-textColorPrimary": {
              color: "#ffffff",
              fontSize: "16px",
              opacity: 50,
              fontWeight: 500,
              fontFamily: "Poppins"
            },

            "& .MuiTab-textColorPrimary.Mui-selected": {
              color: "#33ff99",
              // backgroundColor: "#33ff99",
              fontWeight: 700
            }
          }}
        >
          <Tab label="Deposit" id="simple-tab-1" />
          <Tab label="Withdraw" id="simple-tab-2" />
        </Tabs>

        <div className="h-[20px]" />
        <div className="md:w-[780px] w-full flex flex-col items-center ">
          {/* <Tabs
            value={tokenTabIndex}
            onChange={handleTokenTabIndexChange}
            aria-label="basic tabs example"
            variant="fullWidth"
            sx={{
              "&": {
                width: "100%"
              },
              "& .MuiTabs-indicator": {
                backgroundColor: "#33ff99",
                top: 0
              },
              "& .MuiTab-textColorPrimary": {
                color: "#ffffff",
                fontSize: "16px",
                opacity: 50,
                fontWeight: 500,
                fontFamily: "Poppins"
              },

              "& .MuiTab-textColorPrimary.Mui-selected": {
                color: "#33ff99",
                fontWeight: 700
              }
            }}
          >
            {tokens.map((token, index) => (
              <Tab
                icon={
                  <div className={`w-[30px] h-[30px]`}>
                    <img
                      src={token.logo}
                      alt="logo"
                      className="w-full h-full"
                    />
                  </div>
                }
                label={token.name}
                id={`simple-tab-${index + 1}`}
              />
            ))}
          </Tabs> */}
          <FundContentDisplay
            depositTabIndex={depositTabIndex}
            tokens={tokens}
          />
        </div>
      </div>
    </div>
  );
};

export default FundDetails;
