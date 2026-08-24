import { ISchema } from "@/components/FormElements/types";
import {
  ICountryOptions,
  IHospitalsOptions,
  IProfileSchemaProps,
} from "@/interfaces/general";

export interface Props {
  countryOptions: ICountryOptions[];
  countryLoading?: boolean;
  hospitalOptions?: IHospitalsOptions[];
  hospitalLoading?: boolean;
  statesOptions: ICountryOptions[];
  statesLoading?: boolean;
  onCustomAction: () => void;
  onHospitalSearch: (value: string) => void;
  onHospitalClear: () => void;
  onHospitalSelect: () => void;
}

export interface ReceptionFormProps {
  onCustomAction: () => void;
}

export const generalFormSchema = ({
  countryOptions,
  countryLoading,
  hospitalOptions,
  hospitalLoading,
  statesOptions,
  statesLoading,
  onCustomAction,
  onHospitalSearch,
  onHospitalClear,
  onHospitalSelect,
}: Props) => {
  const schema: ISchema[] = [
    {
      name: "st_country",
      label: "Country",
      placeholder: "Select country of practice",
      type: "selection",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      options: countryOptions,
      selectionLoading: countryLoading,
      disabled: true,
    },

    {
      name: "st_hospitalName",
      label: "Hospital Name",
      placeholder: "Select hospital name",
      type: "selection" as const,
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      options: hospitalOptions,
      selectionLoading: hospitalLoading,
      onSearch: onHospitalSearch,
      onClear: onHospitalClear,
      onSelect: onHospitalSelect,
      disabled: true,
    },
    {
      name: "st_email",
      label: "Hospital Email",
      type: "email",
      placeholder: "Enter email address",
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
      disabled: true,
    },
    {
      name: "st_state",
      label: "State",
      placeholder: "Select state of practice",
      type: "selection",
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
      options: statesOptions,
      selectionLoading: statesLoading,
      disabled: true,
    },
    {
      name: "st_tradeName",
      label: "Alternative Trade Name",
      type: "text",
      placeholder: "Enter alternative trade name",
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "st_phoneNumber",
      label: "Hospital Phone Number",
      type: "phone",
      placeholder: "Enter your phone number",
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "st_websiteUrl",
      label: "Website URL",
      type: "url",
      placeholder: "Enter website url - (https://www.example.com)",
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      label: "Password",
      name: "custom-password-action",
      type: "custom",
      placeholder: "Change Password",
      handleCustomAction: onCustomAction,
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "st_address",
      label: "Hospital Address",
      placeholder: "Enter your address",
      type: "textArea",
      required: false,
      fieldClass: "col-span-2",
    },
    {
      name: "Save Changes_settings",
      label: "Save Changes",
      type: "submitButton",
      required: false,
    },
  ];

  return schema;
};

export const professionalDetailSchema = ({
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
      name: "hospitalName",
      label: "Hospital/Clinic Name",
      placeholder: "Select hospital name",
      type: "selection",
      required: true,
      options: hospitalOptions,
      selectionLoading: hospitalLoading,
    },
    {
      name: "countryOfPractice",
      label: "Country of practice",
      placeholder: "Select country of practice",
      type: "selection",
      required: true,
      options: countryOptions,
      selectionLoading: countryLoading,
      disabled: true,
      helpText: "Auto-populated based on the hospital location",
    },
    {
      name: "stateOfPractice",
      label: "State of practice",
      placeholder: "Select state of practice",
      type: "text",
      required: true,
      disabled: true,
      helpText: "Auto-populated based on the hospital location",
    },
    {
      name: "doctorPracticeType",
      label: "Doctor’s practice type",
      placeholder: "Enter doctor practice type",
      type: "selection",
      required: false,
      options: practiceTypeOptions,
      selectionLoading: practiceTypeLoading,
    },
    {
      name: "doctorSpeciality",
      label: "Doctor’s speciality",
      placeholder: "Enter doctor speciality",
      type: "selection",
      required: false,
      options: specialityOptions,
      selectionLoading: specialityLoading,
      fieldClass: "col-span-1",
    },
  ];
  return schema;
};

export const generalPasswordResetSchema: ISchema[] = [
  {
    name: "currentPassword",
    label: "Current Password",
    placeholder: "Enter your current password",
    type: "password",
    required: true,
  },
  {
    name: "newPassword_settings",
    label: "New Password",
    placeholder: "Enter your new password",
    type: "password",
    required: true,
  },
  {
    name: "confirmPassword_settings",
    label: "Confirm Password",
    placeholder: "Confirm your new password",
    type: "password",
    required: true,
    dependencies: "newPassword_settings",
  },
];

export const basicFormSchema = ({ onCustomAction }: ReceptionFormProps) => {
  const schema: ISchema[] = [
    {
      name: "rc_firstName",
      label: "First Name",
      placeholder: "Enter first name",
      type: "text",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      disabled: false,
    },
    {
      name: "rc_lastName",
      label: "Last Name",
      placeholder: "Enter last name",
      type: "text",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      disabled: false,
    },
    {
      name: "rc_email",
      label: "Hospital Email",
      type: "email",
      placeholder: "Enter email address",
      required: true,
      fieldClass: "col-span-2 xl:col-span-1",
      disabled: true,
    },
    {
      label: "Password",
      name: "custom-password-action",
      type: "custom",
      placeholder: "Change Password",
      handleCustomAction: onCustomAction,
      required: false,
      fieldClass: "col-span-2 xl:col-span-1",
    },
    {
      name: "Save Changes_settings",
      label: "Save Changes",
      type: "submitButton",
      required: false,
    },
  ];

  return schema;
};
