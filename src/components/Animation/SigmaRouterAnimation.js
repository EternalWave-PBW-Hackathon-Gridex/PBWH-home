import { motion } from "framer-motion";

const SigmaRouterAnimation = (props) => {
  const { children } = props;
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      {...props}
      // exit={{ opacity: 0, y: -20, transition: { duration: 0.6 } }}
      // variants={{ visible: { transition: { staggerChildren: 0.3 } } }}
    >
      {children}
    </motion.section>
  );
};

export default SigmaRouterAnimation;
