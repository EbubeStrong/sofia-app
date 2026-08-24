import {
  InviteTeamSchemaProps,
  IProfileSchemaProps,
  IRegSchemaProps,
  ITechnologySchemaProps,
} from "@/interfaces/general";
import { INestedSchema, ISchema } from "./types";
import {
  BedSchemaProps,
  RoomSchemaProps,
  WardSchemaProps,
} from "@/interfaces/configuration";
import { VitalSignsSchemaProps } from "@/interfaces/nurses";
import { priorityOptions } from "@/data/checkin-data";

export const loginSchema: ISchema[] = [
  {
    name: "loginEmail",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    required: true,
  },
  {
    name: "loginPassword",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
];

export const inviteSchema: ISchema[] = [
  {
    name: "invitePassword",
    label: "Password",
    placeholder: "Enter your password",
    type: "password",
    required: true,
  },
];

export const forgotPasswordSchema: ISchema[] = [
  {
    name: "email",
    label: "Email",
    placeholder: "Enter your email",
    type: "email",
    required: true,
  },
];

export const resetPasswordSchema: ISchema[] = [
  {
    name: "resetNewPassword",
    label: "New Password",
    placeholder: "Enter your new password",
    type: "password",
    required: true,
  },
  {
    name: "resetConfirmPassword",
    label: "Confirm Password",
    placeholder: "Confirm your new password",
    type: "password",
    required: true,
    dependencies: "resetNewPassword",
  },
];

export const otpSchema: ISchema[] = [
  {
    name: "otp",
    label: "",
    placeholder: "",
    type: "otp",
    required: true,
  },
];

export const RegisterSchema = ({
  countryOptions,
  countryLoading,
  hospitalOptions,
  hospitalLoading,
  statesOptions,
  statesLoading,
  onHospitalSearch,
  onHospitalClear,
  onHospitalSelect,
}: IRegSchemaProps) => {
  const schema: ISchema[] = [
    {
      name: "hospitalCountry_reg",
      label: "Country",
      placeholder: "Select country of practice",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: countryOptions,
      selectionLoading: countryLoading,
    },
    {
      name: "hospitalName_reg",
      label: "Hospital Name",
      placeholder: "Select hospital name",
      type: "selection" as const,
      required: true,
      fieldClass: "col-span-2",
      options: hospitalOptions,
      selectionLoading: hospitalLoading,
      onSearch: onHospitalSearch,
      onClear: onHospitalClear,
      onSelect: onHospitalSelect,
    },

    {
      name: "doctorAddress_reg",
      label: "Hospital Address",
      placeholder: "Enter your address",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },

    {
      name: "hospitalState_reg",
      label: "State",
      placeholder: "Select state of practice",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: statesOptions,
      selectionLoading: statesLoading,
    },

    {
      name: "alternativeTradeName_reg",
      label: "Alternative Trade Name",
      type: "text",
      placeholder: "Enter alternative trade name",
      required: false,
      fieldClass: "col-span-2",
    },

    {
      name: "hospitalEmail_reg",
      label: "Hospital Email",
      type: "email",
      placeholder: "Enter alternative trade name",
      required: true,
      fieldClass: "col-span-2",
    },

    {
      name: "doctorPassword",
      label: "Create Password",
      placeholder: "Enter your password",
      type: "password",
      required: true,
      fieldClass: "col-span-2",
    },
  ];

  return schema;
};

export const licensingSchema = () => {
  const schema: ISchema[] = [
    {
      name: "accreditation_reg",
      label: "Accreditation / Certifications",
      placeholder: "Select accreditation or certifications",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "HEFAMAA",
          value: "HEFAMAA",
        },
        {
          label: "HFR",
          value: "HFR",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "licenseNumber_reg",
      label: "License Number",
      type: "text",
      placeholder: "Enter license number",
      required: false,
      fieldClass: "col-span-2",
    },
    {
      name: "emergency_reg",
      label: "Do You have emergency services available?",
      placeholder: "",
      type: "radioGroup",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "telemedicine_reg",
      label: "Do You have Telemedicine services available?",
      placeholder: "",
      type: "radioGroup",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
    {
      name: "numberOfBeds_reg",
      label: "Number of Beds",
      type: "number",
      placeholder: "Enter number of beds",
      required: false,
      fieldClass: "col-span-2",
    },
    {
      name: "patientCapacity_reg",
      label: "Output patient capacity per day",
      type: "number",
      placeholder: "Enter number of patient capacity",
      required: false,
      fieldClass: "col-span-2",
    },

    {
      name: "phoneNumber_reg",
      label: "Hospital Phone Number",
      type: "phone",
      placeholder: "Enter your phone number",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "hospitalWebsiteUrl_reg",
      label: "Website URL",
      type: "url",
      placeholder: "Enter website url - (https://www.example.com)",
      required: false,
      fieldClass: "col-span-2",
    },
  ];

  return schema;
};

export const departmentSchema = () => {
  const schema: ISchema[] = [
    {
      name: "speciality_reg",
      label: "Select speciality your hospital offer?",
      placeholder: "Select speciality",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Cardiology",
          value: "Cardiology",
        },
        {
          label: "Oncology",
          value: "Oncology",
        },
        {
          label: "Paediatrics",
          value: "Paediatrics",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "centerOfExcellence_reg",
      label: "Center of excellence",
      placeholder: "Select center of excellence",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Cardiology",
          value: "Cardiology",
        },
        {
          label: "Oncology",
          value: "Oncology",
        },
        {
          label: "Paediatrics",
          value: "Paediatrics",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "diagnostics_reg",
      label: "Diagnostics",
      placeholder: "Select diagnostics",
      type: "checkboxGroup",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Radiology",
          value: "Radiology",
        },
        {
          label: "Lab",
          value: "Lab",
        },
        {
          label: "Pathology",
          value: "Pathology",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "services_reg",
      label: "Services",
      placeholder: "Select services",
      type: "checkboxGroup",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Ambulance Services",
          value: "Ambulance Services",
        },
        {
          label: "In-House Pharmacy",
          value: "In-House Pharmacy",
        },
        {
          label: "Attendant Accommodation",
          value: "Attendant Accommodation",
        },
      ],
      selectionLoading: false,
    },
  ];

  return schema;
};

export const technologySchema = ({
  insuranceOptions,
  insuranceLoading,
  onInsuranceSearch,
  onInsuranceClear,
  onInsuranceSelect,
}: ITechnologySchemaProps) => {
  const schema: ISchema[] = [
    {
      name: "insuranceProvider_reg",
      label: "Insurance Providers",
      placeholder: "Select insurance provider",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: insuranceOptions,
      selectionLoading: insuranceLoading,
      onSearch: onInsuranceSearch,
      onClear: onInsuranceClear,
      onSelect: onInsuranceSelect,
    },
    {
      name: "existingEmr_reg",
      label: "Do you use an existing EMR",
      placeholder: "Select existing EMR",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "existingSolution_reg",
      label: "What EMR solution do you use currently",
      placeholder: "Select EMR solution",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "AjirMed",
          value: "AjirMed",
        },
        {
          label: "Medisco",
          value: "Medisco",
        },
        {
          label: "Clinify",
          value: "Clinify",
        },
        {
          label: "SmartEMR",
          value: "SmartEMR",
        },
      ],
      selectionLoading: false,
      visibleWhen: {
        field: "existingEmr_reg",
        equals: "Yes",
      },
    },
  ];

  return schema;
};

export const complianceSchema = () => {
  const schema: ISchema[] = [
    {
      name: "role1_reg",
      label: "Role",
      placeholder: "Select role",
      type: "selection",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      options: [
        {
          label: "Full time Doctors",
          value: "Full time Doctors",
        },
        {
          label: "Visiting Doctors",
          value: "Visiting Doctors",
        },
        {
          label: "Nurses and Support Staff",
          value: "Nurses and Support Staff",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "roleNumber1_reg",
      label: "Number",
      type: "number",
      placeholder: "Enter total number",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "role2_reg",
      label: "Role",
      placeholder: "Select role",
      type: "selection",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      options: [
        {
          label: "Full time Doctors",
          value: "Full time Doctors",
        },
        {
          label: "Visiting Doctors",
          value: "Visiting Doctors",
        },
        {
          label: "Nurses and Support Staff",
          value: "Nurses and Support Staff",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "roleNumber2_reg",
      label: "Number",
      type: "number",
      placeholder: "Enter total number",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "role3_reg",
      label: "Role",
      placeholder: "Select role",
      type: "selection",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      options: [
        {
          label: "Full time Doctors",
          value: "Full time Doctors",
        },
        {
          label: "Visiting Doctors",
          value: "Visiting Doctors",
        },
        {
          label: "Nurses and Support Staff",
          value: "Nurses and Support Staff",
        },
      ],
      selectionLoading: false,
    },
    {
      name: "roleNumber3_reg",
      label: "Number",
      type: "number",
      placeholder: "Enter total number",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "specialistAvailable_reg",
      label: "Are your specialist available 24/7",
      placeholder: "",
      type: "radioGroup",
      required: true,
      fieldClass: "col-span-2",
      options: [
        {
          label: "Yes",
          value: "yes",
        },
        {
          label: "No",
          value: "no",
        },
      ],
    },
  ];

  return schema;
};

export const completeProfileSchema = ({
  countryOptions,
  countryLoading,
  hospitalOptions,
  hospitalLoading,
  practiceTypeOptions,
  practiceTypeLoading,
  specialityOptions,
  specialityLoading,
}: IProfileSchemaProps) => {
  const schema: ISchema[] = [
    {
      name: "doctorHospitalName",
      label: "Hospital/Clinic Name",
      placeholder: "Select hospital name",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: hospitalOptions,
      selectionLoading: hospitalLoading,
    },
    {
      name: "doctorCountry",
      label: "Country of practice",
      placeholder: "Select country of practice",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: countryOptions,
      selectionLoading: countryLoading,
    },
    {
      name: "doctorPracticeType",
      label: "Doctors Practice Type",
      placeholder: "Select practice type",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: practiceTypeOptions,
      selectionLoading: practiceTypeLoading,
    },
    {
      name: "doctorSpeciality",
      label: "Doctors Speciality",
      placeholder: "Select your speciality",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: specialityOptions,
      selectionLoading: specialityLoading,
    },
    {
      name: "doctorBio",
      label: "Bio",
      placeholder: "Write a little bit about you",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "doctorUpload",
      label: "Attach a  Video",
      type: "upload",
      placeholder: "",
      required: false,
      fieldClass: "col-span-2",
    },
  ];

  return schema;
};

export const patientInformationSchema: ISchema[] = [
  {
    name: "patientFirstName",
    label: "Patient First Name",
    type: "text",
    placeholder: "Enter patient first name",
    required: true,
  },
  {
    name: "patientLastName",
    label: "Patient Last Name",
    type: "text",
    placeholder: "Enter patient last name",
    required: true,
  },
  {
    name: "patientDateOfBirth",
    label: "Patient Date of Birth",
    type: "date",
    placeholder: "Enter patient date of birth",
    required: true,
  },
  {
    name: "guardianFullName",
    label: "Guardian's Full Name",
    type: "text",
    placeholder: "Enter guardian full name",
    required: true,
  },
  {
    name: "guardianPhoneNumber",
    label: "Guardian’s Phone Number",
    type: "number",
    placeholder: "Enter guardian phone number",
    required: true,
  },
  {
    name: "patientGender",
    label: "Patient Gender",
    placeholder: "Select patient gender",
    type: "selection",
    required: true,
    options: [
      {
        label: "Male",
        value: "male",
      },
      {
        label: "Female",
        value: "female",
      },
    ],
  },
  {
    name: "maritalStatus",
    label: "Marital Status",
    placeholder: "Select marital status",
    type: "selection",
    required: true,
    options: [
      {
        label: "Single",
        value: "single",
      },
      {
        label: "Married",
        value: "married",
      },
      {
        label: "Divorced",
        value: "divorced",
      },
    ],
  },
  {
    name: "patientPhoneNumber",
    label: "Patient Phone Number",
    type: "number",
    placeholder: "Enter patient phone number",
    required: true,
  },
  {
    name: "identificationNumber",
    label: "Identification Number (NIN)",
    type: "number",
    placeholder: "Enter identification number",
    required: true,
  },
  {
    name: "patientEmailAddress",
    label: "Patient Email Address",
    type: "email",
    placeholder: "Enter patient email address",
    required: true,
  },
  {
    name: "patientHomeAddress",
    label: "Patient Home Address",
    type: "text",
    placeholder: "Enter patient home address",
    required: true,
  },
];

export const nextOfKinSchema: INestedSchema[] = [
  {
    name: "nameOfPatientNextOfKin",
    label: "Name of Patient Next of Kin",
    placeholder: "Enter patient next of kin name",
    type: "text",
    required: false,
  },
  {
    name: "relationship",
    label: "Relationship",
    placeholder: "Select relationship",
    type: "selection",
    required: false,
    options: [
      {
        label: "Parent",
        value: "parent",
      },
      {
        label: "Sibling",
        value: "sibling",
      },
      {
        label: "Friend",
        value: "friend",
      },
      {
        label: "Spouse",
        value: "spouse",
      },
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter phone number",
    required: false,
  },
];

export const emergencyContactSchema: INestedSchema[] = [
  {
    name: "nameOfPatientEmergencyContact",
    label: "Name of Patient Emergency Contact",
    placeholder: "Enter emergency contact name",
    type: "text",
    required: false,
  },
  {
    name: "relationship",
    label: "Relationship",
    placeholder: "Select relationship",
    type: "selection",
    required: false,
    options: [
      {
        label: "Parent",
        value: "parent",
      },
      {
        label: "Sibling",
        value: "sibling",
      },
      {
        label: "Friend",
        value: "friend",
      },
      {
        label: "Spouse",
        value: "spouse",
      },
    ],
  },
  {
    name: "phoneNumber",
    label: "Phone Number",
    type: "number",
    placeholder: "Enter phone number",
    required: false,
  },
];

export const insuranceInfoSchema: ISchema[] = [
  {
    name: "insuranceCompany",
    label: "Insurance Company",
    placeholder: "Select insurance company",
    type: "selection",
    required: true,
    options: [
      {
        label: "Axa Mansard",
        value: "mansard",
      },
      {
        label: "Reliance HMO",
        value: "reliance",
      },
      {
        label: "Stanbic IBTC",
        value: "stanbic",
      },
    ],
  },
  {
    name: "policyHolderName",
    label: "Policy holder Name",
    placeholder: "Enter your policy holder name",
    type: "text",
    required: true,
  },
  {
    name: "planName",
    label: "Plan Name",
    placeholder: "Select your plan name",
    type: "selection",
    required: true,
    options: [
      {
        label: "Comprehensive plan",
        value: "comprehensive",
      },
      {
        label: "Third party insurance",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "policyNumber",
    label: "Policy Number",
    placeholder: "Enter your policy number",
    type: "number",
    required: true,
  },
  {
    name: "groupNumber",
    label: "Group Number",
    placeholder: "Enter your group number",
    type: "number",
    required: true,
  },
  {
    name: "effectiveDate",
    label: "Effective Date",
    type: "date",
    placeholder: "Enter effective date",
    required: true,
  },
  {
    name: "expirationDate",
    label: "Expiration Date",
    type: "date",
    placeholder: "Enter expiration date",
    required: true,
  },
];

export const patientComplaintSchema: ISchema[] = [
  {
    name: "complaint",
    label: "Chief Complaint",
    placeholder: "Enter chief complaint",
    type: "text",
    required: true,
    helpText: "Primary reason the patient is seeking medical attention.",
  },
  {
    name: "presentIllness",
    label: "History of Present illness",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
    helpText: "Detailed history of present illness",
  },
  {
    name: "doctorsRecommendation",
    label: "Doctor's note and Reccommendation",
    placeholder: "Doctor's note and Reccommendation",
    type: "textArea",
    required: true,
  },
  {
    name: "collectedBy",
    label: "Collected by",
    placeholder: "Select the collected by doctor",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter recorded date",
    required: true,
  },
  {
    name: "",
    label: "Save",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const medicalConditionSchema: ISchema[] = [
  {
    name: "diagnosis",
    label: "Diagnosis",
    placeholder: "Enter your diagnosis",
    type: "text",
    required: true,
    helpText: "Primary reason the patient is seeking medical attention",
  },
  {
    name: "startDate",
    label: "Start Date",
    type: "date",
    placeholder: "Enter start date",
    required: true,
  },
  {
    name: "endDate",
    label: "End Date",
    type: "date",
    placeholder: "Enter end date",
    required: true,
  },
  {
    name: "occurrence",
    label: "Occurrence",
    placeholder: "Select occurrences",
    type: "selection",
    required: true,
    options: [
      {
        label: "Unknown",
        value: "unknown",
      },
      {
        label: "Early Occurrence (<2 Months)",
        value: "earlyOccurrence",
      },
      {
        label: "Late Occurrence (2-12 Months)",
        value: "lateOccurrence",
      },
      {
        label: "Delayed Occurrence (> 12 Months)",
        value: "delayOccurrence",
      },
      {
        label: "Chronic/Recurrent",
        value: "chronic",
      },
      {
        label: "Acute on Chronic",
        value: "acute",
      },
    ],
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select status",
    type: "selection",
    required: true,
    options: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Inactive",
        value: "inactive",
      },
      {
        label: "Resolved",
        value: "resolved",
      },
    ],
  },
  {
    name: "details",
    label: "Details",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
    helpText: "Detailed history of present illness",
  },
  {
    name: "medicalHistory",
    label: "Move to medical history",
    placeholder: "",
    type: "checkbox",
    required: true,
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter date recorded",
    required: true,
  },
  {
    name: "",
    label: "Save",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const allergySchema: ISchema[] = [
  {
    name: "type",
    label: "Type",
    placeholder: "Select type",
    type: "selection",
    required: true,
    options: [
      {
        label: "Food",
        value: "food",
      },
      {
        label: "Medication",
        value: "medication",
      },
      {
        label: "Inhalant",
        value: "inhalant",
      },
      {
        label: "Contact",
        value: "contact",
      },
      {
        label: "Other",
        value: "other",
      },
    ],
    fieldClass: "col-span-2 xl:col-span-1",
  },
  {
    name: "severity",
    label: "Severity",
    placeholder: "Select severity",
    type: "selection",
    required: true,
    options: [
      {
        label: "High",
        value: "high",
      },
      {
        label: "Medium",
        value: "medium",
      },
      {
        label: "Low",
        value: "low",
      },
    ],
    fieldClass: "col-span-2 xl:col-span-1",
  },
  {
    name: "agent",
    label: "Agent",
    placeholder: "Enter agent",
    type: "text",
    required: true,
    helpText:
      "Food or food ingredient that triggers an allergic reaction in the person",
    fieldClass: "col-span-2",
  },
  {
    name: "condition",
    label: "Condition",
    placeholder: "Select condition",
    type: "selection",
    required: true,
    options: [
      {
        label: "Drug Intolerance (Disorder)",
        value: "unknown",
      },
      {
        label: "Drug allergy (Disorder)",
        value: "earlyOccurrence",
      },
      {
        label: "Propensity to adverse reaction to drug  (Disorder)",
        value: "lateOccurrence",
      },
    ],
    fieldClass: "col-span-2",
  },
  {
    name: "reaction",
    label: "Reaction(s)",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
    helpText: "This is a note incase",
    fieldClass: "col-span-2",
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter date recorded",
    required: true,
    fieldClass: "col-span-2",
  },
  {
    name: "",
    label: "Save Record & Continue",
    type: "submitButton",
    placeholder: "",
    required: true,
    fieldClass: "col-span-1 w-full max-w-full xl:max-w-[80%]",
  },
];

export const medicationListSchema: ISchema[] = [
  {
    name: "brandName",
    label: "Brand Name",
    placeholder: "Select brand name",
    type: "selection",
    required: true,
    options: [
      {
        label: "Food",
        value: "food",
      },
      {
        label: "Medication",
        value: "medication",
      },
      {
        label: "Inhalant",
        value: "inhalant",
      },
      {
        label: "Contact",
        value: "contact",
      },
      {
        label: "Other",
        value: "other",
      },
    ],
  },
  {
    name: "genericName",
    label: "Generic Name",
    placeholder: "Enter generic name",
    type: "text",
    required: true,
  },
  {
    name: "strength",
    label: "Strength",
    placeholder: "Select strength",
    type: "selection",
    required: true,
    options: [
      {
        label: "10mg",
        value: "10mg",
      },
      {
        label: "50mg",
        value: "50mg",
      },
      {
        label: "100mg",
        value: "100mg",
      },
    ],
  },
  {
    name: "form",
    label: "Form",
    placeholder: "Select form",
    type: "selection",
    required: true,
    options: [
      {
        label: "Tablets",
        value: "high",
      },
      {
        label: "Capsules",
        value: "medium",
      },
      {
        label: "Powders",
        value: "low",
      },
    ],
  },
  {
    name: "total",
    label: "Total",
    placeholder: "Enter the total",
    type: "number",
    required: true,
  },
  {
    name: "refillNumber",
    label: "Refill Number",
    placeholder: "Enter the refill number",
    type: "number",
    required: true,
  },
  {
    name: "allowSubstitute",
    label: "Allow Substitute",
    placeholder: "Select an option",
    type: "selection",
    required: true,
    options: [
      {
        label: "Yes",
        value: "yes",
      },
      {
        label: "No",
        value: "no",
      },
    ],
  },
  {
    name: "directions",
    label: "Directions",
    type: "textArea",
    placeholder: "How patients should take the prescription",
    required: true,
  },
  {
    name: "",
    label: "Save",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const physicalExamSchema: INestedSchema[] = [
  {
    name: "physicalExam",
    label: "Examination Type",
    placeholder: "Select examination",
    type: "selection",
    required: false,
    options: [
      {
        label: "General Physical Exam",
        value: "General Physical Exam",
      },
      {
        label: "Cardiovascular",
        value: "Cardiovascular",
      },
      {
        label: "Skin",
        value: "Skin",
      },
      {
        label: "Neurological",
        value: "Neurological",
      },
    ],
  },
  {
    name: "summary",
    label: "Examination Summary",
    placeholder: "Enter examination summary",
    type: "textArea",
    required: false,
  },
  {
    name: "doctorsComments",
    label: "Doctor's Comments",
    type: "textArea",
    placeholder: "Enter doctor's comments",
    required: false,
  },
];

export const labTestSchema: ISchema[] = [
  {
    name: "labOrder",
    label: "Lab Test Order",
    placeholder: "Enter lab test order",
    type: "text",
    required: true,
    helpText: "Primary reason the patient is seeking medical attention.",
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Select type",
    type: "selection",
    required: true,
    options: [
      {
        label: "Screening",
        value: "Screening",
      },
      {
        label: "Test",
        value: "Test",
      },
    ],
  },
  {
    name: "priority",
    label: "Priority",
    placeholder: "Select priority",
    type: "selection",
    required: true,
    options: [
      {
        label: "Routine",
        value: "Routine",
      },
      {
        label: "Urgent",
        value: "Urgent",
      },
      {
        label: "Critical",
        value: "Critical",
      },
    ],
  },
  {
    name: "specimen",
    label: "Specimen",
    placeholder: "Select the specimen",
    type: "selection",
    required: true,
    options: [
      {
        label: "Blood ",
        value: "Blood ",
      },
      {
        label: "Discharge",
        value: "Discharge",
      },
      {
        label: "Skin Swap",
        value: "Skin Swap",
      },
      {
        label: "Feaces",
        value: "Feaces",
      },
      {
        label: "Throat Swab",
        value: "Throat Swab",
      },
      {
        label: "Biopsy Tissue",
        value: "Biopsy Tissue",
      },
    ],
  },
  {
    name: "patientInstruction",
    label: "Patient Instruction",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
    helpText: "Detailed history of present illness",
  },
  {
    name: "service",
    label: "Service",
    placeholder: "",
    type: "radioGroup",
    required: true,
    options: [
      {
        label: "In-house Lab",
        value: "In-house Lab",
      },
      {
        label: "Outside Lab",
        value: "Outside Lab",
      },
    ],
  },
  {
    name: "comment",
    label: "Comment",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
  },
  {
    name: "orderBy",
    label: "Ordered by",
    placeholder: "Select the doctor",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "uploadDoc",
    label: "",
    type: "upload",
    placeholder: "",
    required: true,
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter recorded date",
    required: true,
  },
  {
    name: "",
    label: "Save Record",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const labTestResultSchema: ISchema[] = [
  {
    name: "hemoglobin",
    label: "Hemoglobin",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "hematocrit",
    label: "Hematocrit",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "whiteBlood",
    label: "White Blood Cell Count (WBC)",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "redBlood",
    label: "Red Blood Cell Count (RBC)",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "plateletCount",
    label: "Platelet Count",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "corpVolume",
    label: "Mean Corpuscular Volume (MCV)",
    placeholder: "Enter record",
    type: "number",
    required: true,
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter recorded date",
    required: true,
  },
];

export const surgerySchema: ISchema[] = [
  {
    name: "surgeryType",
    label: "Surgery Type",
    placeholder: "Select surgery type",
    type: "selection",
    required: true,
    options: [
      {
        label: "Elective",
        value: "Elective",
      },
      {
        label: "Emergency",
        value: "Emergency",
      },
      {
        label: "Exploratory",
        value: "Exploratory",
      },
    ],
  },
  {
    name: "procedure",
    label: "Surgical Procedure",
    placeholder: "e.g. laparoscopic, open surgery",
    type: "textArea",
    required: true,
  },
  {
    name: "preDiagnosis",
    label: "Pre-Surgery Diagnosis ",
    placeholder: "Write pre-surgery diagnosis",
    type: "textArea",
    required: true,
  },
  {
    name: "postDiagnosis",
    label: "Post-Surgery Diagnosis ",
    placeholder: "Write post-surgery diagnosis",
    type: "textArea",
    required: true,
  },
  {
    name: "surgeonName",
    label: "Lead Surgeon Name",
    placeholder: "Select surgeon name",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "mike",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "segun",
      },
    ],
  },
  {
    name: "surgeonContact",
    label: "Lead Surgeon Contact",
    placeholder: "Enter surgeon contact",
    type: "number",
    required: true,
  },
  {
    name: "surgicalTeam",
    label: "Surgical Team",
    placeholder:
      "Names and roles of the surgical team members anesthesiologist, and other support staff.",
    type: "textArea",
    required: true,
  },
  {
    name: "dateRecorded",
    label: "Date Performed",
    type: "date",
    placeholder: "Enter date performed",
    required: true,
  },
  {
    name: "timePerformed",
    label: "Time Performed",
    placeholder: "Enter time performed",
    type: "time",
    required: true,
  },
  {
    name: "deviceDetails",
    label: "Device Details",
    placeholder: "Enter device details",
    type: "text",
    required: true,
  },
  {
    name: "brandName",
    label: "Brand Name",
    placeholder: "Enter brand name",
    type: "text",
    required: true,
  },
  {
    name: "companyName",
    label: "Company Name",
    placeholder: "Enter company name",
    type: "text",
    required: true,
  },
  {
    name: "modelNumber",
    label: "Version or Model Number",
    placeholder: "Enter model number",
    type: "number",
    required: true,
  },
  {
    name: "deviceStatus",
    label: "Device Status",
    placeholder: "",
    type: "radioGroup",
    required: true,
    options: [
      {
        label: "New",
        value: "New",
      },
      {
        label: "Replacement",
        value: "Replacement",
      },
    ],
  },
  {
    name: "postOpInformation",
    label: "Post-Operative Information",
    placeholder:
      "Note any immediate post-operative concerns or complications the recovery plan and any specific post-operative care instructions.",
    type: "textArea",
    required: true,
  },
];

export const vaccinesSchema: ISchema[] = [
  {
    name: "vaccine",
    label: "Vaccine",
    placeholder: "Select vaccine",
    type: "selection",
    required: true,
    options: [
      {
        label: "Anti-Tetanus",
        value: "Screening",
      },
      {
        label: "Test",
        value: "Test",
      },
    ],
  },
  {
    name: "diagnosis",
    label: "Diagnosis",
    placeholder: "Enter diagnosis",
    type: "text",
    required: true,
  },
  {
    name: "dateAdministered",
    label: "Date Administered",
    type: "date",
    placeholder: "Enter date administered",
    required: true,
  },
  {
    name: "scheduledDate",
    label: "Scheduled Date",
    type: "date",
    placeholder: "Enter scheduled date",
    required: true,
  },
  {
    name: "doses",
    label: "Doses",
    placeholder: "Select dose",
    type: "selection",
    required: true,
    options: [
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
    ],
  },
  {
    name: "unit",
    label: "Unit",
    placeholder: "Select unit",
    type: "selection",
    required: true,
    options: [
      {
        label: "1",
        value: "1",
      },
      {
        label: "2",
        value: "2",
      },
      {
        label: "3",
        value: "3",
      },
    ],
  },
  {
    name: "note",
    label: "Additional Note",
    placeholder: "Write your reason",
    type: "textArea",
    required: true,
    helpText: "How to take a prescribed vaccine",
  },
  {
    name: "consent",
    label: "Patient Consent",
    placeholder: "",
    type: "radioGroup",
    required: true,
    options: [
      {
        label: "Confirmed by patient",
        value: "Confirmed by patient",
      },
      {
        label: "Confirmed by medical proxy",
        value: "Confirmed by medical proxy",
      },
    ],
  },
  {
    name: "orderBy",
    label: "Ordered by",
    placeholder: "Select the personnel",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "administeredBy",
    label: "Administered By",
    placeholder: "Select the personnel",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "",
    label: "Save Record & Continue",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const treatmentsSchema: ISchema[] = [
  {
    name: "diagnosis",
    label: "Diagnosis",
    placeholder: "Write your diagnosis",
    type: "textArea",
    required: true,
  },
  {
    name: "prescription",
    label: "Prescription",
    placeholder: "Write your prescription",
    type: "textArea",
    required: true,
  },
  {
    name: "instruction",
    label: "Instruction",
    placeholder: "Write your instructions",
    type: "textArea",
    required: true,
  },
  {
    name: "hospital",
    label: "Hospital",
    placeholder: "Select hospital",
    type: "selection",
    required: true,
    options: [
      {
        label: "Oak Hosital",
        value: "oak",
      },
      {
        label: "R-Jolad Hospital",
        value: "r-jolad",
      },
    ],
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Select type",
    type: "selection",
    required: true,
    options: [
      {
        label: "Telemedicine",
        value: "telemedicine",
      },
      {
        label: "Herbal",
        value: "herbal",
      },
    ],
  },
  {
    name: "nursingNote",
    label: "Nursing Note",
    placeholder: "Write your note",
    type: "textArea",
    required: true,
  },
  {
    name: "doctor",
    label: "Doctor",
    placeholder: "Select the doctor",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "dateRecorded",
    label: "Date Recorded",
    type: "date",
    placeholder: "Enter date recorded",
    required: true,
  },
  {
    name: "",
    label: "Save Record",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const ticketsSchema: ISchema[] = [
  {
    name: "ticketName",
    label: "Ticket Name",
    placeholder: "Enter ticket name",
    type: "text",
    required: true,
    helpText: "Primary reason the patient is raising the ticket.",
  },
  {
    name: "ticketDescription",
    label: "Ticket Description",
    placeholder: "e.g issues the user complained about",
    type: "textArea",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select ticket status",
    type: "selection",
    required: true,
    options: [
      {
        label: "Active",
        value: "comprehensive",
      },
      {
        label: "Pending",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "collectedBy",
    label: "Collected by",
    placeholder: "Select the doctor",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "",
    label: "Submit",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const editTicketsSchema: ISchema[] = [
  {
    name: "ticketName",
    label: "Ticket Name",
    placeholder: "Enter ticket name",
    type: "text",
    required: true,
    helpText: "Primary reason the patient is raising the ticket.",
  },
  {
    name: "ticketDescription",
    label: "Ticket Description",
    placeholder: "e.g issues the user complained about",
    type: "textArea",
    required: true,
  },
  {
    name: "status",
    label: "Status",
    placeholder: "Select ticket status",
    type: "selection",
    required: true,
    options: [
      {
        label: "Active",
        value: "active",
      },
      {
        label: "Pending",
        value: "pending",
      },
    ],
  },
  {
    name: "collectedBy",
    label: "Collected by",
    placeholder: "Select the doctor",
    type: "selection",
    required: true,
    options: [
      {
        label: "Dr Mike Agboola, MD",
        value: "comprehensive",
      },
      {
        label: "Dr. Olusegun Obasanjo, MD",
        value: "thirdParty",
      },
    ],
  },
  {
    name: "",
    label: "Update",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const makeRequestSchema: ISchema[] = [
  {
    name: "patientId",
    label: "Patient ID",
    placeholder: "Enter patient ID",
    type: "text",
    required: true,
  },
  {
    name: "doctorFolioNumber",
    label: "Doctor’s Folio Number ",
    placeholder: "Enter folio number",
    type: "number",
    required: true,
    helpText: "This is for verification purposes",
  },
  {
    name: "",
    label: "Send Request",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const doctorProfileSchema: ISchema[] = [
  {
    name: "doctorAddress",
    label: "Doctor’s Address",
    type: "text",
    placeholder: "Enter doctor's address",
    required: true,
  },
  {
    name: "doctorPhoneNumber",
    label: "Doctor’s Phone Number",
    type: "number",
    placeholder: "Enter doctor's phone number",
    required: true,
  },
  {
    name: "stateOfPractice",
    label: "State of Practice",
    placeholder: "Select state of practice",
    type: "selection",
    required: true,
    options: [
      {
        label: "Lagos",
        value: "NG",
      },
      {
        label: "Abuja",
        value: "GH",
      },
      {
        label: "Osun",
        value: "KE",
      },
    ],
  },
  {
    name: "doctorSpeciality",
    label: "Doctor’s Speciality",
    placeholder: "Enter doctor speciality",
    type: "selection",
    required: true,
    options: [
      {
        label: "General Medicine",
        value: "generalMedicine",
      },
      {
        label: "Neurosurgery",
        value: "neurosurgery",
      },
      {
        label: "Paedeatrics",
        value: "paadeatrics",
      },
    ],
  },
  {
    name: "hospitalAddress",
    label: "Hospital Address",
    type: "text",
    placeholder: "Enter doctor's address",
    required: true,
  },
  {
    name: "doctorPracticeType",
    label: "Doctors Practice Type",
    placeholder: "Select practice type",
    type: "selection",
    required: true,
    options: [
      {
        label: "Family and General Medicine",
        value: "generalMedicine",
      },
      {
        label: "Paediatrics",
        value: "Paediatrics",
      },
      {
        label: "Internal Medicine",
        value: "Internal Medicine",
      },
    ],
  },
  {
    name: "",
    label: "Save",
    type: "submitButton",
    placeholder: "",
    required: true,
  },
];

export const InviteMembersSchema = ({
  roleOptions,
  roleLoading,
}: InviteTeamSchemaProps) => {
  return [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter first name",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter last name",
      required: true,
    },
    {
      label: "Email Address",
      name: "email",
      placeholder: "Enter email address",
      type: "email",
      required: true,
    },
    {
      label: "Role",
      name: "roleId",
      type: "selection",
      options: roleOptions,
      placeholder: "Select role",
      required: true,
      selectionLoading: roleLoading,
    },
    {
      label: "Is this invitee a Lead",
      name: "isLead",
      type: "checkbox",
      placeholder: "Choose if invitee is a lead",
      required: false,
    },
  ] as ISchema[];
};

export const WardSetupSchema = ({
  deptOptions,
  deptLoading,
}: WardSchemaProps) => {
  return [
    {
      label: "Ward Name",
      name: "wardName",
      type: "selection",
      options: [
        {
          label: "Medical Ward (or General Medicine Ward)",
          value: "Medical Ward (or General Medicine Ward)",
        },
        {
          label: "Surgical Ward",
          value: "Surgical Ward",
        },
        {
          label: "Intensive Care Unit (ICU) / Critical Care Unit (CCU)",
          value: "Intensive Care Unit (ICU) / Critical Care Unit (CCU)",
        },
        {
          label: "Pediatric Ward",
          value: "Pediatric Ward",
        },
        {
          label: "Cardiac Care Unit (CCU)",
          value: "Cardiac Care Unit (CCU)",
        },
        {
          label: "Maternity Ward",
          value: "Maternity Ward",
        },
        {
          label: "Psychiatric Ward",
          value: "Psychiatric Ward",
        },
        {
          label: "Oncology Ward",
          value: "Oncology Ward",
        },
        {
          label: "Orthopedic Ward",
          value: "Orthopedic Ward",
        },
        {
          label: "Emergency Department (ED)",
          value: "Emergency Department (ED)",
        },
      ],
      placeholder: "Enter ward name",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Ward Code",
      name: "wardCode",
      type: "text",
      placeholder: "Enter ward code e.g: W100",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Department",
      name: "department",
      type: "selection",
      options: deptOptions,
      placeholder: "Select department",
      required: true,
      selectionLoading: deptLoading,
      fieldClass: "col-span-2",
    },
    {
      label: "Floor",
      name: "floor",
      placeholder: "Enter ward floor",
      type: "number",
      required: true,
    },
    {
      label: "Capacity",
      name: "capacity",
      placeholder: "Enter ward capacity",
      type: "number",
      required: true,
    },
    {
      label: "Description",
      name: "description",
      placeholder: "Brief Description of the ward",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },
  ] as ISchema[];
};

export const RoomSetupSchema = ({
  wardOptions,
  wardLoading,
  roomTypeOptions,
  roomTypeLoading,
}: RoomSchemaProps) => {
  return [
    {
      label: "Room Number",
      name: "roomNumber_room",
      type: "text",
      placeholder: "Enter room number e.g: R100",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Ward",
      name: "ward_room",
      type: "selection",
      options: wardOptions,
      placeholder: "Select ward",
      required: true,
      selectionLoading: wardLoading,
      fieldClass: "col-span-2",
    },
    {
      label: "Room Type",
      name: "roomType_room",
      type: "selection",
      options: roomTypeOptions,
      placeholder: "Select room type",
      required: true,
      selectionLoading: roomTypeLoading,
      fieldClass: "col-span-2",
    },
    {
      label: "Capacity",
      name: "capacity_room",
      placeholder: "Enter room capacity e.g: 2",
      type: "number",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Private Bathroom",
      name: "privateBathroom_room",
      type: "selection",
      options: [
        {
          label: "Yes",
          value: "Yes",
        },
        {
          label: "No",
          value: "No",
        },
      ],
      placeholder: "Select private bathroom",
      required: true,
      selectionLoading: false,
      fieldClass: "col-span-2",
    },
    {
      label: "Features",
      name: "features_room",
      placeholder: "Enter features e.g: windows, TV, chairs, Refrigerator",
      type: "multiSelection",
      options: [
        {
          label: "WiFi",
          value: "WiFi",
        },
        {
          label: "Air Conditioning",
          value: "Air Conditioning",
        },
        {
          label: "Television",
          value: "Television",
        },
        { label: "Refrigerator", value: "Refrigerator" },
        {
          label: "Seating Area",
          value: "Seating Area",
        },
        {
          label: "Wardrobe/Closet",
          value: "Wardrobe/Closet",
        },
        {
          label: "Desk/Work Area",
          value: "Desk/Work Area",
        },
      ],
      selectionLoading: false,
      required: true,
      fieldClass: "col-span-2",
    },
  ] as ISchema[];
};

export const BedSetupSchema = ({
  bedTypeOptions,
  bedTypeLoading,
  roomTypeOptions,
  roomTypeLoading,
}: BedSchemaProps) => {
  return [
    {
      label: "Bed Number",
      name: "bedNumber_bed",
      type: "text",
      placeholder: "Enter bed number e.g: B101",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Room",
      name: "roomType_bed",
      type: "selection",
      options: roomTypeOptions,
      placeholder: "Select room type",
      required: true,
      selectionLoading: roomTypeLoading,
      fieldClass: "col-span-2",
    },
    {
      label: "Bed Type",
      name: "bedType_bed",
      type: "selection",
      options: bedTypeOptions,
      placeholder: "Select bed type",
      required: true,
      selectionLoading: bedTypeLoading,
      fieldClass: "col-span-2",
    },
    {
      label: "Features",
      name: "features_bed",
      placeholder: "Enter features e.g: windows, TV, chairs, Refrigerator",
      type: "multiSelection",
      options: [
        {
          label: "WiFi",
          value: "WiFi",
        },
        {
          label: "Air Conditioning",
          value: "Air Conditioning",
        },
        {
          label: "Television",
          value: "Television",
        },
        { label: "Refrigerator", value: "Refrigerator" },
        {
          label: "Seating Area",
          value: "Seating Area",
        },
        {
          label: "Wardrobe/Closet",
          value: "Wardrobe/Closet",
        },
        {
          label: "Desk/Work Area",
          value: "Desk/Work Area",
        },
      ],
      selectionLoading: false,
      required: true,
      fieldClass: "col-span-2",
    },
    {
      label: "Equipments (comma separated)",
      name: "equipments_bed",
      placeholder: "Enter equipments e.g: IV stand, bedside table, monitor",
      type: "multiSelection",
      options: [
        {
          label: "IV Stand",
          value: "IV Stand",
        },
        {
          label: "Bedside Table",
          value: "Bedside Table",
        },
        {
          label: "Monitor",
          value: "Monitor",
        },
        {
          label: "Overbed Table",
          value: "Overbed Table",
        },
        {
          label: "Call Button",
          value: "Call Button",
        },
        {
          label: "Oxygen Supply",
          value: "Oxygen Supply",
        },
        {
          label: "Suction Apparatus",
          value: "Suction Apparatus",
        },
      ],
      selectionLoading: false,
      required: true,
      fieldClass: "col-span-2",
    },
  ] as ISchema[];
};

export const DepartmentSetupSchema = () => {
  return [
    {
      label: "Department Name",
      name: "departmentName",
      type: "selection",
      placeholder: "Enter department name",
      required: true,
      options: [
        { label: "Emergency Medicine", value: "Emergency Medicine" },
        { label: "General Medicine", value: "General Medicine" },
        { label: "General Surgery", value: "General Surgery" },
        { label: "Pediatrics", value: "Pediatrics" },
        {
          label: "Obstetrics & Gynecology (OB/GYN)",
          value: "Obstetrics & Gynecology (OB/GYN)",
        },
        { label: "Orthopedics", value: "Orthopedics" },
        { label: "Cardiology", value: "Cardiology" },
        { label: "Neurology", value: "Neurology" },
        { label: "Neurosurgery", value: "Neurosurgery" },
        { label: "Urology", value: "Urology" },
        { label: "Nephrology", value: "Nephrology" },
        { label: "Gastroenterology", value: "Gastroenterology" },
        { label: "Endocrinology", value: "Endocrinology" },
        { label: "Pulmonology", value: "Pulmonology" },
        { label: "Dermatology", value: "Dermatology" },
        { label: "Oncology", value: "Oncology" },
        {
          label: "ENT (Ear, Nose & Throat)",
          value: "ENT (Ear, Nose & Throat)",
        },
        { label: "Ophthalmology", value: "Ophthalmology" },
        { label: "Rheumatology", value: "Rheumatology" },
        { label: "Infectious Diseases", value: "Infectious Diseases" },
        {
          label: "Psychiatry / Mental Health",
          value: "Psychiatry / Mental Health",
        },
        { label: "Family Medicine", value: "Family Medicine" },
        { label: "Geriatrics", value: "Geriatrics" },
        { label: "Dental & Oral Surgery", value: "Dental & Oral Surgery" },
        {
          label: "Plastic & Reconstructive Surgery",
          value: "Plastic & Reconstructive Surgery",
        },
        { label: "Hematology", value: "Hematology" },
      ],
    },
    {
      label: "Centre of excellence",
      name: "isCenterOfExcellence",
      type: "switch",
      placeholder: "Choose centre of excellence",
      required: false,
    },
  ] as ISchema[];
};

export const vitalSignsSchema = ({
  doctorOptions,
  doctorLoading,
  onDoctorSearch,
  onDoctorClear,
  onDoctorSelect,
}: VitalSignsSchemaProps) => {
  const baseSchema: ISchema[] = [
    {
      name: "temperature",
      label: "Temperature",
      placeholder: "Enter reading",
      type: "number",
      required: true,
      inputMode: "decimal",
      rules: [
        {
          validator: (_, value) => {
            if (!value) return Promise.resolve();

            if (value < 30 || value > 45) {
              return Promise.reject(new Error("Must be between 30°C and 45°C"));
            }

            return Promise.resolve();
          },
        },
      ],
      addonType: "suffix",
      addonDefaultValue: "°C",
      addonOptions: [
        { label: "°C", value: "°C" },
        { label: "°F", value: "°F" },
      ],
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "temp_source",
      label: "Source",
      placeholder: "Select source",
      type: "selection",
      options: [
        { label: "Oral", value: "Oral" },
        { label: "Armpit (Axillary)", value: "Armpit (Axillary)" },
        { label: "Rectal", value: "Rectal" },
        { label: "Ear", value: "Ear" },
        { label: "Temporal Artery", value: "Temporal Artery" },
      ],
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "bloodPressure",
      label: "Blood Pressure",
      placeholder: "Enter reading (e.g. 120/80)",
      type: "text",
      suffix: "mmHg",
      inputMode: "numeric",
      rules: [
        {
          pattern: /^\d{2,3}\/\d{2,3}$/,
          message: "Enter blood pressure as systolic/diastolic",
        },
      ],
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "bloodPressure_source",
      label: "Source",
      placeholder: "Select source",
      type: "selection",
      options: [
        { label: "Left Arm", value: "Left Arm" },
        { label: "Right Arm", value: "Right Arm" },
        { label: "Left Wrist", value: "Left Wrist" },
        { label: "Right Wrist", value: "Right Wrist" },
        { label: "Thigh", value: "Thigh" },
      ],
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "pulse",
      label: "Pulse",
      placeholder: "Enter reading",
      type: "number",
      required: true,
      suffix: "bpm",
      inputMode: "numeric",
      rules: [
        {
          validator: (_, value) => {
            if (!value) return Promise.resolve();

            if (value < 30 || value > 220) {
              return Promise.reject(
                new Error("Pulse must be between 30 and 220 bpm")
              );
            }

            return Promise.resolve();
          },
        },
      ],
      fieldClass: "col-span-2",
    },
    {
      name: "weight",
      label: "Weight",
      placeholder: "Enter reading",
      type: "text",
      inputMode: "decimal",
      required: true,
      rules: [
        {
          pattern: /^\d{1,3}(\.\d{1,2})?$/,
          message: "Enter a valid weight (e.g. 70 or 70.5)",
        },
      ],
      addonType: "suffix",
      addonDefaultValue: "kg",
      addonOptions: [{ label: "kg", value: "kg" }],
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "height",
      label: "Height",
      placeholder: "Enter reading",
      type: "number",
      inputMode: "numeric",
      required: true,
      rules: [
        {
          pattern: /^\d{2,3}$/,
          message: "Enter height in centimeters (e.g. 170)",
        },
      ],
      addonType: "suffix",
      addonDefaultValue: "cm",
      addonOptions: [{ label: "cm", value: "cm" }],
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "bmi",
      label: "BMI",
      placeholder: "Enter reading",
      type: "number",
      required: true,
      fieldClass: "col-span-2",
      disabled: true,
    },
    {
      name: "headCircumference",
      label: "Head circumference",
      placeholder: "Enter reading",
      type: "text",
      suffix: "cm",
      inputMode: "numeric",
      required: false,
      rules: [
        {
          pattern: /^\d{2,3}(\.\d{1,2})?$/,
          message: "Enter a valid value in cm (e.g. 54 or 54.5)",
        },
      ],
      helpText: "For babies or in special cases",
    },
    {
      name: "waistSize",
      label: "Waist Size (cm)",
      placeholder: "Enter reading",
      type: "text",
      suffix: "cm",
      inputMode: "numeric",
      required: false,
      rules: [
        {
          pattern: /^\d{2,3}(\.\d{1,2})?$/,
          message: "Enter a valid value in cm (e.g. 80 or 80.5)",
        },
      ],
      helpText: "For babies or in special cases only",
    },
    {
      name: "nursesNote",
      label: "Nurse's Note",
      placeholder: "Enter additional notes here",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "reasonForVisit",
      label: "Reason for visit",
      placeholder: "Enter additional notes here",
      type: "textArea",
      required: false,
      fieldClass: "col-span-2",
    },
    {
      name: "forwardTo",
      label: "Forward To",
      placeholder: "Select doctor",
      type: "selection",
      options: doctorOptions,
      selectionLoading: doctorLoading,
      onSearch: onDoctorSearch,
      onClear: onDoctorClear,
      onSelect: onDoctorSelect,
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "priorityLevel",
      label: "Priority Level",
      placeholder: "Select priority level",
      type: "selection",
      options: priorityOptions,
      required: true,
      fieldClass: "col-span-2",
    },
  ];
  return baseSchema;
};
