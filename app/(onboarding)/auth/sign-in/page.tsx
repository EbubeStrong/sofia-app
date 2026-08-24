import { Suspense } from "react";
import SignInLayout from "@/layouts/auth/SignInLayout";
import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import SofiaPageLoader from "@/components/Loader/PageLoader";

const SignInModule = () => {
  return (
    <Suspense fallback={<SofiaPageLoader />}>
      <AuthWrapper>
        <SignInLayout />
      </AuthWrapper>
    </Suspense>
  );
};

export default SignInModule;
