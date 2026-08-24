import { create } from "zustand";

type TicketModalState = {
  isTicketModalOpen: boolean;
  openTicketModal: () => void;
  closeTicketModal: () => void;
  ticketData: string;
  setTicketData: (id: string) => void;
};

const useTicketModalStore = create<TicketModalState>((set) => ({
  isTicketModalOpen: false,
  openTicketModal: () => set({ isTicketModalOpen: true }),
  closeTicketModal: () => set({ isTicketModalOpen: false }),
  ticketData: "",
  setTicketData: (id: string) => set({ ticketData: id }),
}));

export default useTicketModalStore;
