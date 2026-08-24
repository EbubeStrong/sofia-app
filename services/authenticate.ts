import client from "@/config/client";
import {
  AcceptInviteRequest,
  AcceptInviteResponse,
  ForgotPasswordRequest,
  ForgotPasswordResponse,
  InviteMemberRequest,
  InviteMemberResponse,
  LicenseOnboardingRequest,
  LicenseOnboardingResponse,
  ResendOtpRequest,
  ResendOtpResponse,
  SignInRequest,
  SignInResponse,
  SignUpRequest,
  SignUpResponse,
  TechnologyOnboardingRequest,
  TechnologyOnboardingResponse,
  VerifyEmailRequest,
  VerifyEmailResponse,
} from "@/interfaces/authenticate";
import { useMutation, UseMutationResult } from "@tanstack/react-query";

export const useSignUp = (): UseMutationResult<
  SignUpResponse["data"],
  Sofiamatics.Response<unknown>,
  SignUpRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: SignUpRequest) => {
      const response = await client.post<SignUpResponse["data"]>(
        "/v1/auth/hospital/sign-up",
        payload.body
      );
      return response.data;
    },
  });
};

export const useSignIn = (): UseMutationResult<
  SignInResponse["data"],
  Sofiamatics.Response<unknown>,
  SignInRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: SignInRequest) => {
      const response = await client.post<SignInResponse["data"]>(
        "/v1/auth/hospital/login",
        payload.body
      );
      return response.data;
    },
  });
};

export const useVerifyEmail = (): UseMutationResult<
  VerifyEmailResponse["data"],
  Sofiamatics.Response<unknown>,
  VerifyEmailRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: VerifyEmailRequest) => {
      const response = await client.post<VerifyEmailResponse["data"]>(
        "/v1/auth/hospital/verify-email",
        payload.body
      );
      return response.data;
    },
  });
};

export const useResendOtp = (): UseMutationResult<
  ResendOtpResponse["data"],
  Sofiamatics.Response<unknown>,
  ResendOtpRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: ResendOtpRequest) => {
      const response = await client.post<ResendOtpResponse["data"]>(
        "/v1/auth/hospital/resend-otp",
        payload.body
      );
      return response.data;
    },
  });
};

export const useInviteMembers = (): UseMutationResult<
  InviteMemberResponse["data"],
  Sofiamatics.Response<unknown>,
  InviteMemberRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: InviteMemberRequest) => {
      const response = await client.post<InviteMemberResponse["data"]>(
        "/v1/hospital/invite-members",
        payload.body
      );
      return response.data;
    },
  });
};

export const useAcceptInvite = (): UseMutationResult<
  AcceptInviteResponse["data"],
  Sofiamatics.Response<unknown>,
  AcceptInviteRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: AcceptInviteRequest) => {
      const response = await client.post<AcceptInviteResponse["data"]>(
        "/v1/hospital/accept-invite",
        payload.body
      );
      return response.data;
    },
  });
};

export const useLicenseOnboarding = (): UseMutationResult<
  LicenseOnboardingResponse["data"],
  Sofiamatics.Response<unknown>,
  LicenseOnboardingRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: LicenseOnboardingRequest) => {
      const response = await client.post<LicenseOnboardingResponse["data"]>(
        "/v1/hospital/onboarding/license-operator",
        payload.body
      );
      return response.data;
    },
  });
};

export const useTechnologyOnboarding = (): UseMutationResult<
  TechnologyOnboardingResponse["data"],
  Sofiamatics.Response<unknown>,
  TechnologyOnboardingRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: TechnologyOnboardingRequest) => {
      const response = await client.post<TechnologyOnboardingResponse["data"]>(
        "/v1/hospital/onboarding/insurance-technology",
        payload.body
      );
      return response.data;
    },
  });
};

export const useForgotPassword = (): UseMutationResult<
  ForgotPasswordResponse["data"],
  Sofiamatics.Response<unknown>,
  ForgotPasswordRequest,
  null
> => {
  return useMutation({
    mutationFn: async (payload: ForgotPasswordRequest) => {
      const response = await client.post<ForgotPasswordResponse["data"]>(
        "/v1/auth/hospital/forgot-password",
        payload.body
      );
      return response.data;
    },
  });
};
