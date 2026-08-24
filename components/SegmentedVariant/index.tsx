import React from "react";
import { Segmented, SegmentedProps } from "antd";
import styled from "styled-components";

type TSegmentedProps = {
  options: SegmentedProps["options"];
  onChange?: SegmentedProps["onChange"];
  value?: string | number;
  size?: SegmentedProps["size"];
  shape?: SegmentedProps["shape"];
};

const SegmentContainer = styled.div``;

const SegmentedVariant: React.FC<TSegmentedProps> = ({
  options,
  onChange,
  size,
  shape,
}) => {
  return (
    <SegmentContainer>
      <Segmented
        options={options}
        onChange={onChange}
        size={size}
        shape={shape}
      />
    </SegmentContainer>
  );
};

export default SegmentedVariant;
