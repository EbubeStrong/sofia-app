"use client";

import React from "react";
import { IMenuSideNavProps } from "./types";
import Link from "next/link";
import { SideNavData } from "./utils/sidenav-data";
import SofiaDrawers from "../Drawers";

const MenuSideNav: React.FC<IMenuSideNavProps> = ({
  menuPlacement,
  handleMenuClose,
  isMenuOpen,
}) => {
  return (
    <SofiaDrawers
      placement={menuPlacement}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <div className="flex flex-col gap-5 pt-20">
        {SideNavData.map((li) => (
          <Link
            key={li.title}
            href={li.link}
            className="text-base text-[#6B7280] hover:text-[#6B7280] focus:text-[#6B7280] font-medium flex items-center gap-2"
          >
            {li.icon} {li.title}
          </Link>
        ))}
      </div>
    </SofiaDrawers>
  );
};

export default MenuSideNav;
