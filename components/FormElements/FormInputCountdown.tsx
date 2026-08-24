"use client";

import { Statistic } from "antd";
import styled from "styled-components";

type TCountdownProps = {
  deadline: number | undefined;
  onFinish: () => void;
};

const CountdownStyle = styled.div`
  .ant-statistic .ant-statistic-content {
    color: #212121;
    font-size: 14px;
    font-family: var(--font-libre-franklin);
    font-weight: 500;
  }
`;

const FormInputCountdown: React.FC<TCountdownProps> = ({
  deadline,
  onFinish,
}) => {
  const { Countdown } = Statistic;

  return (
    <CountdownStyle>
      <Countdown
        value={deadline}
        format="mm:ss"
        onFinish={onFinish}
        style={{ fontSize: 16 }}
      />
    </CountdownStyle>
  );
};

export default FormInputCountdown;
