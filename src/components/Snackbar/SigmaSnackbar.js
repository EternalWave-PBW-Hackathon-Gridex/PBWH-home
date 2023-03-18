import React from "react";
import { AnimatePresence, motion } from "framer-motion";

import { URL } from "../../utils/constants";

import SuccessIcon from "../../assets/images/global_toast_success.png";
import FailIcon from "../../assets/images/global_toast_fail.png";
import InfoIcon from "../../assets/images/global_toast_info.png";

export const durationTime = 4000;
export const TOAST_TYPE = {
  SUCCESS: "SUCCESS",
  FAIL: "FAIL",
  INFO: "INFO"
};
const _SigmaSnackbar = React.forwardRef((props, ref) => {
  const { message } = props;
  const { text, type, tx } = message;
  let icon;
  let colorClassName;
  let color;

  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    setIsOpen(true);
  }, []);

  const { SUCCESS, FAIL, INFO } = TOAST_TYPE;
  switch (type) {
    case SUCCESS:
      icon = SuccessIcon;
      colorClassName = "main_bg";
      color = "main_c";
      break;
    case FAIL:
      icon = FailIcon;
      colorClassName = "error_bg";
      color = "error_c";
      break;
    case INFO:
      icon = InfoIcon;
      colorClassName = "warning_bg";
      color = "warning_c";
      break;

    default:
      break;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.3 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.5 }}
        ref={ref}
        className=" text-white sm:w-[400px] w-[300px]  rounded-md bg-[#27292c] flex overflow-hidden relative"
      >
        <div className={`sm:min-w-[12px] min-[w-9px] ${colorClassName}`} />
        <div className=" w-full sm:py-[10px] py-[8px] sm:px-[13px] px-[10px] flex items-center">
          <div className="sm:w-[40px] w-[30px] sm:min-w-[40px] min-w-[30px]  sm:min-h-[40px] min-h-[30px] sm:mr-[15px] mr-[10px]">
            {icon ? (
              <img src={icon} alt="icon" />
            ) : (
              <div
                className={`sm:min-w-[40px] min-w-[30px] sm:min-h-[40px] min-h-[30px] ${
                  type === FAIL ? "error_bg" : "warning_bg"
                }`}
              />
            )}
          </div>
          <div className=" w-full  flex flex-col justify-between">
            <div className="relative sm:text-[16px] text-[14px] w-[80%] max-h-[190px] break-words  whitespace-pre-line overflow-hidden">
              {text}
            </div>
            {tx && (
              <a
                href={`${URL.SCOPE}/tx/${tx}`}
                target="_blank"
                rel="noreferrer"
              >
                <p
                  className={`${color} sm:text-[14px] text-[12px] font-medium`}
                >
                  View details
                </p>
              </a>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 w-full sm:h-[3px] h-[2px] ">
          <motion.div
            animate={{ width: 0 }}
            transition={{ ease: "linear", duration: durationTime / 1000 }}
            className={`bg-[#ffffff50] w-full absolute h-full`}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
});

_SigmaSnackbar.displayName = "SigmaSnackbar";

export const SigmaSnackbar = _SigmaSnackbar;
