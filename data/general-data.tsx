import { ConsultIcon, PenIcon, SummaryIcon } from "@/assets/icons";
import { IPatientSteppersProps, ISteps } from "@/interfaces/patients";

export const initialPatientSteps = (
  routeId: string
): IPatientSteppersProps[] => {
  const baseUrl = `/queues/${routeId}`;
  const steps = [
    {
      id: 1,
      label: "Summary",
      icon: <SummaryIcon />,
      path: [
        `${baseUrl}/summary`,
        `${baseUrl}/complaints`,
        `${baseUrl}/vitals`,
        `${baseUrl}/diagnosis`,
        `${baseUrl}/laboratory-test`,
        `${baseUrl}/imaging`,
        `${baseUrl}/doctors-note`,
        `${baseUrl}/allergies`,
        `${baseUrl}/treatments`,
        `${baseUrl}/nurses-note`,
        `${baseUrl}/surgeries`,
        `${baseUrl}/vaccinations`,
        `${baseUrl}/review-summary`,
      ],
    },
    {
      id: 2,
      label: "Consultation",
      icon: <ConsultIcon />,
      path: [
        `${baseUrl}/complaints`,
        `${baseUrl}/vitals`,
        `${baseUrl}/diagnosis`,
        `${baseUrl}/laboratory-test`,
        `${baseUrl}/imaging`,
        `${baseUrl}/doctors-note`,
        `${baseUrl}/allergies`,
        `${baseUrl}/treatments`,
        `${baseUrl}/nurses-note`,
        `${baseUrl}/surgeries`,
        `${baseUrl}/vaccinations`,
        `${baseUrl}/review-summary`,
      ],
    },
    {
      id: 3,
      label: "Treatment",
      icon: <PenIcon />,
      path: [
        `${baseUrl}/treatments`,
        `${baseUrl}/nurses-note`,
        `${baseUrl}/surgeries`,
        `${baseUrl}/vaccinations`,
        `${baseUrl}/review-summary`,
      ],
    },
    {
      id: 4,
      label: "Review and submit",
      icon: <PenIcon />,
      path: [`${baseUrl}/review-summary`],
    },
  ];
  return steps;
};

export const initialSteps: ISteps[] = [
  {
    id: 1,
    label: "Make Request",
    desc: "Get Access to your Patient’s Medical Records",
    status: "current",
  },
  {
    id: 2,
    label: "Decision",
    desc: "Get Access to your Patient’s Medical Records",
    status: "pending",
  },
];

export const sourceOptions = [
  {
    label: "Axillary",
    value: "Axillary",
  },
  {
    label: "Oral",
    value: "Oral",
  },
  {
    label: "Rectal",
    value: "Rectal",
  },
  {
    label: "Eardrum",
    value: "Eardrum",
  },
];

export const positionOptions = [
  {
    label: "Laying",
    value: "Laying",
  },
  {
    label: "Sitting",
    value: "Sitting",
  },
  {
    label: "Standing",
    value: "Standing",
  },
  {
    label: "Running",
    value: "Running",
  },
];

export const pulseOptions = [
  {
    label: "Full",
    value: "Full",
  },
  {
    label: "Hardly Palpable",
    value: "Hardly Palpable",
  },
  {
    label: "Irregular",
    value: "Irregular",
  },
  {
    label: "Shadow",
    value: "Shadow",
  },
  {
    label: "Weak",
    value: "Weak",
  },
];

export const breathingPatternOptions = [
  {
    label: "Normal",
    value: "Normal",
  },
  {
    label: "Shallow",
    value: "Shallow",
  },
  {
    label: "Irregular",
    value: "Irregular",
  },
  {
    label: "Rapid",
    value: "Rapid",
  },
  {
    label: "Deep",
    value: "Deep",
  },
];

export const heightOptions = [
  {
    label: "10in",
    value: "Normal",
  },
  {
    label: "15in",
    value: "Shallow",
  },
  {
    label: "20in",
    value: "Irregular",
  },
  {
    label: "30in",
    value: "Rapid",
  },
  {
    label: "40in",
    value: "Deep",
  },
];
