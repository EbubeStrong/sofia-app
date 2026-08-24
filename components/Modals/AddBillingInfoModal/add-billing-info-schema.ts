import { ISchema } from "@/components/FormElements/types"


export default function addBillingSchemaForm(): ISchema[] {
  return [
      {
        label: "Ticket Name",
        name: "nameOnCard",
        type: "text",
        placeholder: "Payment",
        required: true,      
      },
      {
        label: "Description",
        name: "description",
        type: "text",
        placeholder: "eg issues the user complained about",
        required: true,      
      },
      {
        label: "Country",
        name: "country",
        type: "selection",     
        options: [
          { label: 'Complete', value: 'Complete' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Reading', value: 'Reading' },      
        ], 
        placeholder: 'Select a country', 
        required: true,
      },
      {
        label: "Collected by",
        name: "collectedBy",
        placeholder: "",
        required: true,     
        type: "text",
    
      }
    ] 
}
