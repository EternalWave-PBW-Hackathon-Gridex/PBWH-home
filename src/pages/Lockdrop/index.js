import React from "react";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import LoadingLayout from "../../components/Loading/LoadingLayout";
import ComingSoon from "./Stages/ComingSoon";
import Unlimited from "./Stages/Unlimited";
import WithdrawOnly from "./Stages/WithdrawOnly";
import Redeem from "./Stages/Redeem";

dayjs.extend(utc);

export const STAGE_TYPES = {
  COMINGSOON: {
    key: "COMINGSOON",
    name: "Coming soon"
  },
  UNLIMITED: {
    key: "UNLIMITED",
    name: "Unlimited Stage"
  },
  WITHDRAWONLY: {
    key: "WITHDRAWONLY",
    name: "Withdraw Only"
  },
  REDEEM: {
    key: "REDEEM",
    name: "Redeem Stage"
  }
};

const STAGE_ONE_START_UNIX = 1672498800;
const STAGE_TWO_START_UNIX = 1672844400;
export const STAGE_TWO_END_UNIX = 1672930800;
const STAGE_ONE_DURATION = STAGE_TWO_START_UNIX - STAGE_ONE_START_UNIX;

const Lockdrop = () => {
  const [currentUnixTime, setCurrentUnixTime] = React.useState(0);

  /** Life Cycle */
  React.useEffect(() => {
    const interval = setInterval(intervalCallback, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const intervalCallback = React.useCallback(() => {
    const currentUnixTime = dayjs().utc().unix(); // utc current time unit
    setCurrentUnixTime(currentUnixTime);
  }, [setInterval]);

  /** UI */
  // const stageType = STAGE_TYPES.UNLIMITED.key;
  const stageType = React.useMemo(() => {
    if (currentUnixTime === 0) return null;
    if (currentUnixTime < STAGE_ONE_START_UNIX) {
      return STAGE_TYPES.COMINGSOON.key;
    } else if (
      STAGE_ONE_START_UNIX <= currentUnixTime &&
      currentUnixTime < STAGE_TWO_START_UNIX
    ) {
      return STAGE_TYPES.UNLIMITED.key;
    } else if (
      STAGE_TWO_START_UNIX <= currentUnixTime &&
      currentUnixTime < STAGE_TWO_END_UNIX
    ) {
      return STAGE_TYPES.WITHDRAWONLY.key;
    } else {
      return STAGE_TYPES.REDEEM.key;
    }
  }, [currentUnixTime]);

  const step = React.useMemo(() => {
    if (
      stageType === STAGE_TYPES.COMINGSOON.key ||
      stageType === STAGE_TYPES.REDEEM.key
    )
      return;
    if (stageType === STAGE_TYPES.WITHDRAWONLY.key) return 5;
    for (let i = 0; i < 4; i++) {
      const unitTime =
        STAGE_ONE_START_UNIX + STAGE_ONE_DURATION * 0.25 * (i + 1);
      if (currentUnixTime < unitTime) return i + 1;
    }
  }, [currentUnixTime]);

  const LEFT_UNIT_TIME = React.useMemo(
    () =>
      stageType === STAGE_TYPES.COMINGSOON.key
        ? STAGE_ONE_START_UNIX
        : stageType === STAGE_TYPES.UNLIMITED.key
        ? STAGE_TWO_START_UNIX
        : STAGE_TWO_END_UNIX,
    [stageType]
  );

  const leftSeconds = React.useMemo(
    () =>
      currentUnixTime > 0
        ? Math.floor((LEFT_UNIT_TIME - currentUnixTime) % 60)
        : 0,
    [currentUnixTime]
  );
  const leftMinutes = React.useMemo(
    () =>
      currentUnixTime > 0
        ? Math.floor(((LEFT_UNIT_TIME - currentUnixTime) % (60 * 60)) / 60)
        : 0,
    [leftSeconds]
  );

  const leftHours = React.useMemo(
    () =>
      currentUnixTime > 0
        ? Math.floor(
            ((LEFT_UNIT_TIME - currentUnixTime) % (60 * 60 * 24)) / (60 * 60)
          )
        : 0,
    [leftMinutes]
  );

  const leftDays = React.useMemo(() => {
    if (
      stageType === STAGE_TYPES.UNLIMITED.key ||
      stageType === STAGE_TYPES.COMINGSOON.key
    ) {
      return currentUnixTime > 0
        ? Math.floor((LEFT_UNIT_TIME - currentUnixTime) / (60 * 60 * 24))
        : 0;
    } else {
      return 0;
    }
  }, [leftMinutes]);

  const description = React.useMemo(() => {
    switch (stageType) {
      case STAGE_TYPES.COMINGSOON.key:
        return {
          stage: "Begins in",
          day: "Shogun Lockdrop",
          des: `Participate in the Shogun Protocol Lockdrop by committing MESH.
        
          By participating in the lockdrop, users will receive SHO tokens as a reward for contributing liquidity.   
          
          50% of the MESH committed will be used to mint shoMESH to generate liquidity for the shoMESH-MESH pair on Meshswap. After Lock period, you will be able to claim shoMESH-MESH LP tokens.   
          
          You receive SHO Incentives for the Lockdrop participation`
        };
      case STAGE_TYPES.UNLIMITED.key:
        return {
          stage: "Time left in this stage",
          day: "Day 1 - 4",
          des: `During this period, there are no limit on deposits or withdrawals of MESH.
          Once this period ends, you will no longer be able to deposit MESH.
    
          50% of the MESH committed will be used to mint shoMESH to generate liquidity for the shoMESH-MESH pair on Meshswap. After Lock period, you will be able to claim shoMESH-MESH LP tokens. 
          
          You receive SHO Incentives for the Lockdrop participation`
        };

      case STAGE_TYPES.WITHDRAWONLY.key:
        return {
          stage: "Time left in this stage",
          day: "Day 5",
          des: `During this period, you can only withdraw MESH.
          The amount you can withdraw decreases every hour by 1/24th (4.2%)
          Only 1 withdrawal transaction can be made during this period.`
        };
      case STAGE_TYPES.REDEEM.key:
        return {
          stage: "",
          day: "Redeem Your Tokens",
          des: `When the SHO-USDC pool is live on Meshswap you can redeem 
          your SHO tokens here.`
        };

      default:
        return {
          stage: "",
          day: "",
          des: ``
        };
    }
  }, [stageType]);

  const StageComponent = React.useMemo(() => {
    switch (stageType) {
      case STAGE_TYPES.COMINGSOON.key:
        return (
          <ComingSoon
            stageType={stageType}
            description={description}
            leftDays={leftDays}
            leftHours={leftHours}
            leftMinutes={leftMinutes}
            leftSeconds={leftSeconds}
          />
        );

      case STAGE_TYPES.UNLIMITED.key:
        return (
          <Unlimited
            stageType={stageType}
            description={description}
            leftDays={leftDays}
            leftHours={leftHours}
            leftMinutes={leftMinutes}
            leftSeconds={leftSeconds}
            step={step}
          />
        );

      case STAGE_TYPES.WITHDRAWONLY.key:
        return (
          <WithdrawOnly
            stageType={stageType}
            description={description}
            leftDays={leftDays}
            leftHours={leftHours}
            leftMinutes={leftMinutes}
            leftSeconds={leftSeconds}
            step={step}
          />
        );

      case STAGE_TYPES.REDEEM.key:
        return <Redeem stageType={stageType} description={description} />;

      default:
        return null;
    }
  }, [stageType, leftSeconds]);

  return (
    <section className="w-full  flex flex-col items-center relative sigma_inner h-full ">
      <LoadingLayout />
      <div className="min-h-[60px]" />

      {StageComponent}

      <div className="w-full min-h-[75px]" />
    </section>
  );
};

export default Lockdrop;
