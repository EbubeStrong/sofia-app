import { create } from "zustand";

type TreatmentModalProps = {
  openTreatmentModal: boolean;
  handleOpenTreatmentModal: () => void;
  handleCloseTreatmentModal: () => void;
  treatmentData: string;
  setTreatmentData: (id: string) => void;
};

const useTreatmentModalStore = create<TreatmentModalProps>((set) => ({
  openTreatmentModal: false,
  handleOpenTreatmentModal: () => set({ openTreatmentModal: true }),
  handleCloseTreatmentModal: () => set({ openTreatmentModal: false }),
  treatmentData: "",
  setTreatmentData: (id: string) => set({ treatmentData: id }),
}));

export default useTreatmentModalStore;
