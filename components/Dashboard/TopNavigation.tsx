"use client";

import React, { useState, useEffect } from "react";
import { BellOutlined } from "@ant-design/icons";
import Image from "next/image";

import MenuSideNav from "./MenuSideNav";
import SofiaDropdown from "../Dropdowns";
import { ChevronDown, SearchIcon } from "@/assets/icons";
import { TopNavDropdownItems } from "../Dropdowns/dropdown-data";
import BrandLogo from "@/assets/logo/Sofia Central Logo.svg";
import { formatFullName, getInitials } from "@/utils/getInitials";
import storage from "@/config/storage";
import { UserInfoResponse } from "@/interfaces/general";
import FormInput from "../FormElements/FormInput";

const TopNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState({} as UserInfoResponse);

  useEffect(() => {
    const user = storage.getUser();

    setUser(user as UserInfoResponse);
  }, []);

  const handleMenuDrawer = () => {
    setIsMenuOpen(true);
  };

  const handleMenuClose = () => {
    setIsMenuOpen(false);
  };

  const renderDropdownLabel = () => {
    return (
      <button className="flex items-center gap-2 bg-white border border-solid border-sofia_dark/10 py-1.5 px-2 rounded-lg">
        <span className="w-10 h-10 text-sm flex items-center justify-center bg-[#1175C0] text-white font-semibold rounded-[50px] tracking-[5%]">
          {getInitials(`${user?.firstName} ${user?.lastName}`)}
        </span>
        <div className="text-start">
          <p className="text-sofia_dark text-sm w-[140px] line-clamp-1 font-semibold leading-[19.39px] tracking-[5%] font-libre_franklin">
            {formatFullName(`${user?.firstName} ${user?.lastName}`)}
          </p>
          <p className="text-[#21212180] text-xs leading-[14.54px] line-clamp-1 w-[140px] tracking-[5%] font-medium font-libre_franklin">
            {user?.email ?? "---"}
          </p>
        </div>
        <div className="w-5 h-5 text-sofia_dark/50">
          <ChevronDown />
        </div>
      </button>
    );
  };

  return (
    <div className="w-full xl:w-[calc(100%-260px)] max-w-full fixed top-0 left-0 right-0 ml-0 xl:ml-[260px] bg-white border-b border-solid border-sofia_dark/10 z-[1000]">
      <div className="flex items-center justify-between h-20 p-3.5 md:p-4 lg:p-6">
        <Image
          src={BrandLogo}
          alt="Logo of the brand"
          className="w-[50px] h-auto block xl:hidden"
          priority
        />

        <div className="w-full max-w-[35%]">
          <FormInput prefix={<SearchIcon />} placeholder="Search dashboard" />
        </div>

        <div className="flex items-center gap-5">
          <div className="flex items-center justify-center gap-2 bg-[#EFF1F3CC] border border-solid border-sofia_dark/10 rounded-lg py-1 px-1">
            <BellOutlined className="text-xl text-[#101010]" />
            <p className="px-3 text-sm w-fit h-7 font-semibold flex items-center bg-[#D91F11] text-white rounded-md">
              1
            </p>
          </div>

          <div className="hidden md:block">
            <SofiaDropdown
              label={renderDropdownLabel()}
              items={TopNavDropdownItems()}
            />
          </div>

          {!isMenuOpen ? (
            <button
              className="open-menu border-none block xl:hidden"
              onClick={handleMenuDrawer}
              aria-label="Open menu"
            >
              <span></span>
              <span></span>
            </button>
          ) : (
            <button
              className="close-menu border-none block xl:hidden"
              onClick={handleMenuClose}
              aria-label="Close menu"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          )}
        </div>
      </div>

      <MenuSideNav
        isMenuOpen={isMenuOpen}
        handleMenuClose={handleMenuClose}
        menuPlacement={"left"}
      />
    </div>
  );
};

export default TopNavigation;
