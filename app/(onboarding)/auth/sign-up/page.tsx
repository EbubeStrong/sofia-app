import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import SignupLayout from "@/layouts/auth/SignupLayout";

const SignUpModule = () => {
  return (
    <AuthWrapper stepOption={1}>
      <SignupLayout />
    </AuthWrapper>
  );
};

export default SignUpModule;
