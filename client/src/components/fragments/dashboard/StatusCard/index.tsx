import React from "react";

interface StatusCardProps {
  icon: React.ReactNode;
  totalValue: number;
  title: string;
}

const StatusCard: React.FC<StatusCardProps> = (props) => {
  const { icon, totalValue, title } = props;
  return (
    <div className="status-display-wrapper w-[300px] h-[100px] bg-white shadow-lg my-5 rounded-lg">
      <div className="w-full h-full status-display px-3">
        <h3 className="text-md mt-4 text-slate-400 font-bold font-roboto">{title}</h3>
        <div className="text-xl text-black font-bold flex items-center justify-between gap-2">
          <h4>
            {title !== "Today's Users" && title !== "Today's Orders" && "$"} {totalValue}
          </h4>
          <span className="text-2xl font-bold text-slate-100 mx-3 bg-orange-400 rounded-lg p-2">{icon}</span>
        </div>
      </div>
    </div>
  );
};

export default StatusCard;
