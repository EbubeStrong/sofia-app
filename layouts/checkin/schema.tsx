import { ISchema } from "@/components/FormElements/types";
import {
  activityOptions,
  ALLERGY_OPTIONS,
  DRUG_CONDITION_OPTIONS,
  emergencyContactList,
  eventTypeOptions,
  occupationList,
  priorityOptions,
  SEVERITY_OPTIONS,
  visitStatusOption,
} from "@/data/checkin-data";
import {
  AllergiesSchemaProps,
  InsuranceSchemaProps,
  PersonalInfoSchemaProps,
} from "@/interfaces/checkin";

export const PersonalInfoSchema = ({
  countryOptions,
  countryLoading,
  statesOptions,
  statesLoading,
  type,
}: PersonalInfoSchemaProps) => {
  const schema: ISchema[] = [
    {
      label: "First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter your first name",
      required: true,
    },
    {
      label: "Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter your last name",
      required: true,
    },
    {
      label: "Middle Name",
      name: "middleName",
      type: "text",
      placeholder: "Enter your middle name",
      required: false,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter your email",
      required: true,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "phone",
      placeholder: "Enter your middle name",
      required: true,
    },
    {
      name: "gender",
      label: "Gender",
      placeholder: "Select gender",
      type: "selection",
      required: true,
      options: [
        { label: "Male", value: "Male" },
        { label: "Female", value: "Female" },
      ],
      selectionLoading: false,
    },
    {
      name: "maritalStatus",
      label: "Marital Status",
      placeholder: "Select marital status",
      type: "selection",
      required: true,
      options: [
        { label: "Single", value: "Single" },
        { label: "Married", value: "Married" },
        { label: "Divorced", value: "Divorced" },
        { label: "Widowed", value: "Widowed" },
      ],
      selectionLoading: false,
    },
    {
      name: "dateOfBirth",
      label: "Date of Birth",
      type: "date",
      placeholder: "Enter patient date of birth",
      required: true,
    },
    {
      name: "address",
      label: "Address",
      placeholder: "Enter your address",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "country",
      label: "Country",
      placeholder: "Select country",
      type: "selection",
      required: true,
      options: countryOptions,
      selectionLoading: countryLoading,
    },
    {
      name: "state",
      label: "State",
      placeholder: "Select state",
      type: "selection",
      required: true,
      options: statesOptions,
      selectionLoading: statesLoading,
    },
    {
      name: "occupation",
      label: "Occupation",
      placeholder: "Select occupation",
      type: "selection",
      required: true,
      options: occupationList,
      selectionLoading: false,
    },
    {
      name: "next",
      label: type === "update" ? "Save" : "Next",
      type: "submitButton",
      required: false,
    },
  ];

  return schema;
};

export const InsuranceSchema = ({
  insuranceOptions,
  insuranceLoading,
  onInsuranceSearch,
  onInsuranceClear,
  onInsuranceSelect,
}: InsuranceSchemaProps) => {
  const schema: ISchema[] = [
    {
      name: "insuranceProvider",
      label: "Insurance Provider",
      placeholder: "Select insurance provider",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: insuranceOptions,
      selectionLoading: insuranceLoading,
      onSearch: onInsuranceSearch,
      onClear: onInsuranceClear,
      onSelect: onInsuranceSelect,
    },
    {
      name: "enroleeId",
      label: "Enrolee ID",
      placeholder: "Enter enrolee ID",
      type: "text",
      required: true,
    },
  ];

  return schema;
};

export const EmergencyContactSchema = () => {
  const schema: ISchema[] = [
    {
      label: "Contact Name",
      name: "contactName",
      type: "text",
      placeholder: "Enter your contact name",
      required: true,
    },
    {
      name: "relationship",
      label: "Relationship",
      placeholder: "Select relationship",
      type: "selection",
      required: true,
      options: emergencyContactList,
      selectionLoading: false,
    },
    {
      label: "Phone Number",
      name: "phoneNumber",
      type: "phone",
      placeholder: "Enter your middle name",
      required: true,
    },
  ];

  return schema;
};

export const AllergiesSchema = () => {
  const schema: ISchema[] = [
    {
      name: "allergiesType",
      label: "Type",
      placeholder: "Select types of allergy",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: ALLERGY_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "severity",
      label: "Severity",
      placeholder: "Select Severity",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: SEVERITY_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "drugCondition",
      label: "Condition",
      placeholder: "Select Condition",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: DRUG_CONDITION_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "agent",
      label: "Agent",
      placeholder: "E.g Migraine",
      type: "text",
      required: true,
    },
    {
      name: "reactions",
      label: "Reactions",
      placeholder: "For descriptions, reasoning, differentials",
      type: "textArea",
      required: true,
    },
    {
      name: "patientInstructions",
      label: "Patient Instructions",
      placeholder: "For descriptions, reasoning, differentials",
      type: "textArea",
      required: true,
    },
  ];

  return schema;
};

export const VaccinationSchema = () => {
  const schema: ISchema[] = [
    {
      name: "vaccine",
      label: "Vaccine",
      placeholder: "Select Severity",
      type: "selection",
      required: true,
      fieldClass: "col-span-2",
      options: SEVERITY_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "diagnosis",
      label: "Diagnosis",
      placeholder: "E.g Migraine",
      type: "text",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "doses",
      label: "Doses",
      placeholder: "Select Condition",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: DRUG_CONDITION_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "unit",
      label: "Unit",
      placeholder: "Select Condition",
      type: "multiSelection",
      required: true,
      fieldClass: "col-span-2",
      options: DRUG_CONDITION_OPTIONS,
      selectionLoading: false,
    },
    {
      name: "administeredDate",
      label: "Date Administered",
      placeholder: "DATE",
      fieldClass: "col-span-1",
      type: "date",
      required: true,
    },
    {
      name: "scheduledDate",
      label: "Scheduled Date",
      placeholder: "DATE",
      fieldClass: "col-span-1",
      type: "date",
      required: true,
    },
    {
  name: "patientConsent",
  label: "Patient Consent",
  type: "radioGroup",
  required: true,
  fieldClass: "col-span-2", 
  options: [
    {
      label: "Confirmed by patient",
      value: "patient",
    },
    {
      label: "Confirmed by medical proxy",
      value: "proxy",
    },
  ],
},
    {
      name: "additionalNotes",
      label: "Additional Notes",
      placeholder: "For descriptions, reasoning, differentials",
      type: "textArea",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "administeredBy",
      label: "Administered By",
      placeholder: "Enter Vaccination Administer name",
      type: "text",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "orderedBy",
      label: "Ordered By",
      placeholder: "Enter Order name",
      type: "text",
      required: true,
      fieldClass: "col-span-2",
    },
    {
  name: "samePersonnelToAdminister",
  label: "Same personnel to administer",
  type: "checkbox",
  required: false,
  fieldClass: "col-span-2",
    },
  ];

  return schema;
};



export const NewCheckinSchema = () => {
  const schema: ISchema[] = [
    {
      label: "Patient Name",
      name: "patientName",
      type: "text",
      placeholder: "Enter your patient name",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      disabled: true,
    },
    {
      name: "activity",
      label: "Activity",
      placeholder: "Select activity",
      type: "selection",
      required: true,
      options: activityOptions,
      selectionLoading: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "eventType",
      label: "Event Type",
      placeholder: "Select event type",
      type: "selection",
      required: true,
      options: eventTypeOptions,
      selectionLoading: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "priority",
      label: "Priority",
      placeholder: "Select priority",
      type: "selection",
      required: true,
      options: priorityOptions,
      selectionLoading: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "forwardTo",
      label: "Forward To",
      placeholder: "Select forward to",
      type: "selection",
      required: true,
      options: visitStatusOption,
      selectionLoading: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      label: "Additional Information",
      name: "additionalInfo",
      type: "textArea",
      placeholder: "Add additional information to the next department",
      required: false,
      fieldClass: "col-span-2 xl:col-span-2",
      helpText: "Detailed additional information",
    },
  ];

  return schema;
};
