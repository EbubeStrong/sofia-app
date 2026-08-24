import { create } from "zustand";

interface CallState {
  isInCall: boolean;
  isMinimized: boolean;
  roomID: string | null;
  userID: string | null;
  userName: string | null;
  startCall: (roomID: string, userID: string, userName: string) => void;
  endCall: () => void;
  setMinimized: (val: boolean) => void;
}

export const useCallStore = create<CallState>()((set) => ({
  isInCall: false,
  isMinimized: false,
  roomID: null,
  userID: null,
  userName: null,
  startCall: (roomID, userID, userName) =>
    set({
      isInCall: true,
      roomID,
      userID,
      userName,
      isMinimized: false,
    }),
  endCall: () =>
    set({
      isInCall: false,
      roomID: null,
      userID: null,
      userName: null,
      isMinimized: false,
    }),
  setMinimized: (val) => set({ isMinimized: val }),
}));
