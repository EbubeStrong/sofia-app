import React from "react";
import type { MenuProps } from "antd";
import { Dropdown } from "antd";

interface DropdownProps {
  label: React.ReactNode;
  items: MenuProps["items"];
}

const SofiaDropdown: React.FC<DropdownProps> = ({ label, items }) => {
  return (
    <Dropdown menu={{ items }} trigger={["click"]}>
      {label}
    </Dropdown>
  );
};

export default SofiaDropdown;
