import React from "react";
import { URL, PROJECT_ID, API_TOKEN } from "../../utils/constants";
import { GET } from "../../utils/fetch";
import { ContractCallState } from "../../web3/constants";
import useConstantProperties from "../../web3/hooks/useConstantProperties";

export default function useDailyPoolVotingHarvest() {
  /** poolVotes */
  const [res, setRes] = React.useState(null);
  const [apiState, setApiState] = React.useState(ContractCallState.NEW);
  const { isCallSuccess, isLoading } = useConstantProperties(apiState);

  const fetch = async () => {
    let requestInfo = {
      url: `${URL.BASEURL}/api/${PROJECT_ID}-daily-pool-voting-harvests`,
      params: {
        "pagination[page]": 1,
        "pagination[pageSize]": 1,
        sort: "createdAt:desc"
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN.READ}`
      }
    };

    try {
      setApiState(ContractCallState.FETCHING);
      const strapiRes = await GET(requestInfo);
      setApiState(ContractCallState.SUCCESS);
      setRes(strapiRes);
    } catch (error) {
      console.error(error.message);
      setApiState(ContractCallState.ERROR);
      setRes(null);
    }
  };

  const setLoading = () => {
    setApiState(ContractCallState.FETCHING);
  };

  /** data */
  const data = React.useMemo(() => {
    return res?.data ? res?.data : undefined;
  }, [res]);

  const isValidData = React.useMemo(() => {
    return Array.isArray(data) && isCallSuccess;
  }, [data, isCallSuccess]);

  /** Attributes */
  const attributes = React.useMemo(() => {
    if (!isValidData) return [];
    return data.map((dataItem) => dataItem.attributes);
  }, [isValidData, data]);

  const isValidDailyPoolVotingHarvest = React.useMemo(() => {
    if (!isValidData) return false;
    return attributes.length === 1;
  }, [isValidData, attributes]);

  const dailyPoolVotingHarvest = React.useMemo(() => {
    if (!isValidDailyPoolVotingHarvest) return null;
    return attributes[0];
  }, [isValidDailyPoolVotingHarvest, attributes]);

  return {
    data,
    isValidData,
    isLoadingDailyPoolVotingHarvest: isLoading,
    isCallSuccessDailyPoolVotingHarvest: isCallSuccess,
    isValidDailyPoolVotingHarvest,
    dailyPoolVotingHarvest,

    fetchDailyPoolVotingHarvest: fetch,
    setLoadingDailyPoolVotingHarvest: setLoading
  };
}
