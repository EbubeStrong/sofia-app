"use client";

import FormInputUpload from "@/components/FormElements/FormInputUpload";
import PatientHeader from "@/components/Patients/PatientHeader";
import ImagingTableSection from "@/layouts/imaging/ImagingTableSection";

interface ImagingProps {
  patientId: string;
}

const ImagingLayout: React.FC<ImagingProps> = ({ patientId }) => {
  return (
    <main className="flex flex-col gap-5">
      <PatientHeader headerName="Imaging" buttonLabel="View Imaging History" />

      <FormInputUpload />
      <ImagingTableSection patientId={patientId} />
    </main>
  );
};

export default ImagingLayout;
