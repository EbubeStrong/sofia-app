"use client";

import { useEffect, useState } from "react";
import { Form } from "antd";
import { toast } from "sonner";
import dayjs from "dayjs";

import { basicFormSchema } from "@/app/(dashboard)/settings/general/general-form-schema";
import FormConfig from "@/components/FormElements/FormConfig";
import { invalidateQuery } from "@/config/query-client";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import NursePasswordForm from "./NursePasswordForm";
import { useNursesProfile, useUpdateNurseProfile } from "@/services/nurses";

interface NurseDetailsProps {
  role: string;
}

type TFieldProps = {
  rc_firstName: string;
  rc_lastName: string;
  rc_email: string;
};

const NurseBasicDetails: React.FC<NurseDetailsProps> = ({ role }) => {
  const [form] = Form.useForm();

  const [openPassword, setOpenPassword] = useState(false);

  const {
    data: profile,
    isSuccess: isProfileSuccess,
    isFetching: isFetchingProfile,
  } = useNursesProfile();

  const { mutate, isPending } = useUpdateNurseProfile();

  const details = [
    {
      title: "User ID",
      desc: profile?.nurseId ?? "---",
    },
    {
      title: "Date Joined",
      desc: profile?.createdAt
        ? dayjs(profile?.createdAt).format("MMM DD, YYYY h:mm a")
        : "---",
    },
    {
      title: "Last Login Date",
      desc: profile?.lastLoginAt
        ? dayjs(profile?.lastLoginAt).format("MMM DD, YYYY h:mm a")
        : "---",
    },
    {
      title: "Role",
      desc: profile?.isLead ? `Lead ${role}` : role,
    },
  ];

  useEffect(() => {
    if (isProfileSuccess && profile) {
      form.setFieldsValue({
        rc_firstName: profile?.firstName ?? "",
        rc_lastName: profile?.lastName ?? "",
        rc_email: profile?.email ?? "",
      });
    }
  }, [isProfileSuccess, profile, form]);

  const handleUpdateProfile = async (values: TFieldProps) => {
    const payload = {
      firstName: values.rc_firstName,
      lastName: values.rc_lastName,
    };
    mutate(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Profile updated successfully");
          invalidateQuery(["nurse_profile"]);
          form.resetFields();
        },
      }
    );
  };

  if (isFetchingProfile) {
    return <ComponentLoader label="Loading basic info..." />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-lg md:text-2xl font-semibold leading-relaxed">
          Basic Information
        </h1>
        <p className="text-[#101010B2] text-sm">Manage user information</p>
      </div>

      <div className="grid grid-cols-2 gap-y-4 gap-x-2 bg-[#F3F7F8] border rounded-md p-2 md:p-4">
        {details.map((d) => (
          <div key={d.title}>
            <p className="text-sm text-[#101010]/70">{d.title}</p>
            <p className="text-base text-[#101010] font-medium">{d.desc}</p>
          </div>
        ))}
      </div>

      <div className="p-2 md:p-4 bg-white border rounded-md">
        <FormConfig
          form={form}
          schema={basicFormSchema({
            onCustomAction: () => setOpenPassword(true),
          })}
          onSubmit={handleUpdateProfile}
          twClassStyle="grid grid-cols-1 md:grid-cols-2 gap-x-4"
          btnLoading={isPending}
        />
      </div>

      <NursePasswordForm
        openPassword={openPassword}
        setOpenPassword={setOpenPassword}
      />
    </div>
  );
};

export default NurseBasicDetails;
