import React from "react";
import { Radio } from "@mui/material";

const AKRadioAgreement = ({
  className,
  message,
  radioColor,
  initialSelectedValue = false
}) => {
  const [isRadioSelected, setIsRadioSelected] =
    React.useState(initialSelectedValue);

  const handleRadioChange = (e) => {
    setIsRadioSelected(e.target.checked);
  };

  const component = (
    <div className={`${className} flex items-center  w-full`}>
      <Radio
        checked={isRadioSelected === true}
        onChange={handleRadioChange}
        value="a"
        color="default"
        sx={{
          color: "white",
          "&.Mui-checked": {
            color: radioColor ? radioColor : "#33ff99"
          }
        }}
      />
      <p className=" sm:text-[14px] text-[12px] font-medium text-white whitespace-pre-wrap text-left">
        {message}
      </p>
    </div>
  );

  return {
    isRadioSelected,
    radioComponent: component
  };
};

export default AKRadioAgreement;
