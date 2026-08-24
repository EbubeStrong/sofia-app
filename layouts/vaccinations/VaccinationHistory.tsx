"use client";

import EmptyPatientCard from "@/components/EmptyPatientCard";

const VaccinationHistory = () => {
  return (
    <div className="rounded-lg bg-white p-4 col-span-2 md:col-span-1">
      <p className="text-lg md:text-xl text-[#101010] font-semibold font-libre_franklin mb-1.5">
        Vaccination History
      </p>
      <EmptyPatientCard
        title="Patient Vaccination History Not Available"
        buttonLabel="Add Vaccination"
      />
    </div>
  );
};

export default VaccinationHistory;
