import { create } from "zustand";

type TConfigFormState = {
  defaultValues: Record<string, string | number> | null;
  setDefaultValues: (values: Record<string, string | number>) => void;
  selectionSearchQuery: string;
  setSelectionSearchQuery: (query: string) => void;

  selectionLookup: string;
  setSelectionLookup: (query: string) => void;

  hospitalLookup_reg: string;
  setHospitalLookup_reg: (query: string) => void;

  hasNewHospital: boolean;
  setHasNewHospital: (query: boolean) => void;

  insuranceLookup_reg: string;
  setInsuranceLookup_reg: (query: string) => void;
};

interface IPasswordValueProps {
  loginPassword: string;
  [key: string]: string;
}

type TPasswordState = {
  passwordValue: IPasswordValueProps;
  setPasswordValue: (name: string, values: string) => void;
};

type TAuthRegState = {
  currentStep: number;
  setCurrentStep: (step: number) => void;
};

export const useConfigFormStore = create<TConfigFormState>((set) => ({
  defaultValues: null,
  setDefaultValues: (values) => set({ defaultValues: values }),
  selectionSearchQuery: "",
  setSelectionSearchQuery: (query) => set({ selectionSearchQuery: query }),

  selectionLookup: "",
  setSelectionLookup: (query) => set({ selectionLookup: query }),

  // Hospital Registration
  hospitalLookup_reg: "",
  setHospitalLookup_reg: (query) => set({ hospitalLookup_reg: query }),

  // Insurance Lookup
  insuranceLookup_reg: "",
  setInsuranceLookup_reg: (query) => set({ insuranceLookup_reg: query }),

  // New Hospital Field
  hasNewHospital: false,
  setHasNewHospital: (value) => set({ hasNewHospital: value }),
}));

export const usePasswordStore = create<TPasswordState>((set) => ({
  passwordValue: {
    loginPassword: "",
  },
  setPasswordValue: (name, value) =>
    set((state) => ({
      passwordValue: {
        ...state.passwordValue,
        [name]: value,
      },
    })),
}));

export const useAuthRegStep = create<TAuthRegState>((set) => ({
  currentStep: 1,
  setCurrentStep: (step) =>
    set({
      currentStep: step,
    }),
}));
