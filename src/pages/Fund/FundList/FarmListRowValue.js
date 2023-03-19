import { Loading } from "../../../components/Loading";
import { WalletConnection } from "../../../components/SigmaValueDisplay";

const FarmListRowValue = ({
  valueNode,
  loading,
  isWalletConnected = false
}) => {
  return !isWalletConnected ? (
    <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
  ) : loading ? (
    <Loading className="sm:w-[20px] w-[16px] sm:h-[20px] h-[16px]" />
  ) : (
    valueNode
  );
};
export default FarmListRowValue;
