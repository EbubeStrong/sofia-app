"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const BASE_URL = `/settings/configuration`;

const PatientSideMenu = [
  {
    title: "Department",
    link: `${BASE_URL}/department`,
  },
  {
    title: "Wards",
    link: `${BASE_URL}/wards`,
  },
  {
    title: "Rooms",
    link: `${BASE_URL}/rooms`,
  },
  {
    title: "Beds",
    link: `${BASE_URL}/beds`,
  },
  {
    title: "Staffing",
    link: `${BASE_URL}/staffing`,
  },
  {
    title: "Services",
    link: `${BASE_URL}/services`,
  },
];

const ConfigTopMenu = () => {
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-3 flex-nowrap overflow-x-auto mb-1 border-b">
      {PatientSideMenu.map((menu) => (
        <Link
          key={menu.title}
          href={menu.link}
          scroll={false}
          className={`${
            pathname.startsWith(menu.link)
              ? `border-b-2 border-[#D33B52] font-semibold`
              : `font-normal`
          } text-base text-[#101010]/80 whitespace-nowrap py-1.5 px-1.5 xl:px-3`}
        >
          {menu.title}
        </Link>
      ))}
    </div>
  );
};

export default ConfigTopMenu;
