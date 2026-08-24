import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import SurgeriesLayout from "@/layouts/surgeries";

const SurgeriesModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Treatment"
      nextPathName="Next: Vaccinations"
      nextPathUrl={`/queues/${patientId}/vaccinations`}
    >
      <SurgeriesLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default SurgeriesModule;
