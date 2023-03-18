import React from "react";
import { BN, convertToETH, isBNPositive, BN_FORMAT } from "../utils/AKBN";
import { getAbbreviateNumberFormat } from "../utils/numberFormat";

export default function useNumericTokenConstants(numberValue, isCallSuccess) {
  const bn = React.useMemo(() => BN(numberValue), [numberValue]);

  const isValid = React.useMemo(
    () => !bn.isNaN() && isCallSuccess,
    [bn, isCallSuccess]
  );

  const isPositive = React.useMemo(
    () => isValid && isBNPositive(bn),
    [isValid, bn]
  );

  const numbered = React.useMemo(() => {
    if (!isValid) return 0;
    return bn.toNumber();
  });

  const display = React.useMemo(() => {
    if (!isValid) return "-";
    return bn.decimalPlaces(4).toFormat(BN_FORMAT);
  }, [bn, isValid]);

  const displayNumberFormat = React.useMemo(
    (digit = 3) => {
      if (!isValid) return "-";
      return getAbbreviateNumberFormat({ maximumFractionDigits: digit }).format(
        bn.toString()
      );
    },
    [bn, isValid]
  );

  return {
    bn,
    isValid,
    isPositive,
    numbered,
    display,
    displayNumberFormat
  };
}
