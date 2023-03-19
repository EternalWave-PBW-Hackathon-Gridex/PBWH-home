import React from "react";
import FundList from "./FundList";

const Fund = (props) => {
  return (
    <section className="w-full  flex justify-center">
      <div className="sm:mt-[60px] mt-[30px] w-[90%] ">
        {/* Farm List  */}
        <FundList />
      </div>
    </section>
  );
};

export default Fund;
