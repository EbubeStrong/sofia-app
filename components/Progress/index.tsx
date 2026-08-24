// import React from "react";
// import { Progress } from "antd";

// type TProgressProps = {
//   percent: number;
//   showInfo?: boolean;
//   strokeColor?: string;
// };

// const ProgressVariant: React.FC<TProgressProps> = ({
//   percent,
//   showInfo,
//   strokeColor,
// }) => {
//   return (
//     <Progress
//       percent={percent}
//       showInfo={showInfo}
//       strokeColor={strokeColor ?? "#1175C0"}
//     />
//   );
// };

// export default ProgressVariant;

import React, { useMemo } from "react";
import { Progress } from "antd";

type TProgressProps = {
  currentStep: number;
  totalSteps: number;
  showInfo?: boolean;
  strokeColor?: string;
};

const ProgressVariant: React.FC<TProgressProps> = ({
  currentStep,
  totalSteps,
  showInfo = false,
  strokeColor,
}) => {
  const percent = useMemo(() => {
    if (totalSteps <= 0) return 0;

    const stepPercent = 100 / totalSteps;
    return Number((stepPercent * currentStep).toFixed(2));
  }, [currentStep, totalSteps]);

  return (
    <Progress
      percent={percent}
      showInfo={showInfo}
      strokeColor={strokeColor ?? "#1175C0"}
    />
  );
};

export default ProgressVariant;

