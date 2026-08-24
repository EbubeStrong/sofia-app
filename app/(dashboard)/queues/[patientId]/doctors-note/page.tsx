//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import DoctorsNoteLayout from "@/layouts/doctors-note";

const DoctorsNoteModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Allergies"
      nextPathUrl={`/queues/${patientId}/allergies`}
    >
      <DoctorsNoteLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default DoctorsNoteModule;
