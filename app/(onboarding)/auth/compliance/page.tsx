import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import ComplianceLayout from "@/layouts/auth/ComplianceLayout";

const ComplianceModule = () => {
  return (
    <AuthWrapper stepOption={2}>
      <ComplianceLayout />
    </AuthWrapper>
  );
};

export default ComplianceModule;
