import React from "react";
import FarmList from "./FarmList";

const Farm = (props) => {
  return (
    <section className="w-full  flex justify-center">
      <div className="sm:mt-[60px] mt-[30px] w-[90%] ">
        {/* Farm List  */}
        <FarmList />
      </div>
    </section>
  );
};

export default Farm;
