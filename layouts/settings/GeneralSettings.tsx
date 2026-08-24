"use client";

import { useState } from "react";
// import { Form } from "antd";
// import dayjs from "dayjs";
// import { toast } from "sonner";
// import type { RcFile } from "antd/es/upload";
// import { RxVideo } from "react-icons/rx";

// import { generalFormSchema } from "@/app/(dashboard)/settings/general/general-form-schema";
// import FormConfig from "@/components/FormElements/FormConfig";
// import FormManualUpload from "@/components/FormElements/FormManualUpload";
// import { IDoctorResponse } from "@/interfaces/doctors";
// import {
//   useCompleteProfile,
//   useFetchDoctorProfile,
// } from "@/hooks/use-client-fetchers";

// import { invalidateQuery } from "@/config/query-client";
// import { queryKeys } from "@/utils/queryKeys";
import ChangePasswordForm from "./ChangePassword";

// type TSettingProps = {
//   // doctorProfile: IDoctorResponse["data"];
//   // doctorId: string;
// };

// type IGeneralCredentials = {
//   email: string;
//   firstName: string;
//   lastName: string;
//   bio: string;
// };

// const generalInfo = (data: IDoctorResponse["data"]) => [
//   {
//     label: "User ID",
//     value: data?.id || "---",
//   },
//   {
//     label: "Date Joined",
//     value: data?.createdAt
//       ? dayjs(data?.createdAt).format("MMMM D, YYYY")
//       : "---",
//   },
//   {
//     label: "Folio Number",
//     value: data?.folioNumber || "---",
//   },
//   {
//     label: "Practice Type",
//     value: data?.practiceType || "---",
//   },
// ];

export default function GeneralSettingsModule(
  {
    // doctorProfile,
    // doctorId,
  }
) {
  // const [form] = Form.useForm();

  // const { data: fetchDoctorProfile } = useFetchDoctorProfile(
  //   doctorId,
  //   doctorProfile
  // );

  // states
  const [openPassword, setOpenPassword] = useState(false);

  // const [fileObj, setFileObj] = useState<RcFile | undefined>(undefined);
  // const [fileUrl, setFileUrl] = useState<string>("");

  // const { mutate: completeProfile, isPending: isCompletingProfile } =
  //   useCompleteProfile(doctorId);

  // useEffect(() => {
  //   form.setFieldsValue({
  //     email: doctorProfile?.email ?? "",
  //     firstName: doctorProfile?.firstName ?? "",
  //     lastName: doctorProfile?.lastName ?? "",
  //     bio: doctorProfile?.bio ?? "",
  //   });
  // }, [
  //   doctorProfile?.bio,
  //   doctorProfile?.email,
  //   doctorProfile?.firstName,
  //   doctorProfile?.lastName,
  //   form,
  // ]);

  // const handleOpenPassword = () => {
  //   setOpenPassword(true);
  // };

  // const handleProfileDetails = async (values: IGeneralCredentials) => {
  //   const formData = new FormData();

  //   formData.append("firstName", String(values.firstName));
  //   formData.append("lastName", String(values.lastName));
  //   formData.append("email", String(values.email));

  //   if (values.bio) {
  //     formData.append("bio", String(values.bio));
  //   }

  //   if (fileObj) {
  //     formData.append("fileUpload", fileObj);
  //   }

  //   // completeProfile(formData, {
  //   //   onSuccess: () => {
  //   //     toast.success("User profile updated successfully");
  //   //     invalidateQuery(queryKeys.doctors.profile);
  //   //   },
  //   // });
  // };

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-title text-lg md:text-2xl font-semibold leading-relaxed">
          Personal Details
        </h1>
        <p className="text-[#101010B2] text-sm">Manage user information</p>
      </div>

      <div className="p-3 bg-[#F3F7F8] rounded-md grid grid-cols-2 gap-3">
        {[1]?.map((item, index) => (
          <div key={index}>
            <p className="text-sm text-[#212121]/80 font-normal">
              {"item?.label"}
            </p>
            <p className="text-base text-[#212121]/80 font-medium">
              {"item?.value"}
            </p>
          </div>
        ))}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        {/* <div>
          {fileUrl ? (
            <video
              controls
              src={fileUrl}
              className="w-[200px] md:w-[300px] h-auto rounded-md border"
            />
          ) : (
            <div className="w-full md:w-[300px] h-[175px] flex items-center justify-center bg-gray-100 rounded-md">
              <div className="text-center">
                <div className="my-0 mx-auto w-fit">
                  <RxVideo className="text-xl" />
                </div>
                <p className="text-base text-[#212121]">No video preview</p>
              </div>
            </div>
          )}
        </div> */}

        <div className="flex flex-col justify-between">
          <div className="mb-4 md:mb-0">
            <p className="text-lg text-[#212121] font-semibold">Video</p>
            <p className="text-base font-normal text-[#101010B2]">
              This is your professional video - it is optional but recommended
            </p>
          </div>
          {/* <FormManualUpload setFileObj={setFileObj} setFileUrl={setFileUrl} /> */}
        </div>
      </div>

      {/* <FormConfig
        form={form}
        schema={generalFormSchema(handleOpenPassword)}
        onSubmit={handleProfileDetails}
        twClassStyle="grid grid-cols-1 md:grid-cols-2 gap-x-4"
        btnLoading={false}
      /> */}

      <ChangePasswordForm
        openPassword={openPassword}
        setOpenPassword={setOpenPassword}
      />
    </div>
  );
}
