import React from "react";
import { AdmissionReviewAction } from "@/components/Admission/AdmissionReviewAction";
import { MockAppointmentsByTabItem } from "@/components/Pharmacy/utils/types";
import type { AdmissionDrawerDetails } from "@/components/Admission/AdmissionViewAdmissionDetails";
import type { AdmissionDailyNoteDetails } from "@/components/Admission/AdmissionDailyNoteDrawerContent";
import type { AdmissionNotesDetails } from "@/components/Admission/AdmissionNotesDrawerContent";
import type { AdmissionDischargeDetails } from "@/components/Admission/AdmissionDischargeDrawerContent";

const baseDetails: AdmissionDrawerDetails = {
  patientName: "David Udemezue",
  age: 12,
  gender: "Male",
  preferredWard: "Cardiology",
  priority: "High",
  allergies: "Ibuprofen, Amoxicillin",
  reasonForAdmission: "Patient experiencing severe chest pain for 2 hours",
  treatmentPlan: "Antibiotic therapy, respiratory support",
  assignBedOptions: ["A102", "B201", "C304"],
  assignBed: "A102",
  proposedAdmissionStartOptions: ["Today's Date", "Tomorrow"],
  proposedAdmissionStart: "Today's Date",
  expectedDischargeOptions: ["17/01/2024", "20/01/2024"],
  expectedDischarge: "17/01/2024",
  notes: "Patient experiencing severe chest pain for 2 hours",
  forwardedByName: "Dr David Udemezue",
  forwardedByRole: "Cardiologist",
  dateForwarded: "12 May 2024",
};

const baseDailyNoteDetails: AdmissionDailyNoteDetails = {
  headerName: "Robert Johnson",
  patientName: "David Udemezue",
  patientDob: "12 May 2024",
  patientPhone: "08083475321",
  reasonForAdmission: "Patient experiencing severe chest pain for 2 hours",
  treatmentPlan: "Antibiotic therapy, respiratory support",
  bedOptions: ["A102", "B201", "C304"],
  bed: "A102 (General Ward A)",
  proposedAdmissionStartOptions: ["Today's Date", "Tomorrow"],
  proposedAdmissionStart: "Today's Date",
  expectedDischargeOptions: ["17/01/2024", "20/01/2024"],
  expectedDischarge: "17/01/2024",
  notes: "Patient experiencing severe chest pain for 2 hours",
  admittingDoctor: "Dr. Dr. Emily Rodriguez",
  admissionDate: "10/01/2024",
  lengthOfStay: "629 days",
};

const baseNotesDetails: AdmissionNotesDetails = {
  headerName: "Robert Johnson",
  patientName: "David Udemezue",
  age: 21,
  gender: "Male",
  notes: [
    {
      date: "08/10/2025",
      doctor: "Dr. Dr. Emily Rodriguez",
      time: "21:22:12",
      note: "Antibiotic therapy, respiratory support",
    },
    {
      date: "08/10/2025",
      doctor: "Dr. Dr. Emily Rodriguez",
      time: "21:22:12",
      note: "Antibiotic therapy, respiratory support",
    },
  ],
};

const makeDischargeDetails = (
  details: AdmissionDischargeDetails
): AdmissionDischargeDetails => details;

export const mockAdmissionsByTab: Record<
  string,
  MockAppointmentsByTabItem[]
> = {
  admission: [
    {
      appointmentId: "RX-2020-004",
      patientName: "Eric Monono",
      gender: "Female",
      age: 29,
      drugs: "Penicillin, Sulfa",
      doctor: "Dr. Emily Brown",
      date: "Jan 15, 2024 at 11:20 AM",
      priority: "High",
      patientId: "patient-1",
      action: (
        <AdmissionReviewAction
          status="admission"
          buttonText="View"
          patientId="patient-1"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
        />
      ),
    },
    {
      appointmentId: "RX-2020-005",
      patientName: "Jennifer Lee",
      gender: "Female",
      age: 34,
      drugs: "Ibuprofen, Amoxicillin",
      doctor: "Dr. Sarah Smith",
      date: "Jan 16, 2024 at 2:30 PM",
      priority: "High",
      patientId: "patient-2",
      action: (
        <AdmissionReviewAction
          status="admission"
          buttonText="View"
          patientId="patient-2"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
        />
      ),
    },
    {
      appointmentId: "RX-2020-006",
      patientName: "Michael Chen",
      gender: "Male",
      age: 45,
      drugs: "Aspirin, Lisinopril",
      doctor: "Dr. John Doe",
      date: "Jan 17, 2024 at 9:00 AM",
      priority: "High",
      patientId: "patient-3",
      action: (
        <AdmissionReviewAction
          status="admission"
          buttonText="View"
          patientId="patient-3"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
        />
      ),
    },
  ],

  current: [
    {
      appointmentId: "RX-2020-008",
      patientName: "Daniel Okorie",
      gender: "Male",
      age: 41,
      drugs: "Atorvastatin",
      doctor: "Dr. Peter Adams",
      date: "Jan 18, 2024 at 1:10 PM",
      priority: "High",
      patientId: "patient-8",
      action: (
        <AdmissionReviewAction
          status="current"
          buttonText="View"
          patientId="patient-8"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
        />
      ),
    },
    {
      appointmentId: "RX-2020-009",
      patientName: "Grace Williams",
      gender: "Female",
      age: 36,
      drugs: "Metformin",
      doctor: "Dr. Jane Collins",
      date: "Jan 19, 2024 at 9:45 AM",
      priority: "Low",
      patientId: "patient-9",
      action: (
        <AdmissionReviewAction
          status="current"
          buttonText="View"
          patientId="patient-9"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
        />
      ),
    },
  ],

  discharge: [
    {
      appointmentId: "RX-2020-012",
      patientName: "Samuel Adeyemi",
      gender: "Male",
      age: 52,
      drugs: "Losartan",
      doctor: "Dr. Henry Wilson",
      date: "Jan 19, 2024 at 4:00 PM",
      priority: "High",
      patientId: "patient-12",
      action: (
        <AdmissionReviewAction
          status="discharge"
          buttonText="View"
          patientId="patient-12"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
          dischargeDetails={makeDischargeDetails({
            headerName: "Samuel Adeyemi",
            patientName: "Samuel Adeyemi",
            age: 52,
            gender: "Male",
            dischargeDate: "12 Feb 2025",
            dischargeRequestedBy: "Dr. Emily Rodriguez",
            reasonForAdmission: "Patient experiencing severe chest pain for 2 hours",
            dischargeSummary: "Stable vitals. Chest pain resolved.",
            followUpInstruction: "Follow up in 2 weeks with cardiology.",
            bed: "A102 (General Ward A)",
            admittingDoctor: "Dr. Emily Rodriguez",
            admissionDate: "10/01/2024",
            lengthOfStay: "629 days",
            treatmentPlan: "Antibiotic therapy, respiratory support",
          })}
        />
      ),
    },
    {
      appointmentId: "RX-2020-013",
      patientName: "Amina Bello",
      gender: "Female",
      age: 47,
      drugs: "Insulin",
      doctor: "Dr. Fatima Musa",
      date: "Jan 20, 2024 at 8:15 AM",
      priority: "High",
      patientId: "patient-13",
      action: (
        <AdmissionReviewAction
          status="discharge"
          buttonText="View"
          patientId="patient-13"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
          dischargeDetails={makeDischargeDetails({
            headerName: "Amina Bello",
            patientName: "Amina Bello",
            age: 47,
            gender: "Female",
            dischargeDate: "18 Feb 2025",
            dischargeRequestedBy: "Dr. Fatima Musa",
            reasonForAdmission: "Patient experiencing severe chest pain for 2 hours",
            dischargeSummary: "Discharge cleared. Continue insulin regimen.",
            followUpInstruction: "Endocrinology follow-up in 1 month.",
            bed: "B201 (General Ward B)",
            admittingDoctor: "Dr. Fatima Musa",
            admissionDate: "12/01/2024",
            lengthOfStay: "620 days",
            treatmentPlan: "Insulin therapy and monitoring",
          })}
        />
      ),
    },
  ],

  history: [
    {
      appointmentId: "RX-2020-014",
      patientName: "Joseph Martins",
      gender: "Male",
      age: 60,
      drugs: "Pregnancy Check-up",
      doctor: "Dr. Luke Johnson",
      date: "Jan 14, 2024 at 12:00 PM",
      priority: "Low",
      diagnosis: "Pregnancy Check-up",
      bed: "B205 - Maternity Ward",
      duration: "20/12/2023 - 28/12/2023",
      stay: "200 Days",
      patientId: "patient-14",
      action: (
        <AdmissionReviewAction
          status="history"
          buttonText="View"
          patientId="patient-14"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
          hidePrimaryButton
        />
      ),
    },
    {
      appointmentId: "RX-2020-015",
      patientName: "Eric Monono",
      gender: "Male",
      age: 31,
      drugs: "Pregnancy Check-up",
      doctor: "Dr. Emily Rodriguez",
      date: "Jan 10, 2024 at 9:10 AM",
      priority: "Low",
      diagnosis: "Pregnancy Check-up",
      bed: "B205 - Maternity Ward",
      duration: "20/12/2023 - 28/12/2023",
      stay: "200 Days",
      patientId: "patient-15",
      action: (
        <AdmissionReviewAction
          status="history"
          buttonText="View"
          patientId="patient-15"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
          hidePrimaryButton
        />
      ),
    },
    {
      appointmentId: "RX-2020-016",
      patientName: "Eric Monono",
      gender: "Male",
      age: 31,
      drugs: "Pregnancy Check-up",
      doctor: "Dr. Emily Rodriguez",
      date: "Jan 11, 2024 at 2:45 PM",
      priority: "Low",
      diagnosis: "Pregnancy Check-up",
      bed: "B205 - Maternity Ward",
      duration: "20/12/2023 - 28/12/2023",
      stay: "200 Days",
      patientId: "patient-16",
      action: (
        <AdmissionReviewAction
          status="history"
          buttonText="View"
          patientId="patient-16"
          patientConsultationId={0}
          details={baseDetails}
          dailyNoteDetails={baseDailyNoteDetails}
          notesDetails={baseNotesDetails}
          hidePrimaryButton
        />
      ),
    },
  ],
};
