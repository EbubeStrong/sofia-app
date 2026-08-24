import React from "react";
import tw from "tailwind-styled-components";

type StatCardProps = {
  id: string;
  title: string;
  amount: string | number;
  icon: React.ReactNode;
  extra?: string;
};

const DCard = tw.div`
    ${(p: Partial<{ $type: string }>) =>
      p.$type === "totalPatients"
        ? "bg-[#1D3354] divide-white/10"
        : "bg-white border border-solid border-dark/20"} 

    p-4 rounded-lg h-auto font-libre_franklin
`;

const DTitle = tw.p`
    ${(p: Partial<{ $type: string }>) =>
      p.$type === "totalPatients" ? "text-white" : "text-[#101010]/70"} 

    pb-2 text-sm font-normal font-libre_franklin
`;

const StatsCardVariant: React.FC<StatCardProps> = ({
  id,
  title,
  amount,
  icon,
  extra,
}) => {
  return (
    <DCard $type={id} key={id} className="relative">
      <DTitle $type={id}>{title}</DTitle>

      <p
        className={`${
          id === "totalPatients" ? "text-white" : "text-sofia_dark"
        } text-xl md:text-2xl font-bold text-sofia_dark font-libre_franklin`}
      >
        {amount}
      </p>

      {extra && (
        <p className="text-sm text-[#101010]/70 font-normal font-libre_franklin">
          {extra}
        </p>
      )}

      <div
        className={`absolute top-0 right-0 m-4 w-11 h-11 flex items-center justify-center rounded-full`}
      >
        {icon}
      </div>
    </DCard>
  );
};

export default StatsCardVariant;
