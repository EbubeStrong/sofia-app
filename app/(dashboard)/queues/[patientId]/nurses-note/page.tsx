//components
import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import NursesNoteLayout from "@/layouts/nurses-note";

const NursesNoteModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Treatment"
      nextPathName="Next: Surgeries"
      nextPathUrl={`/queues/${patientId}/surgeries`}
    >
      <NursesNoteLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default NursesNoteModule;
