import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import LicensingLayout from "@/layouts/auth/LicensingLayout";

const LicensingModule = () => {
  return (
    <AuthWrapper stepOption={2}>
      <LicensingLayout />
    </AuthWrapper>
  );
};

export default LicensingModule;
