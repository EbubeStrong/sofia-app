import { create } from "zustand";

type ComplaintModalState = {
  isComplaintModalOpen: boolean;
  openComplaintModal: () => void;
  closeComplaintModal: () => void;
  complaintData: string;
  setComplaintData: (id: string) => void;
};

const useComplaintModalStore = create<ComplaintModalState>((set) => ({
  isComplaintModalOpen: false,
  openComplaintModal: () => set({ isComplaintModalOpen: true }),
  closeComplaintModal: () => set({ isComplaintModalOpen: false }),
  complaintData: "",
  setComplaintData: (id: string) => set({ complaintData: id }),
}));

export default useComplaintModalStore;
