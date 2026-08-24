import { PRIORITY } from "./checkin-enums";

export const priorityStatus = (status: string) => {
  switch (status) {
    case PRIORITY.LOW_RISK:
    case PRIORITY.MODERATE_RISK:
      return "processing";
    case PRIORITY.HIGH_RISK:
    case PRIORITY.EMERGENCY:
      return "error";
    default:
      return "default";
  }
};
