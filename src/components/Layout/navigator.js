import React from "react";
import { Link, NavLink } from "react-router-dom";
import SigmaButton from "../Animation/SigmaButton";
import { URL } from "../../utils/constants";
import { useSigmaAlert } from "../SigmaAlert";

/** Icons */
import LockdropIcon from "../../assets/images/navigator_lockdrop.png";
import LockdropActiveIcon from "../../assets/images/navigator_lockdrop-active.png";
import ConvertIcon from "../../assets/images/navigator_convert.png";
import ConvertActiveIcon from "../../assets/images/navigator_convert-active.png";
import MintIcon from "../../assets/images/navigator_mint.png";
import MintActiveIcon from "../../assets/images/navigator_mint-active.png";
import FarmIcon from "../../assets/images/navigator_farm.png";
import FarmActiveIcon from "../../assets/images/navigator_farm-active.png";
import VoteIcon from "../../assets/images/navigator_vote.png";
import VoteActiveIcon from "../../assets/images/navigator_vote-active.png";
import GovernIcon from "../../assets/images/navigator_govern.png";
import GovernActiveIcon from "../../assets/images/navigator_govern-active.png";

import DocsIcon from "../../assets/images/navigator_docs.png";
import TwitterIcon from "../../assets/images/navigator_twitter.png";
import MediumIcon from "../../assets/images/navigator_medium.png";
import TelegramIcon from "../../assets/images/navigator_telegram.png";
import DiscordIcon from "../../assets/images/navigator_discord.png";
import GithubIcon from "../../assets/images/navigator_github.png";

import SigmaLogo from "../../assets/images/global_logo-text.png";
import ClockIcon from "../../assets/images/global_clock.png";

const LINK_MENUS = {
  lockdrop: {
    name: "Lockdrop",
    to: "/lockdrop",
    icon: LockdropIcon,
    activeIcon: LockdropActiveIcon
  },

  convert: {
    name: "Convert",
    to: "/",
    icon: ConvertIcon,
    activeIcon: ConvertActiveIcon
    // disabled: true
  }
};

const Navigator = ({ className }) => {
  const { popupComponent, openModal, closeModal } = useSigmaAlert({
    defaultInfo: {
      title: "Coming Soon"
    },
    children: (
      <div className="flex  flex-col justify-center items-center">
        <div className="w-[180px] h-[180px] animate-pulse flex  mt-[10px]">
          <img src={ClockIcon} alt="clock" />
        </div>
        <SigmaButton>
          <a
            className="flex items-center opacity-60 AKBtnEffect "
            href={
              "https://docs.shogunprotocol.com/launch-sequence/launch-schedule"
            }
            target="_blank"
            rel="noreferrer"
          >
            <p className="lg:text-[30px] text-[24px] text-white font-semibold underline">
              Details
            </p>
          </a>
        </SigmaButton>
      </div>
    )
  });

  return (
    <section
      className={`${className} shogun_bg-secondary md:min-w-[15%] min-w-full  md:w-auto w-full items-center md:h-fit min-h-[64px] z-50 overflow-y-auto overflow-x-auto `}
    >
      {popupComponent}
      <div className=" md:min-w-[15%] min-w-full md:w-full w-full flex justify-center md:h-screen h-full ">
        <div className="flex md:flex-col md:w-8/12 w-full  text-white relative">
          {/* logo */}
          <SigmaButton>
            <Link to="/">
              <div className=" mt-[50px] md:flex hidden">
                <img src={SigmaLogo} alt="logo" />
              </div>
            </Link>
          </SigmaButton>

          {/* link menus */}
          <div className="flex md:flex-col w-full  h-full md:mt-[70px] mt-0 md:justify-start justify-between ">
            {Object.keys(LINK_MENUS).map((menuKey, index) => {
              const linkMenu = LINK_MENUS[menuKey];
              return (
                <LinkMenuItem
                  key={`LinkMenuItem-${index}`}
                  linkMenu={linkMenu}
                  openModal={openModal}
                />
              );
            })}
          </div>
          {/* bottom menus */}
          <div className=" absolute bottom-[60px] md:flex md:flex-col  w-full  hidden">
            <SigmaButton>
              <a
                className="flex items-center opacity-60 AKBtnEffect mb-[20px]"
                href={URL.DOCS}
                target="_blank"
                rel="noreferrer"
              >
                <img src={DocsIcon} alt="icon" width={10.67} height={13.33} />
                <p className="lg:text-[14px] text-[12px] lg:ml-[10px] ml-[8px]">
                  Shogun Docs
                </p>
              </a>
            </SigmaButton>
            <div className="h-[1px] opacity-60 mb-[25px]" />
            <div className="flex">
              <LinkIconItem icon={TwitterIcon} href={URL.TWITTER} />
              <LinkIconItem icon={MediumIcon} href={URL.MEDIUM} />
              <LinkIconItem icon={TelegramIcon} href={URL.TELEGRAM} />
              <LinkIconItem icon={DiscordIcon} href={URL.DISCORD} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const LinkMenuItem = ({ linkMenu, openModal }) => {
  const { to, name, icon, activeIcon, disabled } = linkMenu;

  return (
    <SigmaButton
      onClick={() => {
        if (disabled) openModal();
      }}
    >
      <NavLink
        style={disabled ? { pointerEvents: "none" } : {}}
        to={to}
        children={({ isActive }) => {
          return (
            <div
              className={`flex md:flex-row flex-col md:justify-start justify-center items-center ${
                !isActive && "opacity-60"
              } lg:mb-[40px] md:mb-[30px] mb-0 ${
                isActive && "main_c"
              } md:w-auto min-w-[88px]`}
            >
              <div
                className={`flex lg:min-w-[24px] lg:w-[24px] lg:h-[24px] min-w-[20px] w-[20px] h-[20px]`}
              >
                <img src={isActive ? activeIcon : icon} alt="icon" />
              </div>

              {name && (
                <p
                  className={`${
                    isActive
                      ? "lg:font-bold md:font-semibold font-medium"
                      : "font-medium"
                  }  lg:ml-[10px] lg:text-[18px] md:text-[16px] sm:text-[13px] text-[10px]  md:ml-[8px] ml-0  md:mt-0 mt-[5px]`}
                >
                  {name}
                </p>
              )}
            </div>
          );
        }}
      ></NavLink>
    </SigmaButton>
  );
};

const LinkIconItem = ({ icon, href }) => {
  return (
    <SigmaButton>
      <a href={href} target="_blank" rel="noreferrer">
        <div className="flex opacity-60 lg:w-[24px] w-[20px] lg:h-[24px] h-[20px] mr-[5px]">
          <img src={icon} alt="icon" />
        </div>
      </a>
    </SigmaButton>
  );
};

export default Navigator;
