"use client";

import { useState, useEffect } from "react";
import { Form } from "antd";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";

import { MailIcon } from "@/assets/icons";
import FormConfig from "@/components/FormElements/FormConfig";
import { otpSchema } from "@/components/FormElements/schemas";
import FormInputCountdown from "@/components/FormElements/FormInputCountdown";
import { ROUTE_PATH } from "@/utils/constants";
import storage from "@/config/storage";
import Loader from "@/components/Loader";
import { UserInfoResponse } from "@/interfaces/general";
import { useResendOtp, useVerifyEmail } from "@/services/authenticate";

type TOtpFieldProps = {
  otp: string;
  email: string;
};

const VerifyOtpLayout = () => {
  const [form] = Form.useForm();
  const router = useRouter();
  const searchParams = useSearchParams();
  const typeParam = searchParams.get("type");

  const [isCountingDown, setIsCountingDown] = useState(false);
  const [deadline, setDeadline] = useState<number | undefined>();
  const [user, setUser] = useState({} as UserInfoResponse);

  useEffect(() => {
    const user = storage.getUser();
    if (user) setUser(user);
  }, []);

  const { mutate: resendOtp, isPending: isResendingOtp } = useResendOtp();
  const { mutate: verifyEmail, isPending: isVerifyingEmail } = useVerifyEmail();

  const handleCountdown = () => {
    setIsCountingDown(false);
  };

  const handleResendOtp = () => {
    resendOtp(
      {
        body: {
          email: user?.email,
        },
      },
      {
        onSuccess: () => {
          toast.success("OTP resent successfully");
          const deadline = Date.now() + 1000 * 60 * 10; // 10 minutes
          setDeadline(deadline);
          setIsCountingDown(true);
        },
      }
    );
  };

  const handleVerifyEmail = (values: TOtpFieldProps) => {
    const payload = {
      otp: values.otp,
      email: user?.email,
    };
    verifyEmail(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Email verified successfully");
          if (typeParam) {
            router.push(ROUTE_PATH.RESET_PASSWORD);
          } else {
            router.push(ROUTE_PATH.LICENSING);
          }
          form.resetFields();
        },
      }
    );
  };

  return (
    <div className="flex flex-col xl:justify-start w-full bg-white xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-24">
      <div className="mb-8 my-0 mx-auto">
        <MailIcon />
      </div>
      <h1 className="text-2xl lg:text-2xl text-[#101010] font-semibold text-center mb-2">
        Verify your email address to proceed
      </h1>
      <p className="text-base text-[#212121]/80 font-medium text-center w-full max-w-full lg:max-w-[80%] my-0 mx-auto mb-10">
        We sent a 6-digit confirmation code to{" "}
        <span className="font-semibold">{user?.email}</span>
        <br /> You may need to check your spam folder
      </p>

      <FormConfig
        form={form}
        schema={otpSchema}
        onSubmit={handleVerifyEmail}
        beforeBtn={
          <div className="text-center text-sm text-[#212121]/80 mb-6 flex items-center justify-center gap-1">
            Didn&apos;t get OTP?{" "}
            {isCountingDown ? (
              <>
                Resend in{" "}
                <FormInputCountdown
                  deadline={deadline}
                  onFinish={handleCountdown}
                />
              </>
            ) : (
              <>
                {isResendingOtp ? (
                  <Loader size={16} />
                ) : (
                  <button
                    onClick={handleResendOtp}
                    type="button"
                    className="underline text-[#212121] font-medium"
                  >
                    Resend OTP
                  </button>
                )}
              </>
            )}{" "}
          </div>
        }
        btnText="Verify OTP"
        btnLoading={isVerifyingEmail}
      />
    </div>
  );
};

export default VerifyOtpLayout;
