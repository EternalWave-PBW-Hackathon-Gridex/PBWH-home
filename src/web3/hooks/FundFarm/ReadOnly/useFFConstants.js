import useFFBalanceOf from "./useFFBalanceOf";

export default function useFFConstants(fromAddress) {
  return {
    ...useFFBalanceOf(fromAddress)
  };
}
