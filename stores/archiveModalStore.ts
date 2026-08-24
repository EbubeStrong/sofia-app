import { create } from "zustand";

type ArchivedModalState = {
  isArchivedModalModal: boolean;
  openArchivedModal: () => void;
  closeArchivedModal: () => void;
};

type RescheduleModalState = {
  isRescheduleModalModal: boolean;
  openRescheduleModal: () => void;
  closeRescheduleModal: () => void;
};

export const useArchivedModalStore = create<ArchivedModalState>((set) => ({
  isArchivedModalModal: false,
  openArchivedModal: () => set({ isArchivedModalModal: true }),
  closeArchivedModal: () => set({ isArchivedModalModal: false }),
}));

export const useRescheduleModalStore = create<RescheduleModalState>((set) => ({
  isRescheduleModalModal: false,
  openRescheduleModal: () => set({ isRescheduleModalModal: true }),
  closeRescheduleModal: () => set({ isRescheduleModalModal: false }),
}));
