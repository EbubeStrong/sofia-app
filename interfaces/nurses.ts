import { IOptions } from "./general";

export interface INursesItem {
  appointmentId: string;
  patientId: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  appointmentDate: string; // ISO date string
  appointmentTime: string; // e.g., "09:00 AM"
  activity: string; // e.g., "Consultation", "Follow-up"
  reason: string; // High-level reason e.g., "Fever"
  complaint: string; // Specific complaint e.g., "Persistent headache"
  appointmentType: string; // e.g., "Video", "In-person"
  status: string; // e.g., "Waiting", "In Session", "Completed"
  durationMinutes: number; // Duration of call/session
  callId: string; // ID from video service (e.g., ZEGOCLOUD)
  joinLink: string; // Secure link to join session
  isVirtual: boolean; // true = telemedicine
  canJoin: boolean;
}

export interface IPatient {
  id: string;
  patientId: string;
  phoneNumber: string;
  firstName: string;
  lastName: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  homeAddress: string;
  guardianFullname: string;
  guardianPhone: string;
  nin: string;
  profileImageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPatientConsultation {
  id: number;
  idEncrypt: string;
  activity: string;
  complaint: string;
  historyOfIllness: string;
  time: string;
  reasonForVisit: string;
  eventType: string;
  isPriority: boolean;
  priority: string;
  forwardTo: string;
  currentQueue: string;
  consultationDate: string;
  createdAt: string;
  updatedAt: string;
}

export interface IStaff {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string;
  registrationNumber: string;
  phoneNumber: string;
  email: string;
  practiceType: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  homeAddress: string;
  nin: string;
  country: string;
}

export type TNurseQueueData = {
  id: string;
  assignedTo: IStaff;
  doctorAssignedTo: IStaff;
  patient: IPatient;
  patientConsultation: IPatientConsultation;
  fromQueue: string;
  toQueue: string;
  forwardedAt: Date;
  notes: string;
};

export type TNursingQueueResp = Sofiamatics.Response<{
  data: TNurseQueueData[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TNursesResp = Sofiamatics.Response<{
  data: {
    id: string;
    isLead: boolean;
    isActive: boolean;
    firstName: string;
    lastName: string;
    middleName: string;
    registrationNumber: string;
    phoneNumber: string;
    email: string;
    practiceType: string;
    gender: string;
    dob: string;
    maritalStatus: string;
    homeAddress: string;
    nin: string;
    createdAt: Date;
    updatedAt: Date;
    country: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type AssignNurseRequest = Sofiamatics.Request<
  null,
  null,
  {
    nurseId: string;
    queueMovementId: string;
  }
>;

export type AssignNurseResponse = Sofiamatics.Response<{
  message: string;
}>;

export type NursesStatsResp = Sofiamatics.Response<{
  totalAdmittedPatients: number;
  totalAssignedPatients: number;
  totalClosedPatients: number;
  totalDischarge: number;
  totalDroffOffPatients: number;
  totalHIghPriority: number;
  totalUnassignedPatients: number;
}>;

export type TDropoffSummaryDetails = Sofiamatics.Response<{
  consultationId: number;
  patientId: string;
  patientName: string;
  patientEmail: string;
  activity: string;
  eventType: string;
  priority: string;
  forwardTo: string;
  currentQueue: string;
  checkInDate: string;
  formattedCheckInDate: string;
  checkedInTime: string;
  message: string;
}>;

export interface VitalSignsSchemaProps {
  doctorOptions?: IOptions[];
  doctorLoading?: boolean;
  onDoctorSearch: (value: string) => void;
  onDoctorClear: () => void;
  onDoctorSelect: () => void;
}

export type TVitalsRequest = Sofiamatics.Request<
  null,
  null,
  {
    patientConsultationId: string;
    doctorId: string;

    bloodPressure: string;
    heartRate?: string;
    bodyTemperature: string;
    respiratoryRate?: string;

    fastingBloodGlucose?: string;
    postprandialBg?: string;
    totalCholesterol?: string;
    whiteBloodCells?: string;

    height: string;
    weight: string;
    bmi: string;

    uploadedFileUrl?: string;

    headCircumference?: string;
    waistSize?: string;
    pulse: string;

    nurseNotes?: string;
    reasonForVisit?: string;

    priority: string;

    bloodPressureSource?: string;
    bodyTemperatureSource?: string;
  }
>;

export type TVitalsResponse = Sofiamatics.Response<{
  id: number;
  temperature: string;
  temp_source: string;
  bloodPressure: string;
  bloodPressure_source: string;
  pulse: string;
  weight: string;
  height: string;
  bmi: string;
  headCircumference?: string;
  waistSize?: string;
  nursesNote: string;
  reasonForVisit: string;
  forwardTo: string;
  priorityLevel: string;
  createdAt: Date;
  updatedAt: Date;
}>;

export type TNurseProfile = Sofiamatics.Response<{
  id: string;
  isLead: boolean;
  isActive: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  registrationNumber: string;
  phoneNumber: string;
  email: string;
  practiceType: string;
  gender: string;
  dob: string;
  maritalStatus: string;
  homeAddress: string;
  nin: string;
  createdAt: Date;
  updatedAt: Date;
  country: string;
  lastLoginAt: string;
  nurseId: string;
}>;

export type TUpdateNurseProfileRequest = Sofiamatics.Request<
  null,
  null,
  {
    registrationNumber?: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    gender?: string;
    dob?: string;
    maritalStatus?: string;
    homeAddress?: string;
    nin?: string;
    practiceType?: string;
    nurseSpeciality?: string;
    bio?: string;
    isActive?: boolean;
  }
>;

export type TUpdateNurseProfileResponse = Sofiamatics.Response<{
  message: string;
}>;

export type TNursePasswordRequest = Sofiamatics.Request<
  null,
  null,
  {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
>;

export type TNursePasswordResponse = Sofiamatics.Response<string>;
