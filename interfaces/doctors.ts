interface IHospital {
  hospitalName: string;
  address: string;
  phoneNumber: string;
  hospitalEmail: string;
  id: number;
}

interface ICountry {
  name: string;
  id: number;
  countryCode: string;
}

interface IUploads {
  category: string;
  id: number;
  filePath: string;
  fileType: string;
}

interface IDoctor {
  id: string;
  firstName: string;
  lastName: string;
  middleName: string | null;
  folioNumber: string;
  phoneNumber: string;
  email: string;
  practiceType: string;
  bio: string;
  gender: string | null;
  dob: string | null; // Assuming DOB might be a date string or null
  maritalStatus: string | null;
  homeAddress: string | null;
  nin: string | null;
  createdAt: string; // Assuming date-time string
  updatedAt: string; // Assuming date-time string
  country: ICountry;
  hospital: IHospital; // You might want to define a more specific interface for Hospital if it's not always empty
  upload: IUploads;
}

export interface IDoctorResponse {
  message: string;
  statusCode: number;
  data: IDoctor;
}

export interface IDoctorAppointmentItem {
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
  gender?: string;
  age?: number;
  drugs?: string;
  doctor?: string;
  action?: React.ReactNode;
  priority?: "High" | "Medium" | "Low";
}

export interface IDoctorAppointmentData {
  data: IDoctorAppointmentItem[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export type TDoctorAppointmentResp = {
  message: string;
  statusCode: number;
  data: IDoctorAppointmentData;
};

export type TDoctorAvailabilityData = {
  id: number;
  doctorId: number;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  type: "Virtual" | "Physical";
  shortDayOfWeek: string;
  abbreviatedDayOfWeek: string;
  formattedDayOfWeek: string;
  isAvailable: boolean;
};

export type TDoctorAvailabilityResp = {
  message: string;
  statusCode: number;
  data: TDoctorAvailabilityData[];
};

export enum AppointmentKey {
  PHYSICAL = "Physical",
  VIRTUAL = "Virtual",
}

export interface DoctorPatientStatistics {
  totalPatientVisits: number;
  totalInPersonVisits: number;
  totalTeleMedicineVisits: number;
  totalPatientVisitsInState: number;
  totalInPersonVisitsInState: number;
  totalTeleMedicineVisitsInState: number;
}

export interface TDoctorPatientStatsProps {
  message: string;
  statusCode: number;
  data: DoctorPatientStatistics;
}
