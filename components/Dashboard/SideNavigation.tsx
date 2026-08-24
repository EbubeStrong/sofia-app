"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";

import ArrowDown from "@/public/images/arrow-image.svg";
import BrandLogo from "@/assets/logo/Sofia Central Logo.svg";
import { SideNavData } from "./utils/sidenav-data";
import { TSideNavProps } from "@/interfaces/general";
import { usePathname } from "next/navigation";
import SofiaAccordion from "../Accordion";



interface TNavProps {
  currentRole: string;
}

const SideNavigation: React.FC<TNavProps> = ({ currentRole }) => {
  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const pathname = usePathname();

  const isRouteActive = (basePath: string) =>
    pathname === basePath || pathname.startsWith(`${basePath}/`);


  useEffect(() => {
    const activeDropdown = SideNavData.find(
      (item) =>
        item.type === "dropdown" &&
        item.children?.some((child) =>
          pathname.startsWith(child.basePath as string)
        )
    );

    if (activeDropdown) {
      setOpenKeys([activeDropdown.title]);
    } else {
      setOpenKeys([]);
    }
  }, [pathname]);


  const menu: TSideNavProps[] = SideNavData;

  return (
    <div className="hidden xl:block w-full max-w-full md:max-w-[260px] min-h-screen h-auto lg:px-3 lg:py-4 bg-[#1D3354] xl:border-r border-solid border-sofia_dark/10 fixed left-0 top-0 bottom-0 z-[1000]">
      <div className="h-full flex flex-col">
        <div className="mb-4">
          <Image
            src={BrandLogo}
            alt="Logo of the brand"
            className="w-[68px] h-[68px] mb-3"
            priority
          />
        </div>
        <div
          className="w-full space-y-1 duration-500"
          style={{ scrollbarGutter: "stable" }}
        >
          {menu.map((li) => {
            if (!li.roles.includes(currentRole)) return null;

            if (li.type === "dropdown" && li.children) {
              const isPanelActive = li.children.some(
                (child) => pathname.startsWith(child.basePath as string)
              );
              const accordionItems = [
                {
                  key: li.title,
                  label: (
                    <div
                      className={`flex items-center justify-between bg-transparent 
            font-medium px-2 pr-4 py-3 text-sm w-full transition-colors duration-300
            ${isPanelActive
                          ? "bg-white rounded text-black font-bold"
                          : "text-white/80 hover:rounded hover:bg-[#00000020]"
                        }
          `}
                    >
                      <div className="flex items-center gap-3 font-bold">
                        {li.icon}
                        <span className="leading-none">{li.title}</span>
                      </div>

                      <div className="flex items-center justify-center w-5 h-5">
                        <Image
                          src={ArrowDown}
                          alt="Expand arrow"
                          width={22}
                          height={22}
                          className={`transition-transform duration-300 ${isPanelActive ? "rotate-180" : "rotate-0"
                            } ${isPanelActive ? "invert-0" : "invert"}`}
                        />
                      </div>
                    </div>
                  ),
                  children: (
                    <div className="flex flex-col w-full mt-3 space-y-1">
                      {li.children.map((child) => {
                        const childBase = (child.link as string).split("/").slice(0, 3).join("/");
                        const isActive = isRouteActive(childBase);

                        // const isActive = pathname.startsWith(child.link as string)
                        return (
                          <Link
                            key={child.title}
                            href={child.link as string}
                            onClick={() => {
                              setActiveMenu(li.title);
                              setOpenKeys([li.title]);
                            }}
                            className={`px-6 py-2 text-sm rounded transition-colors
                  ${isActive
                                ? "bg-white/10 text-white"
                                : "text-white/80 hover:bg-white/10 hover:text-white"
                              }`}
                          >
                            {child.title}
                          </Link>
                        );
                      })}
                    </div>
                  ),
                },
              ];

              return (
                <SofiaAccordion
                  key={li.title}
                  ghost
                  items={accordionItems}
                  hideExpandIcon
                  activeKey={openKeys}
                  onChange={(keys) => {
                    const nextKeys = Array.isArray(keys) ? keys : [keys];
                    setOpenKeys(nextKeys);
                    setActiveMenu(nextKeys.length ? li.title : null);
                  }}
                />
              );
            }

            // Regular link
            return (
              <Link
                key={li.title}
                href={li.link}
                onClick={() => {
                  setActiveMenu(li.link);
                  setOpenKeys([]);
                }}
                className={`flex items-center gap-2 w-full text-sm font-semibold px-[10px] py-3 rounded duration-300
        ${
                  // pathname === li.link 
                  isRouteActive(li.link)
                    ? "bg-white/10 text-white"
                    : "bg-transparent hover:bg-[#00000020] text-white/80"
                  }`}
              >
                {li.icon} {li.title}
              </Link>
            );
          })}

        </div>
      </div>
    </div>
  );
};

export default SideNavigation;
