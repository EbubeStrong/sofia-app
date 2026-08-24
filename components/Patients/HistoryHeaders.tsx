import React from "react";

interface IHistoryHeadersProps {
  title: string;
  desc: string;
}

const HistoryHeader: React.FC<IHistoryHeadersProps> = ({ title, desc }) => {
  return (
    <div>
      <h3 className="text-lg md:text-xl text-[#101010] font-bold">{title}</h3>
      <p className="text-sm md:text-base text-[#010101]/70 font-normal">
        {desc}
      </p>
    </div>
  );
};

export default HistoryHeader;
