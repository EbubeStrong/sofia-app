"use client";

import React from "react";
import { Tag } from "antd";
import type { TagProps } from "antd";

type TTagVariantProps = TagProps & {
  label?: string;
};

const TagVariant: React.FC<TTagVariantProps> = ({ color, label, ...rest }) => {
  return (
    <Tag color={color} {...rest}>
      {label}
    </Tag>
  );
};

export default TagVariant;
