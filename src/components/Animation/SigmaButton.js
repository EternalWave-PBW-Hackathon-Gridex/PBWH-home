import { motion } from "framer-motion";

const SigmaButton = (props) => {
  const {
    children,
    className,
    whileHover = { scale: 1.1 },
    transition = { type: "spring", stiffness: 400, damping: 10 }
  } = props;
  return (
    <motion.div
      {...props}
      className={`cursor-pointer ${className}`}
      whileHover={whileHover}
      transition={transition}
    >
      {children}
    </motion.div>
  );
};

export default SigmaButton;
