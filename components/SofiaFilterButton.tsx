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

const plainOptions = ["Apple", "Pear", "Orange"];

const SofiaFilterButton = () => {
  const [openFilterModal, setOpenFilterModal] = useState(false);
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleFilterChange = () => {
    setOpenFilterModal(!openFilterModal);
  };

  const handleCheckChange = (list: string[]) => {
    setCheckedList(list);
  };

  const handleRemoveChecked = (list: string) => {
    const filteredCheckedList = checkedList.filter((item) => item !== list);
    setCheckedList(filteredCheckedList);
  };

  return (
    <div className="flex-1 relative hidden lg:block">
      <div className="flex items-center gap-2">
        <button
          onClick={handleFilterChange}
          className="flex items-center justify-center gap-2 text-base text-[#111010] font-medium font-libre_franklin bg-white border border-solid border-[#000]/8 px-4 w-auto h-12 rounded-lg"
        >
          <Image src={FilterIcon} alt="Open manage subscription" priority />
          Filter by
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {checkedList.map((checked) => (
            <button
              key={checked}
              onClick={() => handleRemoveChecked(checked)}
              className="flex items-center gap-3 text-base text-[#111010] font-medium font-libre_franklin bg-white border border-solid border-[#000]/8 px-4 w-auto h-12 rounded-lg"
            >
              {checked} <CloseOutlined />
            </button>
          ))}
        </div>
      </div>

      {openFilterModal && (
        <div className="absolute top-[60px] left-0 z-[100] w-[180px] h-auto p-2.5 bg-white border border-solid border-[#000]/8 rounded-lg">
          <CheckBoxStyle>
            <Checkbox.Group
              options={plainOptions}
              onChange={handleCheckChange}
              value={checkedList}
              className="flex flex-col gap-2"
            />
          </CheckBoxStyle>
        </div>
      )}
    </div>
  );
};

export default SofiaFilterButton;
