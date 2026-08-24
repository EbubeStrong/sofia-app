"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

//components
import PatientHeader from "@/components/Patients/PatientHeader";
import FormInputUpload from "@/components/FormElements/FormInputUpload";
import TextEditor from "@/components/TextEditor";

interface NursesNoteProps {
  patientId: string;
}

const NursesNoteLayout: React.FC<NursesNoteProps> = ({ patientId }) => {
  const router = useRouter();

  const [editorValue, setEditorValue] = useState("");

  return (
    <main className="flex flex-col gap-5">
      <PatientHeader headerName="Nurse's Note" buttonLabel="View History" />

      <TextEditor
        value={editorValue}
        onChange={(value) => setEditorValue(value)}
      />

      <FormInputUpload cssStyle={{ backgroundColor: "#fff" }} />

      <div className="flex items-center justify-end mt-6">
        <button
          onClick={() => router.push(`/queues/${patientId}/surgeries`)}
          className="w-full max-w-[30%] h-[50px] text-white font-semibold text-base bg-[#1175C0] rounded-lg"
        >
          Save Record & Continue
        </button>
      </div>
    </main>
  );
};

export default NursesNoteLayout;
