"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export type TTopNavItem = {
  title: string;
  link: string;
};

type TopNavTabsProps = {
  items: TTopNavItem[];
  /** Optional: override active detection logic */
  isActive?: (pathname: string, link: string) => boolean;
};

const TopNavTabs: React.FC<TopNavTabsProps> = ({
  items,
  isActive,
}) => {
  const pathname = usePathname();

  const checkActive = (link: string) =>
    isActive ? isActive(pathname, link) : pathname.startsWith(link);

  return (
    <div className="flex flex-row gap-3 flex-nowrap overflow-x-auto mb-1 border-b">
      {items.map((item) => (
        <Link
          key={item.title}
          href={item.link}
          scroll={false}
          className={`${
            checkActive(item.link)
              ? "border-b-2 border-[#D33B52] font-semibold"
              : "font-normal"
          } text-base text-[#101010]/80 whitespace-nowrap py-1.5 px-1.5 xl:px-3`}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default TopNavTabs;
