type StepStatus = "current" | "pending" | "done" | "failed";

export interface ISteps {
  id: number;
  label: string;
  desc: string;
  status: StepStatus;
}

export interface IPatientSteppersProps {
  id: number;
  label: string;
  icon: React.ReactNode;
  path: string[];
}

export interface Patient {
  patientId: string;
  fullName: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
  gender: string;
  maritalStatus: string;
  homeAddress: string;
  appointmentType: string;
  lastVisit: string; // ISO date string
}

export interface PaginatedResponse<T> {
  data: T[];
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
}

export interface ApiResponse<T> {
  message: string;
  statusCode: number;
  data: PaginatedResponse<T>;
}

export type TPatientsApiResponse = ApiResponse<Patient>;

export type TPatientRecordsById = Sofiamatics.Response<{
  id: number;
  patientId: string;
  firstName: string;
  middleName: string;
  lastName: string;
  fullName: string;
  gender: string;
  dob: string;
  age: number;
  maritalStatus: string;
  email: string;
  phoneNumber: string;
  homeAddress: string;
  lastVisit: Date;
  lastVisitFormatted: string;
  occupation: string;
  stateId: number;
  state: string;
  countryId: number;
  country: string;
  allergies: string[];
  vaccinations: string[];
  insuranceId: string;
  insuranceName: string;
  policyHolderName: string;
  policyNumber: string;
  groupNumber: string;
  insuranceEffectiveDate: Date;
  insuranceExpiryDate: Date;
  emergencyContactName: string;
  emergencyContactRelationship: string;
  emergencyContactPhoneNumber: string;
}>;

export type TAllPatientsResp = Sofiamatics.Response<{
  data: {
    patientId: string;
    name: string;
    type: string;
    gender: string;
    email: string;
    lastVisit: Date;
    lastVisitFormatted: string;
    isEmergency: boolean;
    priority: string;
    age?: number;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientStatsProps = Sofiamatics.Response<{
  totalVisits: number;
  patientsSeen: number;
  newPatients: number;
}>;

export type TPatientActivityResp = Sofiamatics.Response<{
  data: {
    activityType: string;
    title: string;
    provider: string;
    activityDate: Date;
    formattedDate: string;
    activityId: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientComplaintResp = Sofiamatics.Response<{
  data: {
    id: number;
    procedure: string;
    outcome: string;
    details: string;
    provider: string;
    appointmentDate: Date;
    time: string;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientVitalsResp = Sofiamatics.Response<{
  data: {
    id: number;
    temperature: string;
    temperatureSource: string;
    temperatureMethod: string;
    bloodPressure: string;
    bloodPressurePosition: string;
    bloodPressureSource: string;
    pulse: string;
    respiratoryRate: string;
    breathingPattern: string;
    weight: string;
    height: string;
    bmi: string;
    headCircumference: string;
    waistSize: string;
    createdAt: Date;
    time: string;
    formattedDate: string;
    nurseNotes: string;
    reasonForVisit: string;
    createdBy: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientDiagnosisResp = Sofiamatics.Response<{
  data: {
    id: number;
    diagnosis: string;
    differentialDiagnosis: string;
    plan: string;
    provider: string;
    createdAt: Date;
    time: string;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientTestsResp = Sofiamatics.Response<{
  data: {
    id: number;
    labTestOrder: string;
    type: string;
    priority: string;
    specimen: string;
    patientInstruction: string;
    comment: string;
    service: string;
    dateRecorded: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientImagingResp = Sofiamatics.Response<{
  data: {
    id: number;
    fileName: string;
    fileSize: string;
    attachmentUrl: string;
    createdAt: Date;
    formattedDate: string;
    uploadedBy: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientDoctorNotesResp = Sofiamatics.Response<{
  data: {
    id: number;
    summary: string;
    assessment: string;
    plan: string;
    interventions: string;
    provider: string;
    createdAt: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientAllergiesResp = Sofiamatics.Response<{
  data: {
    id: number;
    type: string;
    name: string;
    condition: string;
    reaction: string;
    severity: string;
    patientInstruction: string;
    date: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientTreatmentsResp = Sofiamatics.Response<{
  data: {
    id: number;
    brandName: string;
    genericName: string;
    strength: string;
    form: string;
    pack: string;
    directions: string;
    allowSubstitute: string;
    refillNumber: 0;
    startDate: Date;
    endDate: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientNursesNoteResp = Sofiamatics.Response<{
  data: {
    id: number;
    summary: string;
    assessment: string;
    plan: string;
    interventions: string;
    provider: string;
    createdAt: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientSurgeriesResp = Sofiamatics.Response<{
  data: {
    id: number;
    procedure: string;
    details: string;
    provider: string;
    datePerformed: Date;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type TPatientVaccinationsResp = Sofiamatics.Response<{
  data: {
    id: number;
    vaccine: string;
    dateAdministered: Date;
    dosage: string;
    unit: string;
    additionalNote: string;
    formattedDate: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type PatientTab = "prescription" | "allergies" | "vaccinations" | "logs";

export interface ApiPaginatedResponse<T> {
  data: T[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface Prescription {
  id: number;
  brandName: string;
  strength: string;
  pack: string;
  genericName: string;
  refillNumber: string;
  form: string;
  total: string;
  substitute: string;
  status: "Completed" | "Rejected" | "Stand by";
  directions: string;
  date: string;
}

export interface Allergy {
  id: number;
  allergen: string;
  reaction: string;
  severity: "Mild" | "Moderate" | "Severe";
  notedOn: string;
  additionalNotes: string;
  addedBy: string;
  agent:string;
}

export interface Vaccination {
  id: number;
  vaccineName: string;
  dose: string;
  administeredOn: string;
  administeredBy: string;
  status: "Completed" | "Pending";
  severity: string;
  unit: string;
  additionalNotes: string;
  addedOn: string;
  scheduledOn: string;
}

export interface MedicalLog {
  id: number;
  action: string;
  performedBy: string;
  createdAt: string;
}
