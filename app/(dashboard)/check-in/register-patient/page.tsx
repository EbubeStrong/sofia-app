import RegisterPatientForm from "@/layouts/checkin/RegisterCheckin";

type Props = {
  searchParams: {
    patient_id?: string;
  };
};

const RegisterPatientModule: React.FC<Props> = ({ searchParams }) => {
  const patientId = searchParams.patient_id as string;

  return <RegisterPatientForm patientId={patientId} />;
};

export default RegisterPatientModule;
