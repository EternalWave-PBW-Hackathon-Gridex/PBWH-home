import React from "react";
import { useOutlet } from "react-router-dom";

import Navigator from "./navigator";
import Header from "./header";
import SigmaRouterAnimation from "../Animation/SigmaRouterAnimation";

const Layout = () => {
  const outlet = useOutlet();
  return (
    <div
      className="sigma flex flex-col relative layout overflow-hidden outer_bg "
      id="popup-root"
    >
      <Header />

      <main className="flex md:flex-row flex-col w-full h-full  text-white items-center  overflow-hidden  md:mb-0 mb-[64px] ">
        <Navigator className="md:flex hidden" />
        <SigmaRouterAnimation className="flex flex-col items-center md:min-w-[85%] w-full h-full overflow-y-scroll scroll_hide ">
          {outlet}
        </SigmaRouterAnimation>
      </main>
      <Navigator className="flex md:hidden fixed bottom-0" />
    </div>
  );
};

export default Layout;
