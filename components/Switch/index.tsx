import React from "react";
import { Switch } from "antd";

type TSwitchProps = {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean;
};

const SofiaSwitch: React.FC<TSwitchProps> = ({ onChange, checked }) => {
  return (
    <div>
      <Switch onChange={onChange} checked={checked} />
    </div>
  );
};

export default SofiaSwitch;
