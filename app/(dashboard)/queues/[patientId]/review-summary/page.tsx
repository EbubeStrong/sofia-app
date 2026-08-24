import PatientNavigation from "@/components/Patients/PatientNavigation";
import PatientStepper from "@/components/Patients/PatientStepper";
import ReviewSummaryLayout from "@/layouts/patient-summary/ReviewSummary";

const ReviewSummaryModule: React.FC<{ params: { patientId: string } }> = ({
  params,
}) => {
  const { patientId } = params;

  return (
    <div className="flex flex-col gap-6">
      <PatientNavigation
        currentPathName="Review & Submit"
        nextPathName="Next: Consultation"
        nextPathUrl={`/queues/${patientId}/review-summary`}
        routeId={patientId}
      />
      <PatientStepper routeId={patientId} />
      <ReviewSummaryLayout patientId={patientId} />
    </div>
  );
};

export default ReviewSummaryModule;
