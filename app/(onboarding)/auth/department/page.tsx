import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import DepartmentLayout from "@/layouts/auth/DepartmentLayout";

const DepartmentModule = () => {
  return (
    <AuthWrapper stepOption={2}>
      <DepartmentLayout />
    </AuthWrapper>
  );
};

export default DepartmentModule;
