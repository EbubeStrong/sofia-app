import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import ImagingLayout from "@/layouts/imaging";

const ImagingModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Doctors Notes"
      nextPathUrl={`/queues/${patientId}/doctors-note`}
    >
      <ImagingLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default ImagingModule;
