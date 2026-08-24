import FormConfig from "@/components/FormElements/FormConfig";
import { makeRequestSchema } from "@/components/FormElements/schemas";
import { Form } from "antd";

interface MakeRequestProps {
  updateStepStatus: (stepId: number, status?: "done" | "failed") => void;
}

interface FieldType {
  orderBy: string;
}

const MakeRequestForm: React.FC<MakeRequestProps> = ({ updateStepStatus }) => {
  const [form] = Form.useForm();

  const handleMakeRequest = (values: FieldType) => {
    if (values) {
      // Simulate a successful request
      updateStepStatus(1, "done");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h2 className="text-lg xl:text-xl text-[#010101] font-semibold">
          Make Request
        </h2>
        <p className="text-sm xl:text-base text-[#010101] font-medium">
          Enter the Patient ID to request access to their medical records.
        </p>
      </div>

      <div>
        <p className="uppercase text-[#101010]/50 text-sm">Requesting Doctor</p>
        <p className="text-base text-[#101010] font-medium">Joshua Owolabi</p>
      </div>

      <FormConfig
        form={form}
        schema={makeRequestSchema}
        onSubmit={handleMakeRequest}
      />
    </div>
  );
};

export default MakeRequestForm;
