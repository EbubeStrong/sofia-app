import { Suspense } from "react";

import ForgotPasswordLayout from "@/layouts/auth/ForgotPasswordLayout";
import AuthWrapper from "@/components/Dashboard/AuthWrapper";

const ForgotPasswordModule = () => {
  return (
    <Suspense>
      <AuthWrapper>
        <ForgotPasswordLayout />
      </AuthWrapper>
    </Suspense>
  );
};

export default ForgotPasswordModule;
