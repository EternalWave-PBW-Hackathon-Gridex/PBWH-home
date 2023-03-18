import React from "react";

import { BN, isBNPositive } from "../../web3/utils/AKBN";

const SLIPPAGES = ["0.5", "1", "2.5"];

const useSigmaSlippage = () => {
  const [slippage, setSlippage] = React.useState(SLIPPAGES[0]);
  const onChangeSlippage = (e) => {
    let { value } = e.target;
    let valueBN = BN(value);
    if (valueBN.isNaN()) valueBN = BN(SLIPPAGES[0]);
    setSlippage(valueBN.decimalPlaces(1).toString());
  };

  const onSelectSlippage = (selectedIndex) => {
    setSlippage(SLIPPAGES[selectedIndex]);
  };

  const isSlippageFixedValue = SLIPPAGES.includes(slippage);

  const isValidSlippage = React.useMemo(() => {
    const slippageBN = BN(slippage);
    const numbered = slippageBN.toNumber();
    return numbered >= 0.4 && numbered <= 50;
  }, [slippage]);
  const component = React.useMemo(
    () => (
      <div className={`mt-[10px] flex flex-col w-full `}>
        <div className="flex w-full text-[16px] items-center">
          <p className="opacity-50 mr-[5px] sm:text-[16px] text-[12px]">{`Slippage:`}</p>
          <div className="flex items-center">
            {SLIPPAGES.map((_slippage, index) => (
              <div
                onClick={() => {
                  onSelectSlippage(index);
                }}
                key={`slippageitem-${index}`}
                className={`${
                  _slippage === slippage && "main_bg main_bd text-black"
                } sm:text-[14px] text-[10px] flex justify-center items-center border-[1px] rounded-sm p-[3px] sm:mr-[8px] mr-[4px] transition-all hover:opacity-70 cursor-pointer`}
              >
                {_slippage}%
              </div>
            ))}
            <div
              className={`flex items-center border-[1px] sm:p-[3px] p-0 rounded-sm ${
                !isSlippageFixedValue && "main_bd main_bg"
              }`}
            >
              <div
                className={`w-[50px] 
      `}
              >
                <input
                  type="numeric"
                  className={`w-full bg-transparent outline-none border-none text-${
                    isSlippageFixedValue ? "white" : "black"
                  } px-[5px] sm:text-[16px] text-[12px]`}
                  name={"slippage"}
                  value={slippage}
                  onChange={onChangeSlippage}
                />
              </div>

              <p
                className={` ${
                  !isSlippageFixedValue && "text-black"
                } sm:text-[14px] text-[10px]`}
              >
                %
              </p>
            </div>
          </div>
        </div>
        {!isValidSlippage && (
          <p className="text-[12px] text-red-600 w-full mt-[5px] flex justify-start">
            Slippage must be between 0.4% and 50%.
          </p>
        )}
      </div>
    ),
    [slippage, isSlippageFixedValue, isValidSlippage]
  );

  return {
    slippage,
    slippageComponent: component,
    isValidSlippage
  };
};

export default useSigmaSlippage;
