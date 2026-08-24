import { useState } from "react";

//components
import editCustomerInfoSchemaForm from "./edit-customer-info-schema";
import FormConfig from "@/components/FormElements/FormConfig";
import SofiaModal from "@/components/SofiaModals";
import { Form } from "antd";

type IEditCustomerInfoCredentials = {
  firstName: string;
};

export default function EditCustomerInfoModal() {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const editCustomerSchema = editCustomerInfoSchemaForm();

  const submitForm = async (values: IEditCustomerInfoCredentials) => {
    console.log("values", values);
  };

  return (
    <div>
      <button
        onClick={() => setVisible(true)}
        className="text-sm md:text-base text-[#1175C0] font-medium border border-[#1175C0] rounded-lg py-2 px-[10px]"
      >
        Edit Account Information
      </button>

      <SofiaModal
        isModalOpen={visible}
        handleOk={() => setVisible(false)}
        handleCancel={() => setVisible(false)}
        width={600}
        title={
          <p className="text-2xl font-semibold">Edit Customer Information</p>
        }
        content={
          <div className="mt-6">
            <FormConfig
              form={form}
              schema={editCustomerSchema}
              btnText="Confirm"
              onSubmit={submitForm}
            />
          </div>
        }
      />
    </div>
  );
}
