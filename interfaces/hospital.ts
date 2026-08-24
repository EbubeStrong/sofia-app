export type THospitalProfileResponse = Sofiamatics.Response<{
  id: number;
  uuid: string;
  hospitalName: string;
  alternativeTradeName: string;
  hospitalEmail: string;
  phoneNumber: string;
  logoUrl: string;
  websiteUrl: string;
  address: string;
  type: string;
  ownership: string;
  state: string;
  countryId: number;
  countryName: string;
  longitude: number;
  latitude: number;
  onboardingStatus: number;
  createdAt: Date; // ISO date string
  updatedAt: Date;
}>;

export type THospitalProfileRequest = Sofiamatics.Request<
  null,
  null,
  {
    alternativeTradeName: string;
    phoneNumber: string;
    websiteUrl: string;
    address: string;
  }
>;

export type TChangePasswordRequest = Sofiamatics.Request<
  null,
  null,
  {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }
>;

export type TChangePasswordResponse = Sofiamatics.Response<string>;

export type TDoctorListResp = Sofiamatics.Response<{
  data: {
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
    createdAt: Date;
    updatedAt: Date;
    country: string;
  }[];
  page: number;
  perPage: number;
  totalCount: number;
  totalPages: number;
}>;
