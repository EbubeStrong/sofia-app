"use client";
import { Button, Input, TabsProps } from "antd";
import { ArrowLeftOutlined, FilePdfOutlined } from "@ant-design/icons";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { mockReviewPatients } from "./utils/types";
import { Suspense, useState } from "react";
import SofiaTabs from "../SofiaTabs";

const ReviewPatientVitalSigns = ({ patientId }: { patientId: string }) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);

     const [activeKey, setActiveKey] = useState("visit-details");
    
      const handleQueueChange = (key: string) => {
        setActiveKey(key);
        params.set("q", key);
        router.replace(`${pathname}?${params.toString()}`, {
          scroll: false,
        });
      };

    const patient = mockReviewPatients.find(
        (p) => p.patientId === patientId
    );

    if (!patient) {
        return <div>Patient not found</div>;
    }

    const renderTabsContent = () => {
    return (
      <Suspense>
        {activeKey === "vital-signs" ? (
          <div className="bg-[#F3F7F8] w-full rounded-lg p-10">

                {/* Header */}
                <div className="flex justify-between items-start mb-4">
                    <h3 className="font-semibold text-lg text-[#101010] text-[20px]">Vitals Summary</h3>
                    <div className="text-left flex flex-col gap-2 w-[355px]">
                        <span className="text-sm font-medium text-[#212121] block">Forwarded to</span>
                        <span className="text-[18px] font-medium text-[#212121]">{patient.forwardedTo}</span>
                    </div>
                </div>

                {/* WHITE CARD 1: Main Vitals */}
                <div className="bg-white p-6 rounded-md shadow-sm border-gray-100 mb-4">
                    <div className="grid grid-cols-1 md:w-[546px] gap-y-6 gap-x-4">
                        {/* Temp */}
                        <div className="flex justify-between">
                            <div className="w-full">
                                <p className="text-[14px] uppercase text-[#212121CC] font-medium mb-1">
                                    Temperature
                                </p>
                                <p className="text-sm font-normal text-gray-900">{patient.vitals.temperature}</p>
                            </div>

                            <div className="flex justify-between flex-col w-full">
                                <p className="text-xs uppercase text-[#212121CC] mt-0.5 ">Source</p>
                                <p className="text-[#101010] text-sm font-libre_franklin">Oral</p>
                            </div>
                        </div>

                        {/* BP */}
                        <div className="flex justify-between">
                            <div className="w-full">
                                <p className="text-[14px] uppercase text-[#212121CC] font-medium mb-1">
                                    Blood Pressure
                                </p>
                                <p className="text-sm font-normal text-gray-900">{patient.vitals.bloodPressure}</p>
                            </div>

                            <div className="flex justify-between flex-col w-full">
                                <p className="text-xs uppercase text-[#212121CC] mt-0.5 ">Source</p>
                                <p className="text-[#101010] text-sm font-libre_franklin">Oral</p>
                            </div>
                        </div>

                        {/* Pulse */}
                        <div className="flex justify-between">
                            <div className="w-full">
                                <p className="text-[14px] uppercase text-[#212121CC] font-medium mb-1">
                                    Pulse (BPM)
                                </p>
                                <p className="text-sm font-normal text-gray-900">{patient.vitals.pulse}</p>
                            </div>

                            {/* Respiratory */}
                            <div className="w-full">
                                <p className="text-[14px] uppercase text-[#212121CC] font-medium mb-1">
                                    Respiratory (BPM)
                                </p>
                                <p className="text-sm font-normal text-gray-900">{patient.vitals.respiratoryRate}</p>
                            </div>
                        </div>
                    </div>

                    <p className="mt-6 text-[16px] text-[#101010B2] font-libre_franklin">
                        Collected by {patient.vitals.collectedBy}
                    </p>
                </div>

                <div className="bg-white p-6 rounded-md shadow-sm border border-gray-100 mb-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="col-span-2 md:col-span-4">
                            <p className="text-[14px] text-[#212121CC] font-medium uppercase mb-1">BMI</p>
                            <p className="text-sm font-normal text-[#101010]">75</p>
                        </div>
                        <div>
                            <p className="text-[14px] text-[#212121CC] font-medium uppercase mb-1">Height</p>
                            <p className="text-sm font-normal text-[#101010]">75</p>
                        </div>
                        <div>
                            <p className="text-[14px] text-[#212121CC] font-medium uppercase mb-1">Weight (LB)</p>
                            <p className="text-sm font-normal text-[#101010]">5&apos;7</p>
                        </div>
                    </div>
                </div>

                {/* 4. Notes Inputs */}
                <div className="space-y-6 mb-6">
                    <div>
                        <label className="text-sm font-medium text-[#212121CC] mb-2 block">Nurses Note</label>
                        <Input.TextArea
                            rows={3}
                            className="!bg-white !border-gray-200 !rounded-md"
                            placeholder="Enter any additional information for doctor&apos;s here"
                        />
                    </div>

                    <div>
                        <label className="text-xs font-medium text-[#212121CC] mb-2 block">Reason for visit</label>
                        
                        <Input.TextArea
                            rows={3}
                            className="!bg-white !border-gray-200 !rounded-md"
                            placeholder="Enter any additional information for doctor&apos;s here"
                        />
                    </div>
                </div>

                {/* 5. Files Uploaded - Card Style */}
                <div>
                    <label className="text-xs font-medium text-[#212121CC] mb-2 block">File Uploaded</label>
                    <div className="space-y-2">
                        {patient.files.map((file) => (
                            <div key={file.name} className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-md w-full md:w-1/2">
                                {/* Icon Box */}
                                <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center">
                                    <FilePdfOutlined className="text-lg" />
                                </div>
                                {/* File Details */}
                                <div className="flex flex-col">
                                    <span className="text-xs font-medium text-gray-800">{file.name}</span>
                                    <span className="text-[14px] text-[#212121]">{file.size}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        ) : (
          <div className="p-4 w-full">Visit Details Content for {patient.name}</div>
        )}
      </Suspense>
    );
  };

    const items: TabsProps["items"] = [
        {
          key: "visit-details",
          label: "Visit Details",
          children: renderTabsContent(),
        },
        {
          key: "vital-signs",
          label: "Vital Signs",
          children: renderTabsContent(),
        },
      ];
    

    return (
        <div className="flex flex-col gap-6 bg-white p-6 rounded-lg">
            <div className="space-y-3">
                {/* Back */}
                <Button
                    onClick={() => router.back()}
                    className="flex items-center !w-[71px] !border-none !shadow-none gap-2 !font-semibold !text-[#212121] !font-libre_franklin"
                >
                    <ArrowLeftOutlined className="font-semibold" /> Back
                </Button>

                {/* Header */}
                <div>
                    <h1 className="text-xl md:text-[23px] font-medium mb-3 text-[#101010]">Visit Information</h1>
                    <p className="text-sm text-[#101010B2] font-libre_franklin">
                        Search for existing patients or register new ones to begin their visit
                    </p>
                </div>
            </div>

            {/* 1. Current Patient Header */}
            <div className="bg-[#F3F7F8] rounded-lg p-6">
                <h3 className="font-medium text-base text-gray-800 mb-4">Current Patient</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Patient Name with High Tag */}
                    <div>
                        <div className="flex items-center justify-between gap-3 mb-1">
                            <p className="text-[14px] text-[#212121]  font-medium font-libre_franklin md:max-w-[150px] md:w-full">
                                Patient&apos;s Name
                            </p>
                            <div className="w-full">
                                <span className="px-5 text-xs border border-[#D91F1180] text-[#D91F1180] bg-[#FCF3F2] rounded-full">
                                    High
                                </span>
                            </div>
                        </div>
                        <p className="text-[18px] font-libre_franklin font-medium text-[#212121]">{patient.name}</p>
                    </div>

                    {/* DOB */}
                    <div>
                        <p className="text-[14px] text-[#212121] font-medium mb-1">
                            Date of birth
                        </p>
                        <p className="text-lg font-medium text-[18px] text-gray-900">{patient.dob}</p>
                    </div>

                    {/* Phone */}
                    <div>
                        <p className="text-[14px] text-[#212121] font-medium tracking-wide mb-1">
                            Phone Number
                        </p>
                        <p className="text-lg font-medium text-gray-900">{patient.phone}</p>
                    </div>

                    {/* Account ID */}
                    <div>
                        <p className="text-[14px] text-[#212121] font-medium mb-1">
                            Account ID
                        </p>
                        <p className="text-lg font-medium text-gray-900">{patient.accountId}</p>
                    </div>
                </div>
            </div>

            {/* 2. Tabs (Visual Only) */}
            <div className="border-b w-full border-gray-200 gap-8 px-2 mt-3">
            <SofiaTabs
              items={items}
              activeKey={activeKey}
              onChange={handleQueueChange}
            />
            </div>
        </div>
    );
};

export default ReviewPatientVitalSigns;
