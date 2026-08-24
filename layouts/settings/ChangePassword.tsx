"use client";

import React from "react";
import { Form } from "antd";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import SofiaDrawers from "@/components/Drawers";
import FormConfig from "@/components/FormElements/FormConfig";
import { generalPasswordResetSchema } from "@/app/(dashboard)/settings/general/general-form-schema";
import { useChangePassword } from "@/services/hospital";

type TChangePasswordProps = {
  openPassword: boolean;
  setOpenPassword: React.Dispatch<React.SetStateAction<boolean>>;
};

type TFormProps = {
  currentPassword: string;
  newPassword_settings: string;
  confirmPassword_settings: string;
};

const ChangePasswordForm: React.FC<TChangePasswordProps> = ({
  openPassword,
  setOpenPassword,
}) => {
  const [form] = Form.useForm();
  const router = useRouter();

  const { mutate: changePassword, isPending: isChangingPassword } =
    useChangePassword();

  const handlePasswordChange = (values: TFormProps) => {
    const payload = {
      oldPassword: values.currentPassword,
      newPassword: values.newPassword_settings,
      confirmPassword: values.confirmPassword_settings,
    };
    changePassword(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Password updated successful");
          form.resetFields();
          setOpenPassword(false);
          router.push(`/`);
          return;
        },
      }
    );
  };

  return (
    <SofiaDrawers
      title={<span className="text-xl">Change your Password</span>}
      placement="right"
      open={openPassword}
      onClose={() => setOpenPassword(false)}
      width={500}
      maskClosable={true}
      zIndex={9999}
    >
      <FormConfig
        form={form}
        schema={generalPasswordResetSchema}
        onSubmit={handlePasswordChange}
        btnText="Change Password"
        btnLoading={isChangingPassword}
      />
    </SofiaDrawers>
  );
};

export default ChangePasswordForm;
