import { ISchema } from "@/components/FormElements/types";

export default function editCustomerInfoSchemaForm(): ISchema[] {
  return [
      {
        label: "First Name",
        name:"firstName",
        type: "text",
        placeholder: "Enter your first name",
        required: true
      },
      {
        label: "Last Name",
        name:"lastName",
        type: "text",
        placeholder: "Enter your last name",
        required: true
      },
      {
        label: "Business Name",
        name:"businessName",
        type: "text",
        placeholder: "Enter your business name",
        required: true
      },
      {
        label: "User",
        name:"user",
        type: "text",
        placeholder: "Enter your user name",
        required: true
      },
      {
        label: "Company Size",
        name:"companySize",
        type: "text",
        placeholder: "Enter company size",
        required: true
      },
      {
        label: "Business Address",
        name:"businessAddress",
        type: "text",
        placeholder: "Enter business address",
        required: true
      },
      {
        label: "Email",
        name: "email",
        placeholder: "Enter your password",
        type: 'text',    
        required: true
      }
    ]
}
