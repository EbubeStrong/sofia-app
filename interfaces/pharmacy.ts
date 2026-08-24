import { IOptions } from "./general";


export interface IPharmacyItem {
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

export interface IAdmissionItem {
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

export interface IInventoryItem {
  drugId: string;
  drugName: string;
  drugForm: string;
  storageLocation: string;
  drugPrice: number; 
  nafdacNumber: string;
  manufacturer: string; 
  quantity: number; 
  expiryDate: string; 
}


export interface INearExpiryItem {
  drugId?: string;
  drugName: string;
  capacity: string;
  drugType: string;
  amount?: number; 
  dateOfExpiry: string;  
  // dateRegistered: string;
}

export interface ILowStockItem {
   key?: string;
  drugId: string;
  drugName: string;
  strength:string;
  unitType: string;
  manufacturer: string;
  drugCategory: string;
  drugQuantity: number;
  reqQuantity: number;
}

export interface ICartItem {
  key?: string;
  cartId: string;
  drugName: string;
  unitType: string;
  strength: string;
  requiredQuantity: number;
  manufacturer: string;
  addedOn: string;
}

export interface IOrderHistoryItem {
  key?: string;
  requestId: string;
  from: string;
  to: string;
  subject: string;
  body: string;
  orderDate: string;
}





export type TPharmacyResp = Sofiamatics.Response<{
  data: {
    checkedInTime: string;
    patientId: string;
    name: string;
    eventType: string;
    activity: string;
    priority: string;
    visitStatus: string;
    patientConsultationId: number;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;


export interface PrescriptionInfoSchemaProps {
  countryOptions: IOptions[];
  countryLoading: boolean;
  statesOptions: IOptions[];
  statesLoading: boolean;
  type?: string;
}

export interface PrescriberInfoSchemaProps {
  insuranceOptions: IOptions[];
  insuranceLoading: boolean;
  onInsuranceSearch: (value: string) => void;
  onInsuranceClear: () => void;
  onInsuranceSelect: () => void;
}

export type TCreatePharmacyNewPrescriptionRequest = Sofiamatics.Request<
  null,
  null,
  {
    patientName: string;
    dateOfBirth: string;
    patientDrug: string;
    form: string;
    quantity: number;
    refillNumber: number;
    allowSubstitute: boolean;
    attachment?: string;
    directionsForUse: string;
    prescriberName: string;
    prescriberLicenseNumber: string;
    prescriberPhoneNumber: string;
    dateOfPrescription: string;
  }
>;



export type TCreatePharmacyNewPrescriptionResponse = Sofiamatics.Response<{
  patientId: string;
  patientUuid: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  maritalStatus: string;
  occupation: string;
  dob: Date; // Date of birth (string format from API)
  countryId: number;
  stateId: number;
  hospitalId: number;
  isExistingUser: boolean;
}>;

export interface IMedicineInventoryResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: IInventoryItem[];
}

export interface ILowStockInventoryResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: ILowStockItem[];
}

export interface IAllRequestMedicineResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: ICartItem[];
}

export interface IOrderHistoryResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: IOrderHistoryItem[];
}


export type TCreatePharmacyNewMedicineRequestResponse = Sofiamatics.Response<{
  id: string;
  userId: string;
    hospitalId: string;
    name: string;
  storeLocation: string;
  form: string;
  nDC: string;
  price: number;
  quantity: number;
  manufacturer: string;
  expiryDate: string;
  attachment?: File; // optional, include if there's a file upload
  uploadedFileUrl?: string; // optional, include if the file upload returns a URL
}>;

export type TCreatePharmacyNewMedicineRequest = Sofiamatics.Request<
  null,
  null,
  {
    userId: number;
    hospitalId: number;
    name: string;
  storeLocation: string;
  form: string;
  price: number;
  quantity: number;
  manufacturer: string;
  expiryDate: string;
  attachment?: File; // optional, include if there's a file upload
  uploadedFileUrl?: string; // optional, include if the file upload returns a URL
  }
>;

export interface IPatientInventoryResponse {
  page: number;
  perPage: number;
  totalCount: number;
  data: INearExpiryItem[];
}


export interface PatientRegistrationProps {
  genderOptions: IOptions[];
  genderLoading?: boolean;
  maritalStatusOptions: IOptions[];
  maritalStatusLoading?: boolean;
}

export interface NextOfKinProps {
  relationshipOptions: IOptions[];
  relationshipLoading?: boolean;
}

// export type TPharmacyNewPrescriptionResp = Sofiamatics.Response<{
//   data: {
//     orderId: string;
//     patientId: string;
//     patientName: string;
//     patientAge: string;
//     gender: string;
//     priority: "High" | "Medium" | "Low";
//     patientConsultationId: number;
//     prescribingDoctor: string;
//     allergy: string[];
//     date: string;
//     status: string;
//   }[];
//   page: number;
//   perPage: number;
//   totalCount: number;
//   totalPages: number;
// }>;

export type TMedication = {
  id: number;
  brandName: string;
  genericName: string;
  strength: string;
  form: string;
  pack: string;
  drug: string;
  totalQuantity: number;
  refillNumber: number;
  allowSubstitute: string;
  directions: string;
  startDate: string;
  endDate: string;
  uploadedFileUrl: string;
  createdAt: string;
};

export type TPatient = {
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
};

export type TDoctorOrPharmacist = {
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
};

export type TConsultation = {
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
  consultationDate: string;
  createdAt: string;
  updatedAt: string;
};

export type TPharmacyPrescriptionDetailResp = Sofiamatics.Response<{
  medication: TMedication;
  patient: TPatient;
  doctor: TDoctorOrPharmacist;
  pharmacist: TDoctorOrPharmacist;
  consultation: TConsultation;
}>;



export type TPharmacyProfile = Sofiamatics.Response<{
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
  lastLoginAt: string;
  country: string;
  pharmacistId: string;
}>;

export type TUpdatePharmacyProfileResponse = Sofiamatics.Response<{
  message: string;
}>;

export type TUpdatePharmacyProfileRequest = Sofiamatics.Request<
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
    pharmacySpeciality?: string;
    bio?: string;
    isActive?: boolean;
  }
>;

export type TPharmacyQueueData = {
  id: string;
  // assignedTo: IStaff;
  // doctorAssignedTo: IStaff;
  // patient: IPatient;
  // patientConsultation: IPatientConsultation;
  fromQueue: string;
  toQueue: string;
  forwardedAt: Date;
  notes: string;
};

export type TPharmacyQueueResp = Sofiamatics.Response<{
  data: TPharmacyQueueData[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;

export type PharmacyStatsResp = Sofiamatics.Response<{
  totalPrescription: number;
  totalOrder: number;
  totalHighPriority: number;
}>;

// export type TPharmacyResp = Sofiamatics.Response<{
//   data: {
//     id: string;
//     isLead: boolean;
//     isActive: boolean;
//     firstName: string;
//     lastName: string;
//     middleName: string;
//     registrationNumber: string;
//     phoneNumber: string;
//     email: string;
//     practiceType: string;
//     gender: string;
//     dob: string;
//     maritalStatus: string;
//     homeAddress: string;
//     nin: string;
//     createdAt: Date;
//     updatedAt: Date;
//     country: string;
//   }[];
//   page: number;
//   perPage: number;
//   totalCount: number;
//   totalPages: number;
// }>;

export type TPharmacyPrescriptionQueueItem = {
  medication: TMedication;
  patient: TPatient;
  doctor: TDoctorOrPharmacist;
  pharmacist: TDoctorOrPharmacist | null;
  consultation: TConsultation;
};

export type TPharmacyPrescriptionQueueData = {
  data: TPharmacyPrescriptionQueueItem[];
  totalCount: number;
  page: number;
  perPage: number;
  totalPages: number;
};


export type TPharmacyPrescriptionQueueResp =
  Sofiamatics.Response<TPharmacyPrescriptionQueueData>;


// export type TPharmacyPrescriptionQueueResp = Sofiamatics.Response<{
//     data: TPharmacyPrescriptionQueueItem[];
//     totalCount: number;
//     page: number;
//     perPage: number;
//     totalPages: number;
//   }>;

