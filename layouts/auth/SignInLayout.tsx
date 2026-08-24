"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Form } from "antd";
import Cookies from "js-cookie";
import { toast } from "sonner";

//components
import FormConfig from "@/components/FormElements/FormConfig";
import { loginSchema } from "@/components/FormElements/schemas";
import { ROUTE_PATH } from "@/utils/constants";
import AuthResetAction from "@/layouts/dashboard/AuthResetAction";
import storage from "@/config/storage";
import AuthRegisterAction from "../dashboard/AuthRegisterAction";
import { useSignIn } from "@/services/authenticate";
import { ROLES, STORAGE_KEYS } from "@/utils/roles-enum";
import client from "@/config/client";
import { OnboardingStatusResponse } from "@/interfaces/general";
import { queryKeys } from "@/utils/queryKeys";
import { queryClient } from "@/config/query-client";

type FieldType = {
  loginEmail: string;
  loginPassword: string;
};

const SignInLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectPath = searchParams.get("redirect");
  const redirectTo = redirectPath ?? ROUTE_PATH.DASHBOARD.DASHBOARD_PATH;

  const { mutate: loginUser, isPending: isLoggingUser } = useSignIn();

  const checkOnboardingStatus = async () => {
    const response = await queryClient.fetchQuery({
      queryKey: [queryKeys.general.onboarding_status],
      queryFn: async () => {
        const res = await client.get<OnboardingStatusResponse["data"]>(
          "/v1/hospital/onboarding/status"
        );
        return res.data;
      },
    });

    return response;
  };

  const handleLogin = (values: FieldType) => {
    const payload = {
      email: values.loginEmail,
      password: values.loginPassword,
    };
    loginUser(
      { body: payload },
      {
        onSuccess: (response) => {
          if (!response) {
            toast.error(`Unexpected error. Please try again.`);
            return;
          }

          const { token, user } = response;

          Cookies.set(STORAGE_KEYS.TOKEN, token);
          Cookies.set(STORAGE_KEYS.ROLE, user?.role);
          Cookies.set(STORAGE_KEYS.HOSPITAL_ID, String(user?.hospitalId));
          Cookies.set(STORAGE_KEYS.IS_LEAD, user?.isLead?.toString());
          storage.setUser(user);

          // If email is verified / not
          if (!user?.isEmailVerified) {
            toast.warning("Please verify your email to continue");
            router.push(ROUTE_PATH.VERIFY_OTP);
            return;
          }

          // Hospital Admin Logic
          if (user?.role === ROLES.HOSPITAL) {
            checkOnboardingStatus()
              .then((status) => {
                if (status?.isComplete) {
                  toast.success(
                    "Login successful. Welcome to Sofia Hospital Management System."
                  );
                  router.push(redirectTo);
                } else {
                  router.push(ROUTE_PATH.LICENSING);
                }
              })
              .catch((error: unknown) => {
                toast.error("Unable to retrieve onboarding status.");
                console.error("err", error);
              })
              .finally(() => {
                form.resetFields();
              });
            return;
          }

          // Non Hospital Admin Users
          toast.success(
            "Login successful. Welcome to Sofia Hospital Management System."
          );
          router.push(redirectTo);
          form.resetFields();
        },
      }
    );
  };

  return (
    <div className="flex flex-col xl:justify-center bg-white w-full xl:min-h-[calc(100vh-96px)] h-auto px-5 py-8 lg:px-16 lg:py-10 xl:py-16">
      <h1 className="text-2xl lg:text-3xl text-[#101010] font-semibold text-start mb-1">
        Login to your account
      </h1>
      <p className="text-base text-[#212121]/80 font-medium text-left mb-6">
        To access your medical records, enter your email and password.
      </p>
      <FormConfig
        formName="login-form"
        form={form}
        schema={loginSchema}
        onSubmit={handleLogin}
        beforeBtn={
          <AuthResetAction
            description=""
            path={ROUTE_PATH.FORGOT_PASSWORD}
            label="Forgot password?"
          />
        }
        afterBtn={
          <AuthRegisterAction
            description={"Don't have an account?"}
            path={ROUTE_PATH.REGISTER.REGISTER_PATH}
            label={"Register"}
          />
        }
        btnText="Login"
        btnLoading={isLoggingUser}
      />
    </div>
  );
};

export default SignInLayout;
