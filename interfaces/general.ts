import { CheckinData } from "./checkin";

export type TSideNavProps = {
  title: string;
  icon: React.ReactNode;
  link: string;
  roles: string[];
  type: string;
  key?: string;
  children?: {
    title: string;
    link?: string | undefined;
    query?: Record<string, string>;
    basePath?: string;
  }[];
};

export enum ALLOWED_ROLES {
  SUBSCRIBED_DOCTOR = "subscribed_doctor",
  UNSUBSCRIBED_DOCTOR = "unsubscribed_doctor",
}

export interface IStorage {
  setUser: (value: UserInfoResponse) => void;
  getUser: () => UserInfoResponse | null;
  clearUser: () => void;
  setCheckin: (value: CheckinData) => void;
  getCheckin: () => CheckinData | null;
  clearCheckin: () => void;
  clearAll: () => void;
}

export interface ICountries {
  id: number;
  countryCode: string;
  phoneCode: string;
  name: string;
  nationalCurrency: string;
}

export interface IStates {
  id: number;
  countryId: number;
  stateCode: string;
  name: string;
}

export interface ICountriesResp {
  message: string;
  statusCode: number;
  data: ICountries[];
}

export interface ICountryOptions {
  label: string;
  value: string;
}

export interface IHospitals {
  id: number;
  hospitalName: string;
  logoUrl: string | null;
  hospitalEmail: string | null;
  phoneNumber: string | null;
  address: string | null;
  type: string;
  longitude: number;
  latitude: number;
  country: string;
  countryId: number;
  state: string;
  distanceInMeters: number;
  distanceInKm: number;
  formattedDistance: string | null;
}

export interface IHospitalById {
  id: number;
  hospitalName: string;
  logoUrl: string | null;
  hospitalEmail: string | null;
  phoneNumber: string | null;
  address: string | null;
  type: string;
  longitude: number;
  latitude: number;
  country: string;
  countryId: number;
  state: string;
  distanceInMeters: number;
  distanceInKm: number;
  formattedDistance: string | null;
}

export interface IHospitalData {
  data: IHospitals[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}

export interface IHospitalsResp {
  message: string;
  statusCode: number;
  data: IHospitalData;
}

export interface IHospitalsOptions {
  label: string;
  value: string;
}

export interface IPraticeTypes {
  id: number;
  uuid: string;
  type: string;
  name: string;
  fullName: string;
  licenseNumber: string;
  registeredDate: string;
}

export interface IPracticeTypeResp {
  message: string;
  statusCode: number;
  data: IPraticeTypes[];
}

export interface IDocSpeciality {
  id: number;
  uuid: string;
  speciality: string;
}

export interface IDocSpecialityResp {
  message: string;
  statusCode: number;
  data: IDocSpeciality[];
}

export interface IOptions {
  label: string;
  value: string;
}

export interface IPracticeTypeOptions {
  label: string;
  value: string;
}

export interface IRegSchemaProps {
  countryOptions: ICountryOptions[];
  countryLoading?: boolean;
  hospitalOptions?: IHospitalsOptions[];
  hospitalLoading?: boolean;
  practiceTypeOptions?: IPracticeTypeOptions[];
  practiceTypeLoading?: boolean;
  statesOptions: ICountryOptions[];
  statesLoading?: boolean;
  onHospitalSearch: (value: string) => void;
  onHospitalClear: () => void;
  onHospitalSelect: () => void;
}

export interface IProfileSchemaProps {
  countryOptions: ICountryOptions[];
  countryLoading: boolean;
  hospitalOptions: IHospitalsOptions[];
  hospitalLoading: boolean;
  practiceTypeOptions: IPracticeTypeOptions[];
  practiceTypeLoading: boolean;
  specialityOptions: IOptions[];
  specialityLoading: boolean;
}

export interface InviteTeamSchemaProps {
  roleOptions: { label: string; value: number }[];
  roleLoading: boolean;
}

export interface IUser {
  doctorId: string;
  firstName: string;
  lastName: string;
  middleName: string;
  folioNumber: string;
  email: string;
  phoneNumber: string;
  isEmailVerified: boolean;
}

export interface UserInfoResponse {
  email: string;
  firstName?: string;
  lastName?: string;
  hospitalName?: string;
  hospitalId?: number;
  otp?: string;
  isEmailVerified?: boolean;
  phoneNumber?: string;
  role?: string;
  profilePicture?: string;
  doctorId?: string;
  id?: number;
}

export interface IQueryDependencies {
  query: string;
}

export interface ITechnologySchemaProps {
  insuranceOptions: IOptions[];
  insuranceLoading?: boolean;
  onInsuranceSearch: (value: string) => void;
  onInsuranceClear: () => void;
  onInsuranceSelect: () => void;
}

// V2 Implementation

export interface Countries {
  id: number;
  countryCode: string;
  phoneCode: string;
  name: string;
  nationalCurrency: string;
}

export type CountryResponse = Sofiamatics.Response<Countries[]>;

export type StatesResponse = Sofiamatics.Response<IStates[]>;

export type HospitalResponse = Sofiamatics.Response<IHospitalData>;

export type HospitalByIdResponse = Sofiamatics.Response<IHospitalById>;

export type RolesResponse = Sofiamatics.Response<
  {
    id: number;
    name: string;
  }[]
>;

export type OnboardingStatusResponse = Sofiamatics.Response<{
  hospitalId: number;
  statusName: string;
  nextStepUrl: string;
  isComplete: boolean;
}>;

export type InsuranceResponse = Sofiamatics.Response<{
  data: {
    id: string;
    insuranceName: string;
    insuranceEmail: string | null;
    phoneNumber: string | null;
    logoUrl: string | null;
    address: string | null;
    countryId: number;
    deletedAt: string | null;
    createdBy: string | null;
    updatedBy: string | null;
    createdByUser: string | null;
    updatedByUser: string | null;
    country: string | null;
    createdAt: string;
    updatedAt: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;
