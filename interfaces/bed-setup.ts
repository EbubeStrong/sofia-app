export interface BedSetupColumnProps {
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
