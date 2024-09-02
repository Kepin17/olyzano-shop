interface UserChartProps {
  children: React.ReactNode;
}

const DailyChartLayout: React.FC<UserChartProps> = (props) => {
  const { children } = props;
  return (
    <>
      <ul className="text-black  w-[100px] h-[180px] text-start p-3 px-5  font-roboto ">{children}</ul>
      <div className="w-full flex flex-col">
        <div className="w-full h-full px-5 py-2 flex gap-[4rem]">
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
          <div className="bar w-2 h-full rounded-lg bg-orange-500"></div>
        </div>
        <div className="w-full h-10 flex gap-5 text-sm text-black font-semibold">
          <p>Sunday</p>
          <p>Monday</p>
          <p>Tuesday</p>
          <p>Wednesday</p>
          <p>Thursday</p>
          <p>Friday</p>
          <p>Saturday</p>
        </div>
      </div>
    </>
  );
};

export default DailyChartLayout;
