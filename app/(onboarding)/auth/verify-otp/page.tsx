import { Suspense } from "react";

import VerifyOtpLayout from "@/layouts/auth/OtpLayout";
import AuthWrapper from "@/components/Dashboard/AuthWrapper";

const VerifyRegisterUser = () => {
  return (
    <Suspense>
      <AuthWrapper>
        <VerifyOtpLayout />
      </AuthWrapper>
    </Suspense>
  );
};

export default VerifyRegisterUser;
