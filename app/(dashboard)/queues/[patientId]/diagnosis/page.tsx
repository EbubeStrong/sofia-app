//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import DiagnosisLayout from "@/layouts/diagnosis";

const DiagnosisModule: React.FC<{
  params: { patientId: string };
}> = ({ params }) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Laboratory Tests"
      nextPathUrl={`/queues/${patientId}/laboratory-test`}
    >
      <DiagnosisLayout patientId={patientId} />
    </PatientSectionWrapper>
  );
};

export default DiagnosisModule;
