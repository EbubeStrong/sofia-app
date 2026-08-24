import React from "react";

import FormInputDropdown from "./FormElements/FormInputDropdown";
import SofiaSwitch from "./Switch";
import {
  IAppointmentHoursOptions,
  IAppointmentHoursProps,
} from "@/interfaces/appointment-hours";

interface IHoursProps {
  hourOptions: IAppointmentHoursProps[];
  startTimeOptions: IAppointmentHoursOptions[];
  endTimeOptions: IAppointmentHoursOptions[];
  handleStartTimeChange: (value: string, id: string) => void;
  handleEndTimeChange: (value: string, id: string) => void;
  handleSwitchChange: (checked: boolean, id: string) => void;
}

const AppointmentHourSection: React.FC<IHoursProps> = ({
  hourOptions,
  startTimeOptions,
  endTimeOptions,
  handleStartTimeChange,
  handleEndTimeChange,
  handleSwitchChange,
}) => {
  return (
    <div className="flex flex-col divide-y">
      {hourOptions.map((item) => (
        <div
          key={item.dayOfWeek}
          className="flex w-full gap-3 md:gap-6 h-[80px]"
        >
          <div className="flex items-center gap-1 md:gap-2 md:w-[150px]">
            <SofiaSwitch
              checked={item.isAvailable}
              onChange={(checked: boolean) =>
                handleSwitchChange(checked, item.id)
              }
            />
            <span className="text-base text-[#101010B2]">
              {item.formattedDayOfWeek}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 w-full max-w-full md:max-w-[60%]">
            <div className="w-full">
              <FormInputDropdown
                options={startTimeOptions ?? []}
                onChange={(value: string) =>
                  handleStartTimeChange(value, item.id)
                }
                value={item.startTime}
                disabled={!item.isAvailable}
              />
            </div>
            <div className="w-full">
              <FormInputDropdown
                options={endTimeOptions ?? []}
                onChange={(value: string) =>
                  handleEndTimeChange(value, item.id)
                }
                value={item.endTime}
                disabled={!item.isAvailable}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentHourSection;
