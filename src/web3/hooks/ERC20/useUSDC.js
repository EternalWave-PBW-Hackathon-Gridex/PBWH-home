import useERC20Allowance from "./useERC20Allowance";
import useERC20Approve from "./useERC20Approve";
import useUSDCBalance from "./useUSDCBalance";

export default function useUSDC(tokenContract) {
  return {
    ...useUSDCBalance(tokenContract),
    ...useERC20Allowance(tokenContract),
    ...useERC20Approve(tokenContract)
  };
}
