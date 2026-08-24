import React from "react";

import { SettingIcon } from "@/assets/icons";
import { TSideNavProps } from "@/interfaces/general";
import { ROUTE_PATH } from "@/utils/constants";
import { ROLES } from "@/utils/roles-enum";
import {
  DashboardIcon,
  CheckinIcon,
  AnalyticsIcon,
  PatientIcon,
  BillingIcon,
  AdmissionIcon,
  PharmIcon,
  LabIcon,
  DoctorIcon,
  NursingIcon,
  RecordIcon,
} from "@/assets/sidebar-icons";

const ALL_ROLES = [
  ROLES.DOCTOR,
  ROLES.NURSE,
  ROLES.PATIENT,
  ROLES.PHARMACY,
  ROLES.RECEPTION,
  ROLES.HOSPITAL,
];

export const SideNavData: TSideNavProps[] = [
  {
    title: "Dashboard",
    icon: <DashboardIcon />,
    link: ROUTE_PATH.DASHBOARD.DASHBOARD_PATH,
    roles: ALL_ROLES,
    type: "link",
  },
  {
    title: "Check-in & Registration",
    icon: <CheckinIcon />,
    link: ROUTE_PATH.CHECKIN.CHECKIN_PATH,
    roles: [ROLES.RECEPTION, ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Nursing Queue",
    icon: <NursingIcon />,
    link: ROUTE_PATH.NURSES,
    roles: [ROLES.NURSE, ROLES.DOCTOR],
    type: "link",
  },
  {
    title: "Doctors Queue",
    icon: <DoctorIcon />,
    link: ROUTE_PATH.QUEUES.QUEUES_PATH,
    roles: [ROLES.DOCTOR, ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Check-in & Registration",
    icon: <CheckinIcon />,
    link: ROUTE_PATH.PHARMACY.CHECKIN_PATH,
    roles: [ROLES.PHARMACY, ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Pharmacy Queue",
    icon: <PharmIcon />,
    link: ROUTE_PATH.PHARMACY.PHARMACY_ROUTH,
    roles: [ROLES.PHARMACY, ROLES.HOSPITAL],
    type: "dropdown",
    children: [
      {
        title: "New Prescription",
        link: ROUTE_PATH.PHARMACY.NEW_PRESCRIPTION,
        basePath: "/pharmacy/new-prescription",
      },
      {
        title: "Inventory",
        link: ROUTE_PATH.PHARMACY.INVENTORY,
        basePath: "/pharmacy/inventory",
      },
      {
        title: "Order Management",
        link: ROUTE_PATH.PHARMACY.ORDER_MANAGEMENT,
        basePath: "/pharmacy/order-management",
      },
    ],
  },
  {
    title: "Patients Profile",
    icon: <PatientIcon />,
    link: ROUTE_PATH.PATIENTS.PATIENT_ROUTH,
    roles: [
      ROLES.RECEPTION,
      ROLES.PATIENT,
      ROLES.HOSPITAL,
      ROLES.DOCTOR,
      ROLES.NURSE,
      ROLES.PHARMACY,
    ],
    type: "link",
  },
  {
    title: "Prescription Records",
    icon: <RecordIcon />,
    link: ROUTE_PATH.PRESCRIPTION.PRESCRIPTION_PATH,
    roles: [ROLES.PHARMACY],
    type: "link",
  },
  {
    title: "Laboratory",
    icon: <LabIcon />,
    link: ROUTE_PATH.LABORATORY.LAB_PATH,
    roles: [ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Admission",
    icon: <AdmissionIcon />,
    link: ROUTE_PATH.ADMISSIONS.ADMISSIONS_PATH,
    // roles: [ROLES.HOSPITAL],
    roles: ALL_ROLES,
    type: "link",
  },
  {
    title: "Billing",
    icon: <BillingIcon />,
    link: ROUTE_PATH.BILLINGS_AND_PAYMENTS.BILLINGS_AND_PAYMENTS_ROUTH,
    roles: [ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Analytics",
    icon: <AnalyticsIcon />,
    link: ROUTE_PATH.ANALYTICS.ANALYTICS_PATH,
    roles: [ROLES.HOSPITAL],
    type: "link",
  },
  {
    title: "Settings",
    icon: <SettingIcon />,
    link: ROUTE_PATH.SETTINGS.SETTINGS_ROUTH,
    roles: ALL_ROLES,
    type: "link",
  },
];
