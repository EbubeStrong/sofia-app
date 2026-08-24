export type SignUpRequest = Sofiamatics.Request<
  null,
  null,
  {
    hospitalId?: number;
    hospitalName?: string;
    alternativeTradeName: string;
    hospitalEmail: string;
    phoneNumber?: string;
    address: string;
    stateId: number;
    countryId: number;
    websiteUrl?: string;
    password: string;
    confirmPassword?: string;
  }
>;

export type SignUpResponse = Sofiamatics.Response<{
  user: {
    email: string;
    firstName: string;
    lastName: string;
    hospitalName: string;
    hospitalId: number;
    otp: string;
  };
  token: string;
}>;

export type SignInRequest = Sofiamatics.Request<
  null,
  null,
  {
    email: string;
    password: string;
  }
>;

export type SignInResponse = Sofiamatics.Response<{
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    hospitalName: string;
    hospitalId: number;
    role: string;
    phoneNumber: string;
    isEmailVerified: boolean;
    isLead: boolean;
  };
  token: string;
}>;

export type VerifyEmailRequest = Sofiamatics.Request<
  null,
  null,
  {
    email: string;
    otp: string;
  }
>;

export type VerifyEmailResponse = Sofiamatics.Response<unknown>;

export type ResendOtpRequest = Sofiamatics.Request<
  null,
  null,
  {
    email: string;
  }
>;

export type ResendOtpResponse = Sofiamatics.Response<{
  email: string;
  expiresIn: string;
}>;

export type InviteMemberRequest = Sofiamatics.Request<
  null,
  null,
  {
    invites: {
      firstName: string;
      lastName: string;
      email: string;
      roleId: number;
    }[];
  }
>;

export type InviteMemberResponse = Sofiamatics.Response<{
  message: string;
  totalInvites: number;
  successfulInvites: number;
  failedInvites: number;
  inviteResults: [
    {
      message: string;
      email: string;
      firstName: string;
      lastName: string;
      roleName: string;
    }
  ];
}>;

export type AcceptInviteRequest = Sofiamatics.Request<
  null,
  null,
  {
    token: string;
    password: string;
    confirmPassword: string;
  }
>;

export type AcceptInviteResponse = Sofiamatics.Response<{
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    profilePicture: string;
    hospitalName: string;
    hospitalId: number;
    role: string;
    phoneNumber: string;
    isEmailVerified: true;
  };
  token: string;
}>;

export type LicenseOnboardingRequest = Sofiamatics.Request<
  null,
  null,
  {
    hasEmergencyServices: boolean;
    hasTelemedicineServices: boolean;
    bedsCapacity: number;
    patientCapacityPerDay: number;
    licenseType: string;
    licenseNumber: string;
    hospitalPhoneNumber: string;
    websiteUrl: string;
  }
>;

export type LicenseOnboardingResponse = Sofiamatics.Response<{
  hospitalId: number;
  hasEmergencyServices: boolean;
  hasTelemedicineServices: boolean;
  bedsCapacity: number;
  patientCapacityPerDay: number;
  licenseType: string;
  licenseNumber: string;
  hospitalPhoneNumber: string;
  websiteUrl: string;
}>;

export type TechnologyOnboardingRequest = Sofiamatics.Request<
  null,
  null,
  {
    usesExistingEmr: boolean;
    hasApiServices?: boolean;
    hasInHousePharmacy?: boolean;
    existingEmrName: string;
    insuranceProviders: string[];
  }
>;

export type TechnologyOnboardingResponse = Sofiamatics.Response<{
  usesExistingEmr: boolean;
  hasApiServices: boolean;
  hasInHousePharmacy: boolean;
  existingEmrName: string;
  insuranceProviders: string[];
}>;

export type ForgotPasswordRequest = Sofiamatics.Request<
  null,
  null,
  {
    email: string;
  }
>;

export type ForgotPasswordResponse = Sofiamatics.Response<string>;
