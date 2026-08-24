//components
import VitalsDetails from "@/layouts/vital-signs/VitalsDetails";

const VitalsDetailsModule: React.FC<{ params: { vitalsId: string } }> = ({
  params,
}) => {
  return (
    <>
      <VitalsDetails vitalsId={params.vitalsId} />
    </>
  );
};

export default VitalsDetailsModule;
