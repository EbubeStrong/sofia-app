"use client";
import React, { useState } from "react";
import { Button, MenuProps, Space } from "antd";


import { useRouter, useSearchParams } from "next/navigation";
import SofiaDrawers from "../Drawers";
import SofiaDropdown from "../Dropdowns";
import AdmissionViewAdmissionDetails, {
  AdmissionStatus,
  AdmissionDrawerDetails,
} from "./AdmissionViewAdmissionDetails";
import AdmissionDailyNoteDrawerContent, {
  AdmissionDailyNoteDetails,
} from "./AdmissionDailyNoteDrawerContent";
import AdmissionNotesDrawerContent, {
  AdmissionNotesDetails,
} from "./AdmissionNotesDrawerContent";
import AdmissionDischargeDrawerContent, {
  AdmissionDischargeDetails,
} from "./AdmissionDischargeDrawerContent";
import { DotsVertical } from "@/assets/icons";
import { HospitalByIdResponse } from "@/interfaces/general";
import type { TPharmacyPrescriptionQueueItem } from "@/interfaces/pharmacy";

export const  AdmissionReviewAction = ({
  patientId,
  patientConsultationId,
  buttonText,
  status,
//   hospitals,
  admissionItem,
  details,
  dailyNoteDetails,
  notesDetails,
  dischargeDetails,
  hidePrimaryButton,
}: {
  patientId: string;
  patientConsultationId: number;
  buttonText: string;
  status: AdmissionStatus;
  hospitals?:  HospitalByIdResponse["data"] | undefined;
  admissionItem?: TPharmacyPrescriptionQueueItem | null;
  details?: AdmissionDrawerDetails;
  dailyNoteDetails?: AdmissionDailyNoteDetails;
  notesDetails?: AdmissionNotesDetails;
  dischargeDetails?: AdmissionDischargeDetails;
  hidePrimaryButton?: boolean;
}) => {
  const [openReview, setOpenReview] = useState(false);
  const [openDailyNote, setOpenDailyNote] = useState(false);
  const [openNotes, setOpenNotes] = useState(false);

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

  const dropdownItems: MenuProps["items"] =
    status === "history"
      ? [
          {
            key: "vitals",
            label: (
              <button className="w-full flex items-center">
                View Vital Signs
              </button>
            ),
          },
          {
            key: "add-daily-note",
            label: (
              <button
                className="w-full flex items-center"
                onClick={() => setOpenDailyNote(true)}
              >
                Add Daily Note
              </button>
            ),
          },
          {
            key: "details",
            label: (
              <button
                className="w-full flex items-center"
                onClick={() => setOpenReview(true)}
              >
                Admission Details
              </button>
            ),
          },
        ]
      : [
          {
            key: "add-daily-note",
            label: (
              <button
                className="w-full flex items-center"
                onClick={() => setOpenDailyNote(true)}
              >
                Add Daily Note
              </button>
            ),
          },
          {
            key: "notes",
            label: (
              <button
                className="w-full flex items-center"
                onClick={() => setOpenNotes(true)}
              >
                Notes
              </button>
            ),
          },
          {
            key: "vitals",
            label: (
              <button className="w-full flex items-center">
                View Vital Signs
              </button>
            ),
          },
          {
            key: "details",
            label: (
              <button
                className="w-full flex items-center"
                onClick={() => setOpenReview(true)}
              >
                Admission Details
              </button>
            ),
          },
        ];

  const drawerMeta = {
  admission: {
    title: "View Admission Request",
    subtitle: "Complete this form to register a new patient",
  },
  current: {
    title: "View Admission Request",
    subtitle: "Complete this form to register a new patient",
  },
  discharge: {
    title: "View Admission Request",
    subtitle: "Complete this form to register a new patient",
  },
  history: {
    title: "View Admission Request",
    subtitle: "Complete this form to register a new patient",
  },
};


  return (
    <>
      <Space size="small">
        {!hidePrimaryButton && (
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
        )}

        <SofiaDropdown
          label={
            <span onClick={(e) => e.stopPropagation()}>
              <Button type="text" icon={<DotsVertical />} />
            </span>
          }
          items={dropdownItems}
        />
      </Space>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl text-[#101010]">
              {status === "discharge" && dischargeDetails
                ? `Discharge Request - ${dischargeDetails.headerName}`
                : drawerMeta[status]?.title}
            </p>
            <p className="text-sm text-[#101010]/50">
              {status === "discharge" && dischargeDetails
                ? "Comprehensive patient information and daily notes"
                : drawerMeta[status]?.subtitle}
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
        {status === "discharge" && dischargeDetails ? (
          <AdmissionDischargeDrawerContent details={dischargeDetails} />
        ) : (
          <AdmissionViewAdmissionDetails
            admissionItem={admissionItem}
            details={details}
            status={status}
          //   hospitals={hospitals}
          />
        )}
      </SofiaDrawers>

      {dailyNoteDetails && (
        <SofiaDrawers
          title={
            <>
              <p className="text-xl text-[#101010]">
                Add Note - {dailyNoteDetails.headerName}
              </p>
              <p className="text-sm text-[#101010]/50">
                Comprehensive patient information and daily notes
              </p>
            </>
          }
          placement="right"
          open={openDailyNote}
          onClose={() => setOpenDailyNote(false)}
          width={520}
          maskClosable={false}
          zIndex={1005}
        >
          <AdmissionDailyNoteDrawerContent
            details={dailyNoteDetails}
            onBack={() => setOpenDailyNote(false)}
          />
        </SofiaDrawers>
      )}

      {notesDetails && (
        <SofiaDrawers
          title={
            <>
              <p className="text-xl text-[#101010]">
                Notes - {notesDetails.headerName}
              </p>
              <p className="text-sm text-[#101010]/50">
                Comprehensive patient information and daily notes
              </p>
            </>
          }
          placement="right"
          open={openNotes}
          onClose={() => setOpenNotes(false)}
          width={520}
          maskClosable={false}
          zIndex={1005}
        >
          <AdmissionNotesDrawerContent
            details={notesDetails}
            onAddNote={() => setOpenDailyNote(true)}
          />
        </SofiaDrawers>
      )}
    </>
  );
};
