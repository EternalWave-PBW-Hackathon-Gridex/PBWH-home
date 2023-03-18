import React from "react";

import ConvertInputDisplay from "./ConvertInputDisplay";

const Convert = () => {
  /** Life Cycle */

  return (
    <section className="w-full  flex flex-col items-center">
      <div className="lg:mt-[60px] md:mt-[40px] mt-[20px] w-[90%]">
        {/* Top Display */}

        {/* Convert  */}
        <ConvertInputDisplay />
        <div className="sm:min-h-0 min-h-[20px]" />
      </div>
      <div className=" h-[50px]" />
    </section>
  );
};

export default Convert;
