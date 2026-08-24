"use client";

import { MenuProps } from "antd";
import { useRouter } from "next/navigation";
import { SettingOutlined, LogoutOutlined } from "@ant-design/icons";

import storage from "@/config/storage";
import { clearServerCookies } from "@/utils/clear-cookies";

export const TopNavDropdownItems = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    await clearServerCookies();

    storage.clearAll();

    router.replace("/auth/login");
  };

  const baseItems: MenuProps["items"] = [
    {
      key: "1",
      label: "Settings",
      icon: <SettingOutlined />,
    },
    {
      key: "2",
      label: (
        <button className="w-full flex items-center" onClick={handleSignOut}>
          Sign Out
        </button>
      ),
      icon: <LogoutOutlined />,
    },
  ];

  return baseItems;
};
