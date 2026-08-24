import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import PatientComplaintsLayout from "@/layouts/patient-complaints";

const PatientComplaintModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Vital Signs"
      nextPathUrl={`/queues/${patientId}/vitals`}
    >
      <PatientComplaintsLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default PatientComplaintModule;
