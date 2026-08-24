"use client";

import { usePathname } from "next/navigation";
import BackButton from "../BackButton";
import Link from "next/link";

interface IPatientNavProps {
  currentPathName: string | React.ReactNode;
  nextPathName: string;
  nextPathUrl: string;
  routeId: string;
}

const PatientNavigation: React.FC<IPatientNavProps> = ({
  currentPathName,
  nextPathName,
  nextPathUrl,
  routeId,
}) => {
  const pathname = usePathname();

  const backToSummaryPath = `/queues/${routeId}/summary`;

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
      <div className="flex-1">
        {!pathname.includes("summary") && (
          <BackButton toPath={backToSummaryPath}>Back to Summary</BackButton>
        )}

        <h1 className="text-xl md:text-2xl text-[#212121] font-semibold mt-1">
          {currentPathName}
        </h1>
      </div>

      {!pathname.includes("review-summary") && (
        <Link
          href={nextPathUrl}
          className="text-base text-white bg-[#1175C0] font-semibold rounded-lg w-fit h-[50px] px-3 flex items-center"
        >
          {nextPathName}
        </Link>
      )}
    </div>
  );
};

export default PatientNavigation;
