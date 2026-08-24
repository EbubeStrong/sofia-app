"use client";

import tw from "tailwind-styled-components";
import { GoDotFill } from "react-icons/go";

//components
import { UserIcon } from "@/assets/icons";
import { TPatientRecordsById } from "@/interfaces/patients";
// import dayjs from "dayjs";

type TCardProps = {
  type?: "profile" | "doctors" | "consult";
  className?: string;
  textClassName?: string;
  bg?: "light" | "dark";
  patientDetails?: Partial<TPatientRecordsById["data"]>;
};

const Text = tw.p`text-base font-normal font-libre_franklin`;
const Label = tw.p`text-xs font-normal font-libre_franklin uppercase leading-normal`;
const Value = tw.p`text-base font-medium`;
const Wrap = tw.div<{ $type: string }>`${(p) =>
  p.$type === "doctors"
    ? "!pb-0"
    : "border-b"} flex flex-col pb-4 gap-3 border-solid border-[#101010]/5`;

const PatientsData = (data?: Partial<TPatientRecordsById["data"]>) => [
  {
    label: "PATIENT Marital status",
    value: data?.maritalStatus ?? "---",
  },
  {
    label: "PATIENT PHONE NUMBER",
    value: data?.phoneNumber ?? "---",
  },
  // {
  //   label: "PATIENT LAST VISIT",
  //   value: data?.lastVisit
  //     ? dayjs(data?.lastVisit).format("MMM DD, YYYY h:mm a")
  //     : "---",
  // },
  {
    label: "PATIENT EMAIL ADDRESS",
    value:
      data?.email && !data.email.includes("emergency_") ? data.email : "---",
  },
  {
    label: "PATIENT ADDRESS",
    value: data?.homeAddress ?? "---",
  },
];

const PatientSummaryCard: React.FC<TCardProps> = ({
  type,
  className = "",
  bg,
  patientDetails,
}) => {
  const textColor = bg === "light" ? "text-[#101010]" : "text-white";
  const subTextColor = bg === "light" ? "text-[#101010]/50" : "text-white";
  const bgColor = bg === "dark" ? "bg-[#1D3354]" : "bg-[#F4F6F8]";

  return (
    <section className={`flex flex-col rounded-lg p-4 ${bgColor} ${className}`}>
      <Wrap $type={type ?? ""}>
        <div className="flex items-center gap-2">
          <div className={`${textColor}`}>
            <UserIcon />
          </div>

          <div>
            <p
              className={`${textColor} text-xl font-semibold font-libre_franklin leading-normal`}
            >
              {patientDetails?.fullName ?? "---"}
            </p>
            <p className={`${subTextColor} text-sm`}>
              PATIENT ID:{" "}
              <span className={`${textColor} text-sm font-medium`}>
                {patientDetails?.patientId ?? "---"}
              </span>
            </p>
          </div>
        </div>
        {(patientDetails?.gender ||
          patientDetails?.age ||
          patientDetails?.dob) && (
            <div className="flex items-center gap-4 md:gap-2">
              {patientDetails?.gender && (
                <Text className={`${textColor}`}>
                  {patientDetails?.gender ?? "---"}
                </Text>
              )}
              {patientDetails?.age?.toString() && <GoDotFill color="#CBDCF1" />}
              {patientDetails?.age?.toString() && (
                <Text className={`${textColor}`}>
                  {patientDetails?.age?.toString() ?? "---"} years
                </Text>
              )}
              {patientDetails?.dob && <GoDotFill color="#CBDCF1" />}
              {patientDetails?.dob && (
                <Text className={`${textColor}`}>
                  {patientDetails?.dob ?? "---"}
                </Text>
              )}
            </div>
          )}
      </Wrap>

      {!["doctors", "consult"].includes(type ?? "") && (
        <div className="pt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          {PatientsData(patientDetails).map(({ label, value }) => (
            <div key={label}>
              <Label className={`${subTextColor}`}>{label}</Label>
              <Value className={`${textColor}`}>{value}</Value>
            </div>
          ))}
        </div>
      )}


      {type === "consult" && (
        <div className="pt-4">
          <p className="mb-1 text-base text-[#101010B2] font-medium">
            Reason for visit: Consultation
          </p>
          <p className={`${textColor} text-base`}>
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris
            nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      )}
    </section>
  );
};

export default PatientSummaryCard;
