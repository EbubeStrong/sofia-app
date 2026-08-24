import { cookies } from "next/headers";

import GeneralSettingsModule from "@/layouts/settings/GeneralSettings";
import HospitalBasicDetails from "@/layouts/settings/HospitalBasicDetails";
import { ROLES, STORAGE_KEYS } from "@/utils/roles-enum";
import ReceptionBasicDetails from "@/layouts/settings/ReceptionDetails";
import NurseBasicDetails from "@/layouts/settings/NurseProfileDetails";
import PharmacyBasicDetails from "@/layouts/settings/PharmacyProfileDetails";

export default async function GeneralSettingsPage() {
  const cookieStore = cookies();
  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;

  const renderRoleBasedSetting = () => {
    switch (role) {
      case ROLES.DOCTOR:
        return <GeneralSettingsModule />;
      case ROLES.NURSE:
        return <NurseBasicDetails role={role} />;
      case ROLES.PHARMACY:
        return <PharmacyBasicDetails role={role} />;
      case ROLES.RECEPTION:
        return <ReceptionBasicDetails role={role} />;
      default:
        return <HospitalBasicDetails />;
    }
  };

  return <div>{renderRoleBasedSetting()}</div>;
}
