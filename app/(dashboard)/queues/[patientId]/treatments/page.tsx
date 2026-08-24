//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import TreatmentsLayout from "@/layouts/treatments";

const TreatmentsModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Nurses Note"
      nextPathUrl={`/queues/${patientId}/nurses-note`}
    >
      <TreatmentsLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default TreatmentsModule;
