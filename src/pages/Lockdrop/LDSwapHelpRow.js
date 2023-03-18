import { motion } from "framer-motion";
import SigmaButton from "../../components/Animation/SigmaButton";
import { URL } from "../../utils/constants";

const LDSwapHelpRow = ({ MOTION_VARIANTS }) => {
  return (
    <motion.div
      variants={MOTION_VARIANTS}
      className="md:w-[780px] w-full flex sm:flex-row flex-col items-center justify-between shogun_bg-secondary sm:p-[30px] p-[20px] rounded-md"
    >
      <p className="whitespace-pre-line sm:text-[16px] text-[13px]">{`To participate in the lockdrop,
        users must have MESH in their wallet`}</p>

      <SigmaButton
        className="main_bg text-black sm:w-[176px] w-full sm:h-[60px] h-[48px] flex justify-center items-center sm:text-[18px] text-[14px] font-semibold rounded-md AKBtnEffect sm:mt-0 mt-[15px]"
        onClick={() => {
          window.open(`${URL.DEX}/exchange/swap`);
        }}
      >
        Swap MESH
      </SigmaButton>
    </motion.div>
  );
};

export default LDSwapHelpRow;
