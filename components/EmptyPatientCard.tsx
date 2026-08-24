"use client";

import React from "react";
import Image from "next/image";
import { FaPlus } from "react-icons/fa";

interface IEmptyCardProps {
  title: string;
  onHandleAction?: () => void;
  buttonLabel: string;
}

//components
import FirstAidBox from "@/public/images/first-aid-box.svg";

const EmptyPatientCard: React.FC<IEmptyCardProps> = ({
  title,
  onHandleAction = () => {},
  buttonLabel,
}) => {
  return (
    <div className="flex flex-col gap-1">
      <Image src={FirstAidBox} alt="First Aid Box" priority />
      <p className="text-sm md:text-base text-[#101010]/70 font-normal font-libre_franklin leading-relaxed mb-1">
        {title}
      </p>
      <button
        onClick={onHandleAction}
        className="flex items-center gap-1 text-sm md:text-base text-[#101010] font-semibold font-libre_franklin"
      >
        <FaPlus /> {buttonLabel}
      </button>
    </div>
  );
};

export default EmptyPatientCard;
