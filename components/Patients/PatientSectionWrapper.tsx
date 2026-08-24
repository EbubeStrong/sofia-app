import PatientNavigation from "./PatientNavigation";
import PatientStepper from "./PatientStepper";
import PatientSummaryCard from "./PatientSummaryCard";
import PatientSideMenu from "../Dashboard/PatientSideMenu";

interface PatientSectionProps {
  children: React.ReactNode;
  currentPathName: string | React.ReactNode;
  patientId: string;
  nextPathName: string;
  nextPathUrl: string;
}

const PatientSectionWrapper: React.FC<PatientSectionProps> = ({
  children,
  patientId,
  currentPathName,
  nextPathName,
  nextPathUrl,
}) => {
  return (
    <div className="flex flex-col gap-5">
      <PatientNavigation
        currentPathName={currentPathName}
        nextPathName={nextPathName}
        nextPathUrl={nextPathUrl}
        routeId={patientId}
      />
      <PatientStepper routeId={patientId} />
      <PatientSummaryCard />
      <div className="flex flex-col xl:flex-row w-full max-w-full overflow-hidden">
        <PatientSideMenu routeId={patientId} />
        <div className="w-full max-w-full xl:max-w-[calc(100%-240px)] xl:px-2.5">
          {children}
        </div>
      </div>
    </div>
  );
};

export default PatientSectionWrapper;
