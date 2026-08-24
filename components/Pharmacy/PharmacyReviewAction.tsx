"use client";
import React, { useState } from "react";
import { Button, MenuProps, Space } from "antd";


import { useRouter, useSearchParams } from "next/navigation";
import SofiaDrawers from "../Drawers";
import SofiaDropdown from "../Dropdowns";
import ViewPrescriptionDetails from "./PharmacyViewPrescriptionDetails";
import { DotsVertical } from "@/assets/icons";
import NewPrescriptionForm from "./Forms/NewPrescriptionForm";
import { HospitalByIdResponse } from "@/interfaces/general";

export const  PharmacyReviewAction = ({
  patientId,
  patientConsultationId,
  buttonText,
  status,
  hospitals
}: {
  patientId: string;
  patientConsultationId: number;
  buttonText: string;
  status: "prescription" | "approved" | "reject" | "completed" | "archived";
  hospitals?:  HospitalByIdResponse["data"] | undefined
}) => {
  const [openReview, setOpenReview] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);

  const handleReviewClick = (patientId: string, patientConsultationId: number) => {
    setOpenReview(true);
    params.set("patientId", patientId);
    params.set("consultationId", String(patientConsultationId));
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const removePatientIdFromParams = () => {
    params.delete("patientId");
    params.delete("consultationId");
    const query = params.toString();
    router.push(query ? `?${query}` : "?", { scroll: false });
  };

  const items: Record<"prescription" | "completed" | "reject" | "approved"  | "archived", MenuProps["items"]> = {
    prescription: [
      {
        key: "summary",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/review/${patientId}`)}
          >
            View Check-in Summary
          </button>
        ),
      },
      {
        key: "profile",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/patients/${patientId}`)}
          >
            View Patient Profile
          </button>
        ),
      },
    ],
    reject: [
      {
        key: "filled-summary",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => {
              const currentParams = new URLSearchParams(searchParams);
              const tabParam = currentParams.get("q") || status;
              router.push(`/pharmacy/filled/${patientId}?tab=${tabParam}`);
            }}
          >
            View Rejected Prescription
          </button>
        ),
      },
      {
        key: "profile",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/patients/${patientId}`)}
          >
            View Patient Profile
          </button>
        ),
      },
      {
        key: "history",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/history/${patientId}`)}
          >
            View Prescription History
          </button>
        ),
      },
    ],
    approved: [
      {
        key: "approved-summary",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => {
              const currentParams = new URLSearchParams(searchParams);
              const tabParam = currentParams.get("q") || status;
              router.push(`/pharmacy/approved/${patientId}?tab=${tabParam}`);
            }}
          >
            View Approved Prescription
          </button>
        ),
      },
      {
        key: "profile",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/patients/${patientId}`)}
          >
            View Patient Profile
          </button>
        ),
      },
      {
        key: "approval-details",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/approved/${patientId}/details`)}
          >
            View Approval Details
          </button>
        ),
      },
    ],
    completed: [
      {
        key: "completed-summary",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/completed/${patientId}`)}
          >
            View Completed Prescription
          </button>
        ),
      },
      {
        key: "profile",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/patients/${patientId}`)}
          >
            View Patient Profile
          </button>
        ),
      },
      {
        key: "receipt",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/completed/${patientId}/receipt`)}
          >
            View Receipt
          </button>
        ),
      },
    ],
    archived: [
      {
        key: "archived-summary",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/archived/${patientId}`)}
          >
            View Archived Prescription
          </button>
        ),
      },
      {
        key: "profile",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/patients/${patientId}`)}
          >
            View Patient Profile
          </button>
        ),
      },
      {
        key: "restore",
        label: (
          <button
            className="w-full flex items-center"
            onClick={() => router.push(`/pharmacy/archived/${patientId}/restore`)}
          >
            Restore Prescription
          </button>
        ),
      },
    ],
  };

  const drawerMeta = {
  prescription: {
    title: "Prescription Details",
    subtitle: "Review patient prescription details",
  },
  reject: {
    title: "Rejected Prescription",
    subtitle: "Create a new prescription from the rejected one",
  },
  approved: {
    title: "Approved Prescription",
    subtitle: "View approved prescription",
  },
  completed: {
    title: "Completed Prescription",
    subtitle: "View completed prescription",
  },
  archived: {
    title: "Archived Prescription",
    subtitle: "View archived prescription",
  },
};


  return (
    <>
      <Space size="small">
        <Button
          type="primary"
          className="!bg-[#1174c0dd] hover:!bg-[#1386de] !py-4 !font-medium !text-white !rounded-md !w-[75px]"
          onClick={(e) => {
            e.stopPropagation();
            handleReviewClick(patientId, patientConsultationId);
          }}
        >
          {buttonText}
        </Button>

        <SofiaDropdown
          label={
            <span onClick={(e) => e.stopPropagation()}>
              <Button type="text" icon={<DotsVertical />} />
            </span>
          }
          items={items[status]}
        />
      </Space>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">
              {drawerMeta[status]?.title}
            </p>
            <p className="text-sm text-[#101010]/50">
              {drawerMeta[status]?.subtitle}
            </p>
          </>
        }
        placement="right"
        open={openReview}
        onClose={() => {
          setOpenReview(false);
          removePatientIdFromParams();
        }}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        {status === "reject" ? <NewPrescriptionForm patientId={patientId} patientConsultationId={patientConsultationId} /> :<ViewPrescriptionDetails patientId={patientId} patientConsultationId={patientConsultationId} hospitals={hospitals} />}
      </SofiaDrawers>
    </>
  );
};
