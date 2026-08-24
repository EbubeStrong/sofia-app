import PatientSectionWrapper from "@/components/Patients/PatientSectionWrapper";
import AllergiesLayout from "@/layouts/allergies";

const AllergiesModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <PatientSectionWrapper
      patientId={patientId}
      currentPathName="Patient Consultation"
      nextPathName="Next: Treatments"
      nextPathUrl={`/queues/${patientId}/treatments`}
    >
      <AllergiesLayout patientId={params.patientId} />
    </PatientSectionWrapper>
  );
};

export default AllergiesModule;
