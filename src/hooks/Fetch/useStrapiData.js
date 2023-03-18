import React from "react";

export default function useStrapiData(res, isCallSuccess) {
  /** data */
  const data = React.useMemo(() => {
    return res?.data ? res?.data : undefined;
  }, [res]);

  const isValidData = React.useMemo(() => {
    return Array.isArray(data) && isCallSuccess;
  }, [data, isCallSuccess]);

  return {
    data,
    isValidData
  };
}
