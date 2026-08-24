import React from "react";
import { cookies } from "next/headers";

import HospitalDashboard from "@/layouts/dashboard/HospitalDashboard";
import { ROLES, STORAGE_KEYS } from "@/utils/roles-enum";
import NursesDashboardLayout from "@/layouts/dashboard/NursesDashboard";
import DoctorDashboardLayout from "@/layouts/dashboard/DoctorDashboard";
import PharmacyDashboardLayout from "@/layouts/dashboard/PharmacyDashboard";
import ReceptionDashboardLayout from "@/layouts/dashboard/ReceptionDashboard";
import {
  fetchAllCheckins,
  fetchAllNursingQueues,
  fetchAllPharmacistQueues,
} from "@/hooks/use-server-fetchers";
import { TCheckinsResp } from "@/interfaces/checkin";
import { TNursingQueueResp } from "@/interfaces/nurses";
import { stringToBoolean } from "@/utils/getInitials";
import { TPharmacyQueueResp } from "@/interfaces/pharmacy";

export const dynamic = "force-dynamic";

type TDashboardProps = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    q?: string;
  };
};

const DashboardHome: React.FC<TDashboardProps> = async ({ searchParams }) => {
  const cookieStore = cookies();
  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;
  const isLead = cookieStore.get(STORAGE_KEYS.IS_LEAD)?.value as string;
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;
  const q = searchParams.q;
  const tabQuery = stringToBoolean(isLead) ? "unassigned" : "assigned";

  const checkinParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    tab: q ?? "TodaysEmergency",
  });

  const nursingQueueParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    type: q ?? tabQuery,
  });

   const pharmacyQueueParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    type: q ?? "prescription",
  });

  const allCheckins =
    role === ROLES.RECEPTION ? await fetchAllCheckins(checkinParams) : null;

  const nursingQueue =
    role === ROLES.NURSE
      ? await fetchAllNursingQueues(nursingQueueParams)
      : null;

   const pharmacyQueue =
    role === ROLES.PHARMACY
      ? await fetchAllPharmacistQueues(pharmacyQueueParams)
      : null;

  const renderRoleBasedDashboard = () => {
    switch (role) {
      case ROLES.DOCTOR:
        return <DoctorDashboardLayout initialData={{}} />;
      case ROLES.NURSE:
        return (
          <NursesDashboardLayout
            initialData={nursingQueue?.data as TNursingQueueResp["data"]}
            isLead={stringToBoolean(isLead)}
            tabQuery={tabQuery}
          />
        );
      case ROLES.PHARMACY:
        return <PharmacyDashboardLayout 
        initialData={pharmacyQueue?.data as TPharmacyQueueResp["data"]} />;
      case ROLES.RECEPTION:
        return (
          <ReceptionDashboardLayout
            initialData={allCheckins?.data as TCheckinsResp["data"]}
          />
        );
      default:
        return <HospitalDashboard currentRole={role} />;
    }
  };

  return <div>{renderRoleBasedDashboard()}</div>;
};

export default DashboardHome;
