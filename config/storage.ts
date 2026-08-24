"use client";

import secureLocalStorage from "react-secure-storage";

import { IStorage, UserInfoResponse } from "@/interfaces/general";
import { StorageKeys } from "@/utils/constants";
import { CheckinData } from "@/interfaces/checkin";

const storage: IStorage = {
  setUser: (value: UserInfoResponse) => {
    return secureLocalStorage.setItem(StorageKeys.USER, JSON.stringify(value));
  },

  getUser: () => {
    const user = secureLocalStorage.getItem(StorageKeys.USER);

    if (user) return JSON.parse(user as string) as UserInfoResponse;
    else return null;
  },

  clearUser: () => {
    return secureLocalStorage.removeItem(StorageKeys.USER);
  },

  setCheckin: (value: CheckinData) => {
    return secureLocalStorage.setItem(
      StorageKeys.CHECKIN,
      JSON.stringify(value)
    );
  },

  getCheckin: () => {
    const checkins = secureLocalStorage.getItem(StorageKeys.CHECKIN);

    if (checkins) return JSON.parse(checkins as string) as CheckinData;
    else return null;
  },

  clearCheckin: () => {
    return secureLocalStorage.removeItem(StorageKeys.CHECKIN);
  },

  clearAll: () => {
    secureLocalStorage.clear();
  },
};

export default storage;
