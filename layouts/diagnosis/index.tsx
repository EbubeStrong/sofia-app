"use client";

import { useState } from "react";

import PatientHeader from "@/components/Patients/PatientHeader";
import TextEditor from "@/components/TextEditor";
import DiagnosisTableSection from "./DiagnosisTableSection";
import useDiagnosisModalStore from "@/stores/diagnosisModalStore";
import SofiaDrawers from "@/components/Drawers";

interface DiagnosisLayoutProps {
  patientId: string;
}

const DiagnosisLayout: React.FC<DiagnosisLayoutProps> = ({ patientId }) => {
  const [editorValue, setEditorValue] = useState("");

  const { isDiagnosisModalOpen, openDiagnosisModal, closeDiagnosisModal } =
    useDiagnosisModalStore();

  return (
    <div className="flex flex-col gap-5">
      <PatientHeader
        headerName="Diagnosis"
        buttonLabel="View Diagnosis History"
        addActionLabel="Add New Diagnosis"
        onHandleAction={() => openDiagnosisModal()}
      />

      <DiagnosisTableSection patientId={patientId} />

      <SofiaDrawers
        title={<span className="text-xl">Record Patient Diagnosis</span>}
        placement="right"
        open={isDiagnosisModalOpen}
        onClose={closeDiagnosisModal}
        width={600}
        maskClosable={true}
        zIndex={9999}
      >
        <div className="flex flex-col gap-6">
          <TextEditor
            value={editorValue}
            onChange={(value) => setEditorValue(value)}
          />
          <button className="w-full max-w-[50%] md:max-w-[40%] h-[50px] text-white font-semibold text-base bg-[#1175C0] rounded-lg">
            Save Record
          </button>
        </div>
      </SofiaDrawers>
    </div>
  );
};

export default DiagnosisLayout;
