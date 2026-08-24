"use client";

//components
import PatientHeader from "@/components/Patients/PatientHeader";
import RecordVitalsForm from "./AddVitalRecord";

interface VitalsProps {
  patientId: string;
}

const VitalsAndBiometricsLayout: React.FC<VitalsProps> = ({ patientId }) => {
  return (
    <div className="flex flex-col gap-5">
      <PatientHeader
        headerName="Vital Signs"
        buttonLabel="View Vital Signs History"
      />
      <RecordVitalsForm patientId={patientId} />
    </div>
  );
};

export default VitalsAndBiometricsLayout;
