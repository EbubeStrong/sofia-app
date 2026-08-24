"use client";

import { toast } from "sonner";

import FormConfig from "@/components/FormElements/FormConfig";
import { forgotPasswordSchema } from "@/components/FormElements/schemas";
import AuthResetAction from "@/layouts/dashboard/AuthResetAction";
import { Form } from "antd";
import { useForgotPassword } from "@/hooks/use-client-fetchers";

type FieldType = {
  email: string;
};

const ForgotPasswordLayout = () => {
  const [form] = Form.useForm();

  const { mutate: forgotPassword, isPending: isForgettingPassword } =
    useForgotPassword();

  const handleForgotPassword = (values: FieldType) => {
    const payload = {
      email: values.email,
    };
    forgotPassword(payload, {
      onSuccess: () => {
        toast.success("OTP successfully sent to your mail box");
        form.resetFields();
      },
    });
  };

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-96px)] h-auto px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <h1 className="text-2xl lg:text-3xl text-[#101010] font-semibold text-center mb-2">
        Forgot Password
      </h1>
      <p className="text-base text-[#212121]/80 font-medium text-center w-full max-w-full lg:max-w-[100%] my-0 mx-auto mb-6">
        We have got you, enter your email address to reset your password.
      </p>
      <FormConfig
        form={form}
        schema={forgotPasswordSchema}
        onSubmit={handleForgotPassword}
        beforeBtn={
          <AuthResetAction
            description={"Remember your password?"}
            path={"/"}
            label={"Login"}
          />
        }
        btnText="Reset Password"
        btnLoading={isForgettingPassword}
      />
    </div>
  );
};

export default ForgotPasswordLayout;
