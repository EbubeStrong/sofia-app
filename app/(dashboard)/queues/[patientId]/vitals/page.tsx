//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import VitalsAndBiometricsLayout from "@/layouts/vital-signs";

const VitalsAndBiometricsModule: React.FC<{
  params: { patientId: string };
}> = ({ params }) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Diagonosis"
      nextPathUrl={`/queues/${patientId}/diagnosis`}
    >
      <VitalsAndBiometricsLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default VitalsAndBiometricsModule;
