import React from "react";
import { FaUserCheck } from "react-icons/fa";

interface StatusCardButtonProps {
  title: string;
  total: number;
  onClick?: () => void;
}

const StatusCardButton: React.FC<StatusCardButtonProps> = (props) => {
  const { title, total, onClick } = props;
  return (
    <>
      <div className="status-card w-[180px] h-[100px] bg-white rounded-lg shadow-xl p-3 cursor-pointer hover:bg-orange-100" onClick={onClick}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 text-xl bg-orange-600 text-white rounded-lg flex justify-center items-center">
            <FaUserCheck />
          </div>
          <h3 className="text-md font-bold font-roboto">{title}</h3>
        </div>
        <p className="text-md font-bold font-roboto mt-2">
          {title === "Sales" && "Rp."} {total}
        </p>
      </div>
    </>
  );
};

export default StatusCardButton;
