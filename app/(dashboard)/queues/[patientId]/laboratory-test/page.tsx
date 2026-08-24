//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import LaboratoryTestsLayout from "@/layouts/laboratory-test";

const LaboratoryTestsModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Imaging"
      nextPathUrl={`/queues/${patientId}/imaging`}
    >
      <LaboratoryTestsLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default LaboratoryTestsModule;
