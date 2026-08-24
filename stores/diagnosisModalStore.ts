import { create } from "zustand";

type DiagnosisModalState = {
  isDiagnosisModalOpen: boolean;
  openDiagnosisModal: () => void;
  closeDiagnosisModal: () => void;
  diagnosisData: string;
  setDiagnosisData: (id: string) => void;
};

const useDiagnosisModalStore = create<DiagnosisModalState>((set) => ({
  isDiagnosisModalOpen: false,
  openDiagnosisModal: () => set({ isDiagnosisModalOpen: true }),
  closeDiagnosisModal: () => set({ isDiagnosisModalOpen: false }),
  diagnosisData: "",
  setDiagnosisData: (id: string) => set({ diagnosisData: id }),
}));

export default useDiagnosisModalStore;
