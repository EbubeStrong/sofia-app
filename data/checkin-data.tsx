import { SetStateAction } from "react";
import { TableProps } from "antd";

import {
  ACTIVITY,
  EVENT_TYPE,
  FORWARD_TO,
  PRIORITY,
} from "@/utils/checkin-enums";

import {
  CheckInIcon,
  UserIcon,
  PatientIcon,
  EmergencyIcon,
  BedIcon,
  DischargedIcon,
  ClockIcon,
  DroppedCaseIcon,
} from "@/assets/dashboard-icons";
import TagVariant from "@/components/TagVariant";
import { TCheckinStats } from "@/interfaces/checkin";

export interface CheckinColumnsProps {
  checkedIn: Date;
  patientId: string;
  name: string;
  eventType: string;
  activity: string;
  priority: string;
  visitStatus: string;
  id: number;
}

export type TOptionValue = {
  label: string;
  value: string;
};

export type TAllergyType =
  | "food"
  | "medication"
  | "inhalant"
  | "contact"
  | "others";


export type TDrugCondition =
  | "food_intolerance_disorder"
  | "food_allergy_disorder"
  | "propensity_to_adverse_reaction_to_food_disorder";

export type TSeverity = "high" | "medium" | "low";


interface ColumnProps {
  setOpenSummary: React.Dispatch<SetStateAction<boolean>>;
  setCheckinInfo: React.Dispatch<SetStateAction<string>>;
}

export const CheckinStats = (data: TCheckinStats["data"]) => [
  {
    title: "Total Registrations",
    amount: data?.totalRegistrations ?? 0,
    icon: <UserIcon />,
    id: "totalPatients",
  },
  {
    title: "Total Check-Ins",
    amount: data?.totalCheckIns ?? 0,
    icon: <CheckInIcon />,
    id: "totalCheckins",
  },
  {
    title: "Nursing Queue",
    amount: data.nursingQueue ?? 0,
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "Doctor Queue",
    amount: data?.doctorQueue ?? 0,
    icon: <EmergencyIcon />,
    id: "totalEmergency",
  },
  {
    title: "Admitted Patients",
    amount: data?.admittedPatients ?? 0,
    icon: <BedIcon />,
    id: "admittedPatients",
  },
  {
    title: "Discharged",
    amount: data?.discharged ?? 0,
    icon: <DischargedIcon />,
    id: "totalDischargedPatients",
  },
  {
    title: "High/Moderate Priority",
    amount: data?.highModeratePriority ?? 0,
    icon: <ClockIcon />,
    id: "priorityCases",
  },
  {
    title: "Dropped Cases",
    amount: data?.droppedCases ?? 0,
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const CheckinTableColumns = ({
  setOpenSummary,
  setCheckinInfo,
}: ColumnProps) => {
  const columns: TableProps<CheckinColumnsProps>["columns"] = [
    {
      title: "CHECKED IN",
      dataIndex: "checkedIn",
      key: "checkedIn",
      render: (checkedIn) => <span>{checkedIn}</span>,
    },
    {
      title: "PATIENT ID",
      dataIndex: "patientId",
      key: "patientId",
      render: (patientId) => <span>{patientId}</span>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "EVENT TYPE",
      dataIndex: "eventType",
      key: "eventType",
      render: (eventType) => <span>{eventType}</span>,
    },
    {
      title: "ACTIVITY",
      dataIndex: "activity",
      key: "activity",
      render: (activity) => <span>{activity}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <span>{priority}</span>,
    },
    {
      title: "VISIT STATUS",
      dataIndex: "visitStatus",
      key: "visitStatus",
      render: (visitStatus) => (
        <TagVariant label={visitStatus} className="!text-sm !rounded-full" />
      ),
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, el) => {
        return (
          <button
            type="button"
            onClick={() => {
              setOpenSummary(true);
              setCheckinInfo(el?.id?.toString());
            }}
            className="text-[15px] !text-[#1175C0] bg-white border border-solid border-[#1175C0] py-1 px-3 rounded-lg"
          >
            View
          </button>
        );
      },
    },
  ];

  return columns;
};

export const occupationList = [
  { label: "Accountant", value: "Accountant" },
  { label: "Administrator", value: "Administrator" },
  { label: "Architect", value: "Architect" },
  { label: "Banker", value: "Banker" },
  { label: "Business Analyst", value: "Business Analyst" },
  { label: "Civil Servant", value: "Civil Servant" },
  { label: "Consultant", value: "Consultant" },
  {
    label: "Customer Service Representative",
    value: "Customer Service Representative",
  },
  { label: "Data Analyst", value: "Data Analyst" },
  { label: "Engineer", value: "Engineer" },
  { label: "Human Resources Officer", value: "Human Resources Officer" },
  {
    label: "IT Specialist / Software Developer",
    value: "IT Specialist / Software Developer",
  },
  { label: "Lawyer", value: "Lawyer" },
  { label: "Lecturer / Teacher", value: "Lecturer / Teacher" },
  { label: "Medical Doctor", value: "Medical Doctor" },
  { label: "Nurse", value: "Nurse" },
  { label: "Pharmacist", value: "Pharmacist" },
  { label: "Radiographer", value: "Radiographer" },
  { label: "Laboratory Scientist", value: "Laboratory Scientist" },
  { label: "Project Manager", value: "Project Manager" },
  { label: "Researcher", value: "Researcher" },
  {
    label: "Secretary / Office Assistant",
    value: "Secretary / Office Assistant",
  },

  { label: "Electrician", value: "Electrician" },
  { label: "Plumber", value: "Plumber" },
  { label: "Mechanic", value: "Mechanic" },
  { label: "Welder", value: "Welder" },
  { label: "Technician", value: "Technician" },
  { label: "Carpenter", value: "Carpenter" },
  { label: "Driver", value: "Driver" },
  { label: "Tailor / Fashion Designer", value: "Tailor / Fashion Designer" },
  { label: "Hairdresser / Barber", value: "Hairdresser / Barber" },
  { label: "Chef / Cook", value: "Chef / Cook" },
  { label: "Painter", value: "Painter" },
  { label: "Mason / Bricklayer", value: "Mason / Bricklayer" },

  { label: "Trader", value: "Trader" },
  { label: "Entrepreneur", value: "Entrepreneur" },
  { label: "Business Owner", value: "Business Owner" },
  { label: "Shopkeeper", value: "Shopkeeper" },
  { label: "Vendor", value: "Vendor" },
  { label: "Market Seller", value: "Market Seller" },
  {
    label: "Logistic Agent / Dispatch Rider",
    value: "Logistic Agent / Dispatch Rider",
  },

  { label: "Hotel Staff", value: "Hotel Staff" },
  { label: "Security Officer", value: "Security Officer" },
  { label: "Cleaner", value: "Cleaner" },
  { label: "Receptionist", value: "Receptionist" },
  { label: "Waiter / Waitress", value: "Waiter / Waitress" },
  { label: "Customer Care Agent", value: "Customer Care Agent" },

  { label: "Farmer", value: "Farmer" },
  { label: "Fisherman", value: "Fisherman" },
  { label: "Poultry Worker", value: "Poultry Worker" },
  { label: "Agricultural Officer", value: "Agricultural Officer" },

  { label: "Student", value: "Student" },
  { label: "Corps Member (NYSC)", value: "Corps Member (NYSC)" },
  { label: "Artisan", value: "Artisan" },
  { label: "Freelancer", value: "Freelancer" },
  { label: "Clergy / Pastor / Imam", value: "Clergy / Pastor / Imam" },
  { label: "Housewife / Homemaker", value: "Housewife / Homemaker" },
  { label: "Retired", value: "Retired" },
  { label: "Unemployed", value: "Unemployed" },
];

export const ALLERGY_OPTIONS: TOptionValue[] = [
  { label: "Food", value: "food" },
  { label: "Medication", value: "medication" },
  { label: "Inhalant", value: "inhalant" },
  { label: "Contact", value: "contact" },
  { label: "Others", value: "others" },
];

export const emergencyContactList = [
  { label: "Father", value: "Father" },
  { label: "Mother", value: "Mother" },
  { label: "Husband", value: "Husband" },
  { label: "Wife", value: "Wife" },
  { label: "Son", value: "Son" },
  { label: "Daughter", value: "Daughter" },
  { label: "Brother", value: "Brother" },
  { label: "Sister", value: "Sister" },

  { label: "Uncle", value: "Uncle" },
  { label: "Aunt", value: "Aunt" },
  { label: "Cousin", value: "Cousin" },
  { label: "Nephew", value: "Nephew" },
  { label: "Niece", value: "Niece" },

  { label: "Grandfather", value: "Grandfather" },
  { label: "Grandmother", value: "Grandmother" },

  { label: "Guardian", value: "Guardian" },
  { label: "Sponsor", value: "Sponsor" },
  { label: "Next of Kin", value: "Next of Kin" },

  { label: "Friend", value: "Friend" },
  { label: "Colleague", value: "Colleague" },
  { label: "Neighbor", value: "Neighbor" },

  { label: "Caregiver", value: "Caregiver" },
  { label: "Partner", value: "Partner" },
  { label: "Fiancé / Fiancée", value: "Fiancé / Fiancée" },
];

export const priorityOptions = [
  { label: PRIORITY.LOW_RISK, value: PRIORITY.LOW_RISK },
  { label: PRIORITY.MODERATE_RISK, value: PRIORITY.MODERATE_RISK },
  { label: PRIORITY.HIGH_RISK, value: PRIORITY.HIGH_RISK },
  { label: PRIORITY.EMERGENCY, value: PRIORITY.EMERGENCY },
];

export const DRUG_CONDITION_OPTIONS: TOptionValue[] = [
  {
    label: "Food intolerance (disorder)",
    value: "food_intolerance_disorder",
  },
  {
    label: "Food allergy (disorder)",
    value: "food_allergy_disorder",
  },
  {
    label: "Propensity to adverse reaction to food (disorder)",
    value: "propensity_adverse_reaction_food_disorder",
  },
];

export const SEVERITY_OPTIONS: TOptionValue[] = [
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];



export const eventTypeOptions = [
  { label: "In-Person", value: EVENT_TYPE.IN_PERSON },
  { label: "Telemedicine", value: EVENT_TYPE.TELEMEDICINE },
];

export const activityOptions = [
  { label: ACTIVITY.CHECKUP, value: ACTIVITY.CHECKUP },
  { label: ACTIVITY.URGENT_CARE, value: ACTIVITY.URGENT_CARE },
  { label: ACTIVITY.CONSULTATION, value: ACTIVITY.CONSULTATION },
  { label: ACTIVITY.FOLLOW_UP, value: ACTIVITY.FOLLOW_UP },
  { label: ACTIVITY.TELEMEDICINE, value: ACTIVITY.TELEMEDICINE },
];

export const visitStatusOption = [
  {
    label: "Reception Queue for Checkin",
    value: FORWARD_TO.RECEPTION_QUEUE,
  },
  {
    label: "Nursing Queue for Vitals",
    value: FORWARD_TO.NURSING_QUEUE,
  },
  {
    label: "Doctor Queue for Consultation",
    value: FORWARD_TO.DOCTOR_QUEUE,
  },
  {
    label: "Laboratory Queue for test",
    value: FORWARD_TO.LABORATORY_QUEUE,
  },
  {
    label: "Pharmacy Queue for medication",
    value: FORWARD_TO.PHARMACY_QUEUE,
  },
];
