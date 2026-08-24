export enum EVENT_TYPE {
  IN_PERSON = "In-person",
  TELEMEDICINE = "Telemedicine",
}

export enum FORWARD_TO {
  PHARMACY_QUEUE = "Pharmacy Queue",
  LABORATORY_QUEUE = "Laboratory Queue",
  DOCTOR_QUEUE = "Doctor Queue",
  NURSING_QUEUE = "Nursing Queue",
  RECEPTION_QUEUE = "Reception Queue",
}

export enum ACTIVITY {
  CHECKUP = "Checkup",
  URGENT_CARE = "Urgent Care Visit",
  FOLLOW_UP = "Follow-up",
  CONSULTATION = "Consultation",
  TELEMEDICINE = "Telemedicine",
}

export enum PRIORITY {
  LOW_RISK = "Low Risk",
  MODERATE_RISK = "Moderate Risk",
  HIGH_RISK = "High Risk",
  EMERGENCY = "Emergency",
}
