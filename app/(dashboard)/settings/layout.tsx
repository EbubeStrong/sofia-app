import { cookies } from "next/headers";

import SettingSideMenu from "@/components/Dashboard/SettingSideMenu";
import { ROUTE_PATH } from "@/utils/constants";
import { ROLES, STORAGE_KEYS } from "@/utils/roles-enum";

const ALL_ROLES = [
  ROLES.DOCTOR,
  ROLES.NURSE,
  ROLES.PATIENT,
  ROLES.PHARMACY,
  ROLES.RECEPTION,
  ROLES.HOSPITAL,
];

const menus = [
  {
    title: "Settings",
    content: [
      {
        title: "Basic Details",
        link: ROUTE_PATH.SETTINGS.GENERAL,
        roles: ALL_ROLES,
      },
      {
        title: "Additional Details",
        link: ROUTE_PATH.SETTINGS.PROFESSION,
        roles: [ROLES.HOSPITAL],
      },
      {
        title: "Availability",
        link: ROUTE_PATH.SETTINGS.AVAILABILITY,
        roles: [ROLES.DOCTOR],
      },
      {
        title: "Audit Logs",
        link: ROUTE_PATH.SETTINGS.AUDIT_LOGS,
        roles: ALL_ROLES,
      },
      {
        title: "Configurations",
        link: ROUTE_PATH.SETTINGS.CONFIGURATION,
        roles: [ROLES.HOSPITAL],
      },
    ],
  },
];

export default function SettingsLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const cookieStore = cookies();

  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;

  return (
    <main>
      <SettingSideMenu currentRole={role} menus={menus ?? []} />
      <section className="xl:ml-[230px]">{children}</section>
    </main>
  );
}
