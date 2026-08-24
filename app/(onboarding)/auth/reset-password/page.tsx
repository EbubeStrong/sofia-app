"use client";

import { useRouter } from "next/navigation";
import { Form } from "antd";
import { toast } from "sonner";

import FormConfig from "@/components/FormElements/FormConfig";
import { resetPasswordSchema } from "@/components/FormElements/schemas";
import { useResetPassword } from "@/hooks/use-client-fetchers";
import AuthWrapper from "@/components/Dashboard/AuthWrapper";

type ResetPasswordProps = {
  searchParams: {
    otp?: string;
  };
};

type FieldType = {
  resetNewPassword: string;
  resetConfirmPassword: string;
};

const ResetPasswordModule: React.FC<ResetPasswordProps> = ({
  searchParams,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();
  const otp = searchParams.otp as string;

  const { mutate: resetPassword, isPending: isResetingPassword } =
    useResetPassword();

  const handleResetPassword = (values: FieldType) => {
    const payload = {
      newPassword: values.resetNewPassword,
      confirmPassword: values.resetConfirmPassword,
      otp: otp,
    };
    resetPassword(payload, {
      onSuccess: () => {
        toast.success("Password reset successful, proceed to sign-in");
        router.push("/");
      },
    });
  };

  return (
    <AuthWrapper>
      <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-24">
        <h1 className="text-2xl lg:text-3xl text-[#101010] font-semibold text-center mb-2">
          Reset your password
        </h1>
        <p className="text-base text-[#212121]/80 font-medium text-center w-full max-w-full lg:max-w-[60%] my-0 mx-auto mb-6">
          To access your medical records, enter your new password and proceed to
          login.
        </p>
        <FormConfig
          form={form}
          schema={resetPasswordSchema}
          onSubmit={handleResetPassword}
          btnText="Update Password"
          btnLoading={isResetingPassword}
        />
      </div>
    </AuthWrapper>
  );
};

export default ResetPasswordModule;
