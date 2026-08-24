import { create } from "zustand";

type MedicationListModalState = {
  isMedicationListModalOpen: boolean;
  openMedicationListModal: () => void;
  closeMedicationListModal: () => void;
  medicationListData: string;
  setMedicationListData: (id: string) => void;
};

const useMedicationListModalStore = create<MedicationListModalState>((set) => ({
  isMedicationListModalOpen: false,
  openMedicationListModal: () => set({ isMedicationListModalOpen: true }),
  closeMedicationListModal: () => set({ isMedicationListModalOpen: false }),
  medicationListData: "",
  setMedicationListData: (id: string) => set({ medicationListData: id }),
}));

export default useMedicationListModalStore;
