import useERC20Balance from "../../../web3/hooks/ERC20/useERC20Balance";

export default function useSHOStakingRowSHObalance(tokenContract) {
  return {
    ...useERC20Balance(tokenContract)
  };
}
