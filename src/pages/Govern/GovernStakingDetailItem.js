import { Loading } from "../../components/Loading";
import { WalletConnection } from "../../components/SigmaValueDisplay";

const GovernStakingDetailItem = ({
  className,
  title,
  contentNode,
  loading,
  isWalletConnected = true
}) => {
  return (
    <div
      className={`${className}  w-full h-full flex sm:flex-col flex-row sm:justify-start justify-between sm:items-start items-center`}
    >
      <p className="text-[14px] opacity-50">{title}</p>
      <div className="h-[12px]" />
      {!isWalletConnected ? (
        <WalletConnection className="sm:w-[16px] w-[12px] sm:h-[16px] h-[12px]" />
      ) : loading ? (
        <Loading />
      ) : (
        contentNode
      )}
    </div>
  );
};

export default GovernStakingDetailItem;
