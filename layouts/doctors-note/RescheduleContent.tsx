import FormInputDropdown from "@/components/FormElements/FormInputDropdown";
import FormInputTextarea from "@/components/FormElements/FormInputTextarea";
import SofiaCalendar from "@/components/SofiaCalendar";
import { CalendarValue } from "@/components/SofiaCalendar/types";
import dayjs from "dayjs";
import React, { useState } from "react";

const TimeSlot = [
  "9:00am",
  "9:30am",
  "10:00am",
  "10:30am",
  "11:00am",
  "11:30am",
  "12:00pm",
];

const RescheduleContent = () => {
  const [value, setValue] = useState<CalendarValue>(new Date());
  const [step, setStep] = useState(1);

  return (
    <>
      <div className="flex flex-col xl:flex-row w-full max-w-full divide-y xl:divide-y-0 xl:divide-x border-t border-b">
        <div className="w-full max-w-full md:max-w-[35%] space-y-2 py-4">
          <div className="text-base text-[#101010]/50 font-semibold">
            Dr Samantha Lee
          </div>
          <div>
            <p className="text-lg xl:text-xl text-[#101010] font-semibold">
              Checkup with John
            </p>
            <p className="text-sm text-[#101010]/50 font-medium">
              8:30pm -9:00pm Monday, August 5 2024
            </p>
            <p className="text-sm text-[#101010]/50">30 Mins</p>
          </div>
        </div>

        {step === 1 && (
          <div className="w-full max-w-full xl:max-w-[65%] flex flex-col md:flex-row gap-3 xl:gap-0 py-4">
            <div className="w-full max-w-full md:max-w-[50%] xl:max-w-[65%] space-y-2 px-0 xl:px-4">
              <div className="text-base text-[#101010]/50 font-semibold">
                Reschedule event
              </div>
              <div>
                <p className="text-lg xl:text-xl text-[#101010] font-semibold mb-2 xl:mb-4">
                  Select a Date and Time
                </p>
                <SofiaCalendar value={value} setValue={setValue} />
              </div>
            </div>
            <div className="w-full max-w-full md:max-w-[50%] xl:max-w-[35%]">
              <div className="mb-3 text-base font-semibold text-[#101010] text-center">
                {dayjs(dayjs(Array.isArray(value) ? value[0] : value)).format(
                  "ddd, MMMM D"
                )}
              </div>
              <div className="flex flex-row flex-wrap md:flex-col gap-3">
                {TimeSlot.map((item) => (
                  <button
                    key={item}
                    className="flex items-center justify-center px-3 md:w-full md:max-w-full text-[#1175C0] hover:text-white bg-white hover:bg-[#1175C0] border border-[#1175C0] text-base font-semibold py-2"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="w-full max-w-full xl:max-w-[65%] py-4 px-0 xl:px-4 flex flex-col gap-6">
            <div>
              <p className="text-sm text-[#101010]/50 font-medium uppercase">
                Patient
              </p>
              <p className="text-lg text-[#101010] font-medium">
                David Udemezue
              </p>
            </div>
            <FormInputDropdown
              label="Activity"
              placeholder="Select activity"
              options={[]}
            />
            <FormInputDropdown
              label="Event Type"
              placeholder="Select event type"
              options={[]}
            />
            <FormInputTextarea
              label="Reason for Change"
              placeholder="Enter reason for change"
            />
            <div>
              <p className="text-sm text-[#101010]/50 font-medium uppercase mb-1">
                Reason for Visit
              </p>
              <p className="text-base text-[#101010] font-normal">
                Shortness of breath on exertion, Previously diagnosed with acute
                bronchitis and treated with bronchodilators, empiric
                antibiotics, and a short course oral steroid taper
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-7 flex items-center justify-end gap-5 w-full max-w-[100%]">
        {step === 2 && (
          <button
            onClick={() => setStep(1)}
            className="text-base text-[#101010] bg-white border border-[#101010]/20 font-semibold w-full max-w-[25%] h-[50px] rounded-lg"
          >
            Back
          </button>
        )}
        {step === 2 && (
          <button className="text-base text-white bg-[#1175C0] font-semibold w-full max-w-[25%] h-[50px] rounded-lg">
            Update Event
          </button>
        )}
        {step === 1 && (
          <button
            onClick={() => setStep(2)}
            className="text-base text-white bg-[#1175C0] font-semibold w-full max-w-[25%] h-[50px] rounded-lg"
          >
            Next
          </button>
        )}
      </div>
    </>
  );
};

export default RescheduleContent;
