import createTicketSchemaForm from "./create-ticket-form-schema";
import React from "react";
import FormConfig from "@/components/FormElements/FormConfig";
import { Form, Modal } from "antd";

interface ICreateTicketCredentials {
  ticketName: string;
}

export default function CreateTicketModal({
  open,
  onOk,
  onCancel,
}: {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  const [form] = Form.useForm();
  const createTicketSchema = createTicketSchemaForm();

  const submitForm = async (values: ICreateTicketCredentials) => {
    console.log("values", values);
  };

  return (
    <Modal
      title={<p className="text-2xl font-semibold">Create Ticket</p>}
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={624}
      footer={null}
    >
      <p className="text-[#21212180] text-sm mb-6">
        Complete this form to register a new patient
      </p>
      <FormConfig
        form={form}
        schema={createTicketSchema}
        btnText="Create"
        onSubmit={submitForm}
      />
    </Modal>
  );
}
