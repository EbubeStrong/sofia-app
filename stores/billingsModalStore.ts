import { create } from "zustand";

type BillingModalState = {
  isBillingModalOpen: boolean;
  openBillingModal: () => void;
  closeBillingModal: () => void;
  billingData: string;
  setBillingData: (id: string) => void;
};

const useBillingModalStore = create<BillingModalState>((set) => ({
  isBillingModalOpen: false,
  openBillingModal: () => set({ isBillingModalOpen: true }),
  closeBillingModal: () => set({ isBillingModalOpen: false }),
  billingData: "",
  setBillingData: (id: string) => set({ billingData: id }),
}));

export default useBillingModalStore;
