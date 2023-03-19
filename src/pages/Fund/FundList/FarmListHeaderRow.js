const FarmListHeaderRow = ({ className }) => {
  return (
    <div className={`${className} w-full sm:flex hidden px-[30px]`}>
      <div className="w-[13%]" />
      <div className=" w-[43%]">
        {" "}
        <FarmListHeaderItem title="Composition" />
      </div>
      <div className="w-[9%] ">
        <FarmListHeaderItem title="TVL" />
      </div>
      <div className=" w-[9%]">
        <FarmListHeaderItem title="APR" />
      </div>
      <div className="w-[13%]">
        <FarmListHeaderItem title="Your Deposits" />
      </div>
      <div className=" w-[13%]">
        <FarmListHeaderItem title="Your Earnings" />
      </div>
    </div>
  );
};

const FarmListHeaderItem = ({ title }) => {
  return (
    <div className={`flex w-full items-center justify-center h-full  `}>
      <p className="xlg:text-[14px] lg:text-[13px] text-[12px] opacity-50 xlg:mr-[5px] lg:mr-[4px] mr-[3px]">
        {title}
      </p>
      {/* {sortable && (
        <div className="lg:w-[10px] lg:h-[10px] w-[9px] h-[9px] flex">
          <Image src={SortIcon} alt="sort" />
        </div>
      )} */}
    </div>
  );
};

export default FarmListHeaderRow;
