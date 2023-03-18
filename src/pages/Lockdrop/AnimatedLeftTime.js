import { motion, AnimatePresence } from "framer-motion";

const AnimatedLeftTime = ({ className, unit, leftTime }) => {
  return (
    <AnimatePresence>
      <div className={`${className} flex justify-center items-center`}>
        <motion.div
          key={`AnimatedLeftTime-${unit}-${leftTime}`}
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            ease: "easeOut",
            duration: 1
          }}
        >
          <div
            className={` w-fit flex justify-end  ${
              unit === "s" && "overflow-hidden min-w-[35px] max-w-[45px]"
            }`}
          >
            {`${leftTime}`}
          </div>
        </motion.div>
        <p className="ml-[2px]">{unit}</p>
      </div>
    </AnimatePresence>
  );
};

export default AnimatedLeftTime;
