import React from "react";
import { Drawer, DrawerProps } from "antd";

interface ISofiaDrawerProps {
  placement: DrawerProps["placement"];
  open: boolean;
  onClose: () => void;
  children: React.ReactNode;
  width?: string | number;
  maskClosable?: boolean;
  zIndex?: number;
  title?: string | React.ReactNode;
}

const SofiaDrawers: React.FC<ISofiaDrawerProps> = ({
  placement,
  onClose,
  open,
  children,
  width,
  maskClosable,
  zIndex,
  title,
}) => {
  return (
    <Drawer
      title={title}
      closable={{ "aria-label": "Close Button" }}
      placement={placement ?? "left"}
      onClose={onClose}
      open={open}
      key={placement}
      width={width ?? "100%"}
      rootClassName="menu-nav"
      zIndex={zIndex ?? 990}
      maskClosable={maskClosable ?? false}
    >
      {children}
    </Drawer>
  );
};

export default SofiaDrawers;
