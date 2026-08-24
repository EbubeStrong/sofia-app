"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

//components
import PatientHeader from "@/components/Patients/PatientHeader";
import Loader from "@/components/Loader";
import FormInputUpload from "@/components/FormElements/FormInputUpload";

const TextEditor = dynamic(() => import("@/components/TextEditor"), {
  ssr: false,
  loading: () => (
    <div className="min-h-[150px] flex items-center justify-center">
      <Loader />
    </div>
  ),
});

interface ComplaintProps {
  patientId: string;
}

const PatientComplaintsLayout: React.FC<ComplaintProps> = ({ patientId }) => {
  const router = useRouter();

  const [editorValue, setEditorValue] = useState("");

  return (
    <div className="flex flex-col gap-5">
      <PatientHeader
        headerName="Patient Complaint"
        buttonLabel="View Complaint History"
      />
      <TextEditor
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />

      <FormInputUpload cssStyle={{ backgroundColor: "#fff" }} />

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={() => router.push(`/queues/${patientId}/vitals`)}
          className="w-full max-w-[30%] h-[50px] text-white font-semibold text-base bg-[#1175C0] rounded-lg"
        >
          Save Record & Continue
        </button>
      </div>
    </div>
  );
};

export default PatientComplaintsLayout;
