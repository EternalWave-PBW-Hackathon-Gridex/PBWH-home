import useDailyStakingHarvest from "./useDailyStakingHarvest";
import useMiningHarvest from "./useMiningHarvest";
import useDailyPoolVotingHarvest from "./useDailyPoolVotingHarvest";

export default function useHarvest() {
  return {
    ...useDailyStakingHarvest(),
    ...useMiningHarvest(),
    ...useDailyPoolVotingHarvest()
  };
}
