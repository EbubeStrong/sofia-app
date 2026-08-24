"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SofiaDrawers from "../Drawers";

interface MenuContent {
  title: string;
  link: string;
  roles: string[];
}

interface ISidemenuProps {
  menus: {
    title: string;
    content: MenuContent[];
  }[];
  currentRole: string;
}

const SettingSideMenu: React.FC<ISidemenuProps> = ({ menus, currentRole }) => {
  const pathname = usePathname();
  const [openSidemenu, setOpenSidemenu] = useState(false);

  const renderSettingSideMenu = () => {
    return (
      <div className="w-full max-w-full xl:max-w-[240px] bg-white xl:border-r border-solid border-sofia_dark/10 relative xl:fixed left-0 xl:left-[260px] top-0 xl:top-[80px] xl:bottom-0 h-full lg:px-3 lg:pb-4 pt-2 lg:pt-2">
        {menus.map((li) => (
          <div key={li.title} className="flex flex-col mb-0">
            <p className="text-base font-bold text-[#101010]/70 mb-4 mt-4">
              {li.title}
            </p>
            <div
              className={`${
                li.title === "Medical Record" ? "md:pb-20" : ""
              } flex flex-col gap-1`}
            >
              {li.content.map(
                (l) =>
                  l.roles.includes(currentRole as string) && (
                    <Link
                      key={l.title}
                      href={l.link}
                      className={`flex items-center gap-2 ${
                        pathname.startsWith(l.link)
                          ? "bg-[#D33B52]/5 !text-[#D33B52] font-semibold border-l-4 border-solid border-[#D33B52]"
                          : "bg-transparent hover:bg-[#00000020] !text-[#101010]/70 hover:text-[#101010]/70 focus:text-[#101010]/70 font-normal"
                      } text-sm px-[10px] py-3 duration-300`}
                      onClick={() => setOpenSidemenu(false)}
                    >
                      {l.title}
                    </Link>
                  )
              )}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <main>
      <button
        className="z-[998] bg-white relative shadow-md block xl:hidden py-0.5 px-3 mb-5"
        onClick={() => setOpenSidemenu(!openSidemenu)}
      >
        {!openSidemenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>

      <div className="hidden xl:block">{renderSettingSideMenu()}</div>

      <SofiaDrawers
        placement={"left"}
        open={openSidemenu}
        onClose={() => setOpenSidemenu(false)}
        width={280}
      >
        <div className="pt-28">{renderSettingSideMenu()}</div>
      </SofiaDrawers>
    </main>
  );
};

export default SettingSideMenu;
