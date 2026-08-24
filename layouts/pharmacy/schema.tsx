import { IOptions, ISchema } from "@/components/FormElements/types";
import { emergencyContactList } from "@/data/checkin-data";
// import { IOptions } from "@/interfaces/general";
import {
  NextOfKinProps,
  PatientRegistrationProps,
    //  PrescriberInfoSchemaProps,
    //  PrescriptionInfoSchemaProps
     } from "@/interfaces/pharmacy";

export const PrescriptionInfoSchema = (
  // countryOptions,
  // countryLoading,
  // statesOptions,
  // statesLoading,
  // type,
) => {
  const schema: ISchema[] = [
    {
      name: "patientName",
      label: "Patient Name",
      placeholder: "Select patient name",
      type: "selection",
      required: true,
      options: [
        { label: "John Doe", value: "John Doe" },
        { label: "Jane Doe", value: "Jane Doe" },
        { label: "Samuel Jackson", value: "Samuel Jackson" },
        { label: "Emily Blunt", value: "Emily Blunt" },
        { label: "Michael Smith", value: "Michael Smith" },
        { label: "Olivia Brown", value: "Olivia Brown" },
        { label: "Daniel Wilson", value: "Daniel Wilson" },
        { label: "Sophia Davis", value: "Sophia Davis" },
        { label: "James Taylor", value: "James Taylor" },
        { label: "Isabella Martinez", value: "Isabella Martinez" },
      ],
      selectionLoading: false,
    },
    {
      name: "dateOfBirth",
      label: "Patient Date of Birth",
      type: "date",
      placeholder: "Enter patient date of birth",
      required: true,
    },
    {
        name: "patientDrug",
        label: "Patient Drug",
        placeholder: "Enter patient drug",
        type: "selection",
        required: true,
        options: [
          { label: "Aspirin", value: "Aspirin" },
          { label: "Ibuprofen", value: "Ibuprofen" },
          { label: "Paracetamol", value: "Paracetamol" },
          { label: "Amoxicillin", value: "Amoxicillin" },
          { label: "Metformin", value: "Metformin" },
        ],
        selectionLoading: false,
    },
    {
        name: "form",
        label: "Form",
        placeholder: "Select form",
        type: "selection",
        required: true,
        options: [
          { label: "Tablet", value: "Tablet" },
          { label: "Capsule", value: "Capsule" },
          { label: "Liquid", value: "Liquid" },
        ],
        selectionLoading: false,
    },
    {
        name: "quantity",
        label: "Total Quantity",
        placeholder: "Enter total quantity",
        type: "number",
        required: true,
    },
    {
        name: "refillNumber",
        label: "Refill Number",
        placeholder: "Enter refill number",
        type: "number",
        required: true,
    },
    {
        name: "allowSubstitute",
        label: "Allow Substitute",
        placeholder: "Select allow substitute",
        type: "selection",
        required: true,
        options: [
          { label: "Yes", value: "Yes" },
          { label: "No", value: "No" },
        ],
        selectionLoading: false,
    },
    {
        name: "attachment",
        label: "Attachment",
        placeholder: "Upload attachment",
        type: "upload",
        required: false,
    },
    {
        name: "directionsForUse",
        label: "Directions for Use",
        placeholder: "Enter directions for use",
        type: "textArea",
        required: true,
    },
    {
      name: "next",
      label: "Next",
      type: "submitButton",
      required: false,
    },
    //  {
    //   name: "country",
    //   label: "Country",
    //   placeholder: "Select country",
    //   type: "selection",
    //   required: true,
    //   options: countryOptions,
    //   selectionLoading: countryLoading,
    // },
    // {
    //   name: "state",
    //   label: "State",
    //   placeholder: "Select state",
    //   type: "selection",
    //   required: true,
    //   options: statesOptions,
    //   selectionLoading: statesLoading,
    // },
    // {
    //   name: "occupation",
    //   label: "Occupation",
    //   placeholder: "Select occupation",
    //   type: "selection",
    //   required: true,
    //   options: occupationList,
    //   selectionLoading: false,
    // },
  ];

  return schema;
};

export const PrescriberInfoSchema = () => {
  const schema: ISchema[] = [
    {
      name: "prescriberName",
      label: "Prescriber Name",
      placeholder: "Enter prescriber name",
      type: "text",
      required: true,
    },
    {
      name: "prescriberLicenseNumber",
      label: "Prescriber License Number",
      placeholder: "Enter prescriber license number",
      type: "text",
      required: true,
    },
    {
      name: "prescriberPhoneNumber",
      label: "Prescriber Phone Number",
        placeholder: "Enter prescriber phone number",
        type: "phone",
        required: true,
    },
    {
        name: "dateOfPrescription",
        label: "Date of Prescription",
        type: "date",
        placeholder: "Enter date of prescription",
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

export interface AddMedicationSchemaProps {
  formOptions: IOptions[];
  formLoading: boolean;
}

export const AddMedicationSchema = () => {
  return [
    {
      label: "Name",
      name: "name",
      type: "text",
      placeholder: "Enter medication name",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Form",
      name: "formId",
      type: "selection",
      options: [
          { label: "Ointment", value: "Ointment" },
          { label: "Capsule", value: "Capsule" },
          { label: "Liquid", value: "Liquid" },
          { label: "Tablet", value: "Tablet" },
          { label: "Patches", value: "Patches" },
          { label: "Gummies", value: "Gummies" },
          { label: "Injections", value: "Injections" },
          { label: "Drops", value: "Drops" },
          { label: "Powder", value: "Powder" },
          { label: "Aerosol", value: "Aerosol" },
        ],
      placeholder: "Select form",
      required: true,
      selectionLoading: false,
      fieldClass: "col-span-1",
    },
    {
      label: "Store Location",
      name: "storeLocation",
      type: "text",
      placeholder: "Enter store location",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Price",
      name: "price",
      type: "number",
      placeholder: "0.00",
      prefix: "₦", 
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Quantity",
      name: "quantity",
      type: "number",
      placeholder: "Enter quantity",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Manufacturer",
      name: "manufacturer",
      type: "text",
      placeholder: "Enter manufacturer",
      required: false,
      fieldClass: "col-span-1",
    },
    {
      label: "NDC",
      name: "ndc",
      type: "text",
      placeholder: "Enter NDC",
      required: false,
      fieldClass: "col-span-1",
    },
    {
      label: "Date Expiry",
      name: "expiryDate",
      type: "date",
      allowFutureDate: true,
      placeholder: "DD/MM/YYYY",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Upload Image",
      name: "files",
      type: "upload", 
      placeholder: "Click to upload or drag and drop",
      subLabel: "Add the front back and Label of this medication that displays all information",
      // required: true,
      fieldClass: "col-span-1", 
    },
  ] as ISchema[]
};


export const PatientRegistrationSchema = ({
  genderOptions,
  genderLoading,
  maritalStatusOptions,
  maritalStatusLoading,
}: PatientRegistrationProps) => {
  return [
    {
      label: "Patient First Name",
      name: "firstName",
      type: "text",
      placeholder: "Enter Patient Name",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Last Name",
      name: "lastName",
      type: "text",
      placeholder: "Enter Patient Name",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Date of Birth",
      name: "dob",
      type: "date",
      placeholder: "DD/MM/YYYY",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Guardian's Full Name",
      name: "guardianName",
      type: "text",
      placeholder: "Enter Patient Name",
      required: false,
      fieldClass: "col-span-1",
    },
    {
      label: "Guardian's Phone Number",
      name: "guardianPhone",
      type: "number",
      placeholder: "Enter Phone Number",
      required: false,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Gender",
      name: "gender",
      type: "selection",
      options: genderOptions,
      selectionLoading: genderLoading,
      placeholder: "Select One",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Marital Status",
      name: "maritalStatus",
      type: "selection",
      options: maritalStatusOptions,
      selectionLoading: maritalStatusLoading,
      placeholder: "Select One",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Phone Number",
      name: "phone",
      type: "number",
      placeholder: "Enter Patient Phone Number",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Identification Number (NIN)",
      name: "nin",
      type: "number",
      placeholder: "Enter NIN",
      required: false,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Email Address",
      name: "email",
      type: "email",
      placeholder: "Enter Patient Email Address",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Patient Home Address",
      name: "address",
      type: "text",
      placeholder: "Enter Home Address",
      required: true,
      fieldClass: "col-span-1",   
    },
  ];
};


export const NextOfKinSchema = ({
  relationshipOptions,
  relationshipLoading,
}: NextOfKinProps) => {
  return [
    {
      label: "Name of Patient Next of Kin",
      name: "nokName",
      type: "text",
      placeholder: "Enter Next of Kin Full Name",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Relationship",
      name: "nokRelationship",
      type: "selection",
      options: relationshipOptions,
      selectionLoading: relationshipLoading,
      placeholder: "Select one",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Phone Number",
      name: "nokPhone",
      type: "number",
      placeholder: "Enter Patient Phone Number",
      required: true,
      fieldClass: "col-span-1",
    },
    
    {
      type: "header", 
      label: "Emergency contact Information",
      subLabel: "Patient Emergency Contact",
      fieldClass: "col-span-1 mt-4 mb-2",
    },
    
    {
      label: "Name",
      name: "emergencyName",
      type: "text",
      placeholder: "Name of emergency contact",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Phone Number",
      name: "emergencyPhone",
      type: "number",
      placeholder: "Enter Phone Number",
      required: true,
      fieldClass: "col-span-1",
    },
    {
      label: "Address",
      name: "emergencyAddress",
      type: "text",
      placeholder: "Enter Address",
      required: true,
      fieldClass: "col-span-1",
    },
  ];
};


export const MedicalHistorySchema = () => {
  return [
    {
      label: "Allergies",
      name: "allergies",
      type: "textarea", // Assuming your config supports textarea
      placeholder: "Write your reason",
      required: false,
      subLabel: "This is a note incase", // The text with the (i) icon
      fieldClass: "col-span-1",
    },
    {
      label: "Previous Surgeries",
      name: "surgeries",
      type: "textarea",
      placeholder: "Write your reason",
      required: false,
      subLabel: "Any chronic or significant past illnesses or diseases the patient has had (e.g., diabetes, hypertension, asthma).",
      fieldClass: "col-span-1",
    },
    {
      label: "Special Notes",
      name: "specialNotes",
      type: "textarea",
      placeholder: "Write a special note about the patient",
      required: false,
      subLabel: "This is a note incase",
      fieldClass: "col-span-1",
    },
  ];
};

export const NewMedicineRequestSchema = () => {
  const schema: ISchema[] = [
    {
      name: "pharmacyName",
      label: "",
      placeholder: "",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-2 hidden",
    },
    {
      name: "pharmacyAddress",
      label: "",
      placeholder: "",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden",
    },
    {
      name: "pharmacyNumber",
      label: "",
      placeholder: "",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden",
    },
    {
      name: "drugName",
      label: "DRUG NAME",
      placeholder: "Drug Name",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-2 hidden",
    },
    {
      name: "unitType",
      label: "TYPE",
      placeholder: "Drug Type",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden"
    },
    {
      name: "requiredQuantity",
      label: "REQ QUANTITY",
      placeholder: "Required Quantity",
      type: "number",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden"
    },
    {
      name: "manufacturer",
      label: "MANUFACTURER",
      placeholder: "Manufacturer Name",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden"
    },
    {
      name: "strength",
      label: "STRENGTH",
      placeholder: "Strength",
      type: "text",
      required: true,
      disabled: true,
      fieldClass: "col-span-1 hidden"
    },
    {
      name: "senderEmail",
      label: "From",
      placeholder: "Enter Pharmacy Email",
      type: "email",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "receiverEmail",
      label: "To",
      placeholder: "Enter Vendor Email",
      type: "email",
      required: true,
      fieldClass: "col-span-2",
    },
    {
      name: "mailSubject",
      label: "Subject",
        placeholder: "Enter mail subject",
        type: "text",
        required: true,
        fieldClass: "col-span-2",
    },
    {
        name: "mailBody",
        label: "Body",
        type: "textArea",
        placeholder: "Write your message here...",
        required: true,
        textAreaRow: 10,
        fieldClass: "col-span-2",
    },
    {
        name: "upload",
        label: "Upload Printed Order",
        type: "upload",
        required: false,
        textAreaRow: 10,
        fieldClass: "col-span-2",
    },
    {
      name: "next",
      label: "Order",
      type: "submitButton",
      required: false,
      fieldClass: "col-span-2",
    },
  ];

  return schema;
};