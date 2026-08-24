import { IOptions } from "./general";

export interface PersonalInfoSchemaProps {
  countryOptions: IOptions[];
  countryLoading: boolean;
  statesOptions: IOptions[];
  statesLoading: boolean;
  type?: string;
}

export interface InsuranceSchemaProps {
  insuranceOptions: IOptions[];
  insuranceLoading: boolean;
  onInsuranceSearch: (value: string) => void;
  onInsuranceClear: () => void;
  onInsuranceSelect: () => void;
}

export interface AllergiesSchemaProps {
  allergiesTypeOptions: IOptions[];
  allergiesLoading: boolean;
  onAllergySearch: (value: string) => void;
  onAllergyClear: () => void;
  onAllergySelect: () => void;
}

export interface CheckinData {
  patientId: string;
  step: number;
  fullName?: string;
}

export type TCreatePatientRequest = Sofiamatics.Request<
  null,
  null,
  {
    firstName: string;
    middleName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    gender: string;
    maritalStatus: string;
    dateOfBirth: string;
    address: string;
    countryId: number;
    stateId: number;
    occupation: string;
  }
>;

export type TCreatePatientResponse = Sofiamatics.Response<{
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

export type TCreateInsuranceRequest = Sofiamatics.Request<
  null,
  null,
  {
    patientId: string;
    insuranceId: string;
    policyNumber?: string;
    groupNumber?: string;
  }
>;

export type TCreateInsuranceResponse = Sofiamatics.Response<string>;

export type TCreateEmergencyRequest = Sofiamatics.Request<
  null,
  null,
  {
    patientId: string;
    contactName: string;
    relationship: string;
    contactPhone: string;
  }
>;

export type TCreateEmergencyResponse = Sofiamatics.Response<null>;

export type TCreateCheckinRequest = Sofiamatics.Request<
  null,
  null,
  {
    patientId?: string;
    emergencyPatientName?: string;
    activity?: string;
    eventType?: string;
    priority: string;
    forwardTo?: string;
    additionalInformation?: string;
  }
>;

export type TCreateCheckinResponse = Sofiamatics.Response<{
  consultationId: number;
  patientId: string;
  patientName: string;
  activity: string;
  eventType: string;
  priority: string;
  forwardTo: string;
  currentQueue: string;
  checkInDate: Date;
  message: string;
}>;

export type TExistingCheckinResponse = Sofiamatics.Response<
  {
    id: string;
    patientId: string;
    fullName: string;
    email: string;
    phoneNumber: string;
    dateOfBirth: Date;
    gender: string;
  }[]
>;

export type TCheckinsResp = Sofiamatics.Response<{
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

export type TCheckinSummaryById = Sofiamatics.Response<{
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

export type TCheckinStats = Sofiamatics.Response<{
  totalRegistrations: number;
  totalCheckIns: number;
  nursingQueue: number;
  doctorQueue: number;
  admittedPatients: number;
  discharged: number;
  highModeratePriority: number;
  droppedCases: number;
}>;

export type TReceptionProfile = Sofiamatics.Response<{
  userId: string;
  lastLoginDate: string;
  dateJoined: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordLastChanged: string;
}>;

export type TUpdateProfileRequest = Sofiamatics.Request<
  null,
  null,
  {
    firstName: string;
    lastName: string;
    email: string;
  }
>;

export type TUpdateProfileResponse = Sofiamatics.Response<{
  userId: string;
  lastLoginDate: string;
  dateJoined: string;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordLastChanged: string;
}>;
