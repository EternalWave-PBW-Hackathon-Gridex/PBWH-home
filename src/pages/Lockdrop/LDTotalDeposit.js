import { motion } from "framer-motion";
import SigmaButton from "../../components/Animation/SigmaButton";
import { URL } from "../../utils/constants";
import Connector from "../../context/WalletConnector/Connector";
import useLockdropConstants from "../../web3/hooks/Lockdrop/ReadOnly/useLockdropConstants";
import useSigmaDidMount from "../../hooks/useSigmaDidMount";
import { Loading } from "../../components/Loading";
import { TOKENS } from "../../web3/constants";
import { isMobile } from "react-device-detect";

const LDTotalDeposit = ({ MOTION_VARIANTS }) => {
  let { address } = Connector.useContainer();
  const { isLoadingTotalDeposit, displayTotalDeposit, fetchTotalDeposit } =
    useLockdropConstants(address);

  useSigmaDidMount(
    () => {
      fetchTotalDeposit();
    },
    [],
    false
  );

  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className="md:w-[780px] w-full flex items-center justify-between shogun_bg-secondary sm:p-[30px] p-[20px] rounded-md"
    >
      <p className="whitespace-pre-line sm:text-[16px] text-[13px]">{`Total Locked MESH`}</p>

      <div className="flex flex-col items-end">
        <div className="flex items-center">
          <div className="sm:w-[26px] w-[23px] sm:h-[26px] h-[23px] sm:mr-[12px] mr-[9px]  ">
            <img src={TOKENS.MESH.logo} alt="bg" />
          </div>
          <div className="relative flex justify-end items-center">
            {isLoadingTotalDeposit ? (
              <Loading />
            ) : (
              <p
                className={`sm:font-semibold font-medium sm:text-[20px] text-[18px] whitespace-pre-line flex text-right`}
              >
                {`${displayTotalDeposit} ${TOKENS.MESH.name}`}
              </p>
            )}
          </div>
        </div>
        <SigmaButton>
          <a
            className="flex items-center opacity-60 "
            href={"https://gleam.io/Bp1B9/shogun-30000-usdc-giveaway-event"}
            target="_blank"
            rel="noreferrer"
          >
            <p className="sm:text-[18px] text-[12px] text-white underline">
              {`${isMobile ? "" : "📢 Join "}💰30,000 $USDC${
                isMobile ? "" : " Giveaway"
              } Event!`}
            </p>
          </a>
        </SigmaButton>
      </div>
    </motion.div>
  );
};

export default LDTotalDeposit;
