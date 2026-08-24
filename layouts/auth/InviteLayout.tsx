"use client";

import { Form } from "antd";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

//components
import FormConfig from "@/components/FormElements/FormConfig";
import { inviteSchema } from "@/components/FormElements/schemas";
import { AuthPolicyContent } from "@/components/AuthPolicyText";
import { useAcceptInvite } from "@/services/authenticate";
import { ROUTE_PATH } from "@/utils/constants";
import { HospitalByIdResponse } from "@/interfaces/general";

type TInviteProps = {
  inviteId: string;
  emailParam: string;
  hospitals: HospitalByIdResponse["data"];
};

type FieldProps = {
  invitePassword: string;
};

const InviteLayout: React.FC<TInviteProps> = ({
  inviteId,
  emailParam,
  hospitals,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { mutate: acceptInvite, isPending: isAcceptingInvite } =
    useAcceptInvite();

  const handleAcceptInvite = (values: FieldProps) => {
    const payload = {
      token: inviteId,
      password: values.invitePassword,
      confirmPassword: values.invitePassword,
    };

    acceptInvite(
      { body: payload },
      {
        onSuccess: () => {
          toast.success(
            "Invitation accepted successfully. Proceed to login to access your profile"
          );
          router.push(ROUTE_PATH.LOGIN);
          form.resetFields();
        },
      }
    );
  };

  return (
    <div className="flex flex-col xl:justify-center bg-white w-full xl:min-h-[calc(100vh-48px)] h-auto px-5 py-8 lg:px-16 lg:py-10 xl:py-24">
      <div className="mb-6">
        <h1 className="text-2xl lg:text-3xl text-[#101010] font-semibold text-start mb-2">
          You&apos;ve been invited to join {hospitals?.hospitalName || "---"} on
          Sofiamatics
        </h1>
        <p className="text-base text-[#666666] font-normal text-left">
          Jump right into Sofia and start collaboratiing.
        </p>
      </div>

      <div className="mb-6">
        <p className="text-sm text-[#111111]">
          You&apos;re accepting an invite sent to
        </p>
        <p className="text-lg text-[#111111] font-semibold">
          {emailParam ?? "---"}
        </p>
      </div>

      <p className="mb-6 text-base text-[#666666] font-normal">
        Set a password to complete and accept invite
      </p>

      <FormConfig
        formName="invite-form"
        form={form}
        schema={inviteSchema}
        onSubmit={handleAcceptInvite}
        afterBtn={<AuthPolicyContent text="accept invite" />}
        btnText="Accept Invite"
        btnLoading={isAcceptingInvite}
      />
    </div>
  );
};

export default InviteLayout;
