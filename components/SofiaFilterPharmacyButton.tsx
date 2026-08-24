"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Checkbox } from "antd";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";

import FilterIcon from "@/public/images/filter-icon.svg";

const CheckBoxStyle = styled.div`
  .ant-checkbox + span {
    color: #111010;
    font-size: 16px;
    font-family: var(--font-libre-franklin);
  }
`;

interface SofiaFilterButtonProps {
  options: string[];
  value?: string[];
  onChange?: (values: string[]) => void;
}

const SofiaFilterPharmacyButton: React.FC<SofiaFilterButtonProps> = ({
  options,
  value = [],
  onChange,
}) => {
  const [openFilterModal, setOpenFilterModal] = useState(false);

  const handleFilterToggle = () => {
    setOpenFilterModal((prev) => !prev);
  };

  const handleCheckChange = (list: string[]) => {
    onChange?.(list);
  };

  const handleRemoveChecked = (item: string) => {
    const updated = value.filter((v) => v !== item);
    onChange?.(updated);
  };

  return (
    <div className="flex-1 relative hidden lg:block">
      <div className="flex items-center gap-2">
        {/* Filter button */}
        <button
          onClick={handleFilterToggle}
          className="flex items-center justify-center gap-2 text-base text-[#111010] font-medium font-libre_franklin bg-white border border-solid border-[#000]/8 px-4 h-12 rounded-lg"
        >
          <Image src={FilterIcon} alt="Filter" priority />
          Filter by
        </button>

        {/* Selected filters */}
        <div className="flex items-center gap-2 flex-wrap">
          {value.map((checked) => (
            <button
              key={checked}
              onClick={() => handleRemoveChecked(checked)}
              className="flex items-center gap-3 text-base text-[#111010] font-medium font-libre_franklin bg-white border border-solid border-[#000]/8 px-4 h-12 rounded-lg"
            >
              {checked} <CloseOutlined />
            </button>
          ))}
        </div>
      </div>

      {/* Dropdown */}
      {openFilterModal && (
        <div className="absolute top-[60px] left-0 z-[100] w-[200px] p-3 bg-white border border-solid border-[#000]/8 rounded-lg shadow-sm">
          <CheckBoxStyle>
            <Checkbox.Group
              options={options}
              value={value}
              onChange={handleCheckChange}
              className="flex flex-col gap-2"
            />
          </CheckBoxStyle>
        </div>
      )}
    </div>
  );
};

export default SofiaFilterPharmacyButton;
