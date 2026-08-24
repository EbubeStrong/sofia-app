import type { DrawerProps } from "antd";

export interface IMenuSideNavProps {
  isMenuOpen: boolean;
  menuPlacement: DrawerProps["placement"];
  handleMenuClose: () => void;
}
