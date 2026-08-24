"use server";

import { cookies } from "next/headers";
import { STORAGE_KEYS } from "@/utils/roles-enum";

export async function clearServerCookies() {
  const cookieStore = cookies();

  cookieStore.delete(STORAGE_KEYS.TOKEN);
  cookieStore.delete(STORAGE_KEYS.ROLE);
  cookieStore.delete(STORAGE_KEYS.HOSPITAL_ID);
  cookieStore.delete(STORAGE_KEYS.DOCTOR_ID);
}
