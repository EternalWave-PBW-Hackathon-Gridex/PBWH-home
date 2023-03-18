import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";
import useERC20TotalSupply from "../../../web3/hooks/ERC20/useERC20TotalSupply";

export default function useXSHOStakingRowERC20(tokenContract) {
  return {
    ...useERC20TotalSupply(tokenContract),
    ...useERC20Balance(tokenContract)
  };
}
