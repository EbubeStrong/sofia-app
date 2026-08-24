"use client";

import React from "react";
import type { CollapseProps } from "antd";
import { Collapse } from "antd";

type TAccordionProps = {
  items: CollapseProps["items"];
  accordion?: boolean;
  onChange?: CollapseProps["onChange"];
  activeKey?: string[] | string;
  ghost?: CollapseProps["ghost"];
  customClassName?: string;
  hideExpandIcon?: boolean;
};

const SofiaAccordion: React.FC<TAccordionProps> = ({
  items,
  accordion,
  onChange,
  activeKey,
  ghost,
  customClassName,
  hideExpandIcon = false,
}) => {
  return (
    <div className={customClassName ?? "custom-accordion"}>
      <Collapse
        accordion={accordion ?? false}
        items={items}
        onChange={onChange}
        activeKey={activeKey}
        ghost={ghost}
        expandIcon={hideExpandIcon ? () => null : undefined}
      />
    </div>
  );
};

export default SofiaAccordion;
