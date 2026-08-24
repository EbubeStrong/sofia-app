import PatientNavigation from "@/components/Patients/PatientNavigation";
import PatientStepper from "@/components/Patients/PatientStepper";
import PatientSummaryLayout from "@/layouts/patient-summary";

type PatientSummaryProps = {
  params: {
    patientId: string;
  };
};

const PatientSummaryModule: React.FC<PatientSummaryProps> = ({ params }) => {
  const { patientId } = params;

  return (
    <div className="flex flex-col gap-6">
      <PatientNavigation
        currentPathName="Patient Summary"
        nextPathName="Next: Consultation"
        nextPathUrl={`/queues/${patientId}/complaints`}
        routeId={patientId}
      />
      <PatientStepper routeId={patientId} />
      <PatientSummaryLayout />
    </div>
  );
};

export default PatientSummaryModule;
