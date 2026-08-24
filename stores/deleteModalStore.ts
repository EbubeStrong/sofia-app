import { create } from "zustand";

type DeleteModalState = {
  isDeleteModalModal: boolean;
  openDeleteModal: () => void;
  closeDeleteModal: () => void;
  deleteData: string;
  setDeleteData: (id: string) => void;
};

const useDeleteModalStore = create<DeleteModalState>((set) => ({
  isDeleteModalModal: false,
  openDeleteModal: () => set({ isDeleteModalModal: true }),
  closeDeleteModal: () => set({ isDeleteModalModal: false }),
  deleteData: "",
  setDeleteData: (id: string) => set({ deleteData: id }),
}));

export default useDeleteModalStore;
