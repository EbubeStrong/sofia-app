import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import TechnologyLayout from "@/layouts/auth/TechnologyLayout";

const TechnologyModule = () => {
  return (
    <AuthWrapper stepOption={2}>
      <TechnologyLayout />
    </AuthWrapper>
  );
};

export default TechnologyModule;
