"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";

//components
import SurgeryTableSection from "@/layouts/surgeries/SurgeryTableSection";
import PatientHeader from "@/components/Patients/PatientHeader";

interface ISurgeryProps {
  patientId: string;
}

const SurgeriesLayout: React.FC<ISurgeryProps> = ({ patientId }) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <main className="flex flex-col gap-5">
      <PatientHeader
        headerName="Allergies"
        buttonLabel="View Allergies History"
        addActionLabel="Add New Allergy"
        onHandleAction={() => router.push(`${pathname}/add-record`)}
      />

      <SurgeryTableSection patientId={patientId} />
    </main>
  );
};

export default SurgeriesLayout;
