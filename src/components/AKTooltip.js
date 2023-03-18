import { Tooltip } from "@mui/material";
import QuestionIcon from "../assets/images/global_tooltip.png";
const AKTooltip = (props) => {
  const { parent, tooltipElement, iconClassName } = props;
  return (
    <Tooltip
      enterTouchDelay={0}
      componentsProps={{
        tooltip: {
          sx: {
            maxWidth: "none"
          }
        }
      }}
      title={tooltipElement}
    >
      {parent || (
        <div
          className={`${iconClassName} flex justify-center items-center w-[15px] h-[15px] cursor-help mx-[8px]`}
        >
          <img src={QuestionIcon} alt="icon" />
        </div>
      )}
    </Tooltip>
  );
};

export default AKTooltip;
