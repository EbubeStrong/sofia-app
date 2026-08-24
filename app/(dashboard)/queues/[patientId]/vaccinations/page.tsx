import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import VaccinationsLayout from "@/layouts/vaccinations";

const VaccinationsModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Review & Submit"
      nextPathUrl={`/queues/${patientId}/review-summary`}
    >
      <VaccinationsLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default VaccinationsModule;
