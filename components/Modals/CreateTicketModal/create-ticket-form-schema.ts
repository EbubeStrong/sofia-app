import { ISchema } from "@/components/FormElements/types";

export default function createTicketSchemaForm(): ISchema[] {
  return [
      {
        label: "Ticket Name",
        name:"ticketName",
        type: "text",
        placeholder: "Payment",
        required: true
      },
      {
        label: "Description",
        name:"description",
        type: "text",
        placeholder: "eg issues the user complained about",
        required: true
      },
      {
        label: "Status",
        name:"status",
        type: "selection",
        options: [
          { label: 'Complete', value: 'Complete' },
          { label: 'Pending', value: 'Pending' },
          { label: 'Reading', value: 'Reading' },      
        ],
        placeholder: 'Select one',
        required: true,
      },
      {
        label: "Collected by",
        name:"collectedBy",
        type: "text",
        placeholder: "",
        required: true
      }
    ]
  }
