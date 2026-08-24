"use client";

import React, { SetStateAction, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { CheckedStatusIcon } from "@/assets/dashboard-icons";
import storage from "@/config/storage";

interface CheckinSuccessProps {
  setOpenCheckinSuccess: React.Dispatch<SetStateAction<boolean>>;
}

const PharmacyCheckinSuccessLayout: React.FC<CheckinSuccessProps> = ({
  setOpenCheckinSuccess,
}) => {
  const router = useRouter();

//   const [patientInfo, setPatientInfo] = useState(
//     {
//   patientId: "11223344",
//   fullName: "John Doe",

// } as {
//       patientId: string;
//       fullName: string;
//     }
//   );

const [patientInfo, setPatientInfo] = useState<{
  patientId: string;
  fullName: string;
}>({
  patientId: "11223344",
  fullName: "John Doe",
});


  useEffect(() => {
    const data = storage.getCheckin();
    if (data) {
      setPatientInfo({
        patientId: data?.patientId ?? "11223344",
        fullName: data?.fullName as string ?? "John",
      });
    }
  }, []);

  return (
    <div className="flex flex-col gap-7">
      <h2 className="text-xl md:text-2xl text-[#101010] font-bold text-center">
        Patient Registered Successfully
      </h2>

      <div className="mx-auto">
        <CheckedStatusIcon />
      </div>

      <div>
        <p className="text-lg text-[#101010] font-semibold text-center">
          Fill a new Prescription for John?
          {/* {patientInfo?.fullName} */}
        </p>
        <p className="text-base text-[#101010]/70 text-center">
          Search for existing patients or register new ones to begin their visit
        </p>
      </div>

      <div className="flex flex-col gap-4 mx-auto w-full max-w-full xl:max-w-[80%]">
        <button
          className="flex items-center justify-center text-base font-semibold !text-[#1175C0] w-full bg-white rounded-lg border border-solid border-[#1175C0] h-[50px]"
          onClick={() => {
            router.push(
              `/pharmacy/new-prescription?patient_id=${patientInfo?.patientId}`
            );
            storage.clearCheckin();
          }}
        >
          Add Prescription
        </button>
        <button
          type="button"
          onClick={() => {
            setOpenCheckinSuccess(false);
            storage.clearCheckin();
          }}
          className="text-base font-semibold bg-[#1175C0] text-white h-[50px] rounded-lg w-full"
        >
          Back to Home
        </button>
      </div>

      <div className="rounded-lg bg-[#A1C5D31A] p-2 md:p-4">
        <p className="text-base text-[#101010] font-semibold text-center">
          
          {/* {patientInfo?.patientId} */}
        </p>
        <p className="text-base text-[#101010]/70 text-center">
          Search for existing patients or register new ones to begin their visit
        </p>
      </div>
    </div>
  );
};

export default PharmacyCheckinSuccessLayout;