import addBillingSchemaForm from "./add-billing-info-schema";
import React from "react";
import FormConfig from "@/components/FormElements/FormConfig";
import { Form, Modal } from "antd";

interface IAddBillingInfo {
  nameOnCard: string;
}

export default function AddBillingInfoModal({
  open,
  onOk,
  onCancel,
}: {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  const [form] = Form.useForm();
  const addBillingSchema = addBillingSchemaForm();

  const submitForm = async (values: IAddBillingInfo) => {
    console.log("values", values);
  };

  return (
    <Modal
      title={
        <div>
          <p className="text-#1D2129] text-[32px] leading-[28pxs] font-semibold">
            Add Your Billing Info
          </p>
          <p className="text-[#1D2129CC] text-sm leading-[16.8px] mt-2 font-normal">
            You will be charged on a monthly basis
          </p>
        </div>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={624}
      footer={null}
    >
      <div className="bg-[#F4F4F4] border border-[#0101011A] rounded-lg p-5 mt-2">
        <p className="text-sofia_dark text-2xl leading-[31.2px] font-semibold">
          Your Subscription
        </p>
        <div className="flex items-center justify-between mt-6 mb-3">
          <p className="text-sofia_dark text-xl leading-[26px] font-semibold">
            Enterprise Plus
          </p>
          <p className="text-sofia_dark text-xl leading-[26px] font-semibold">
            $32/month
          </p>
        </div>
        <p className="text-[#212121CC] leading-[20.8px] mb-4">Renews 12/8/24</p>
        <h5 className="text-[#1175C0] text-xl font-semibold">CHANGE PLAN</h5>
      </div>
      <p className="text-sofia_dark text-2xl leading-[31.2px] font-semibold mt-8 mb-6">
        Billing Information
      </p>
      <FormConfig
        form={form}
        schema={addBillingSchema}
        btnText="Pay $32.00 Now"
        onSubmit={submitForm}
      />
    </Modal>
  );
}
