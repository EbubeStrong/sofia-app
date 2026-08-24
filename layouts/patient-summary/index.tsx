//components
import PatientSummaryCard from "@/components/Patients/PatientSummaryCard";
import ActiveProblems from "@/layouts/patient-summary/ActiveProblems";
import ActiveMedications from "@/layouts/patient-summary/ActiveMedication";
import Allergies from "@/layouts/patient-summary/Allergies";
import GeneralInformation from "@/layouts/patient-summary/GeneralInformation";
import PhysicalExams from "@/layouts/patient-summary/PhysicalExams";
import VitalSigns from "@/layouts/patient-summary/VitalSigns";
import PreviousSurgeries from "@/layouts/patient-summary/PreviousSuggeries";
import VaccinationHistory from "@/layouts/vaccinations/VaccinationHistory";
import FamilyHistory from "@/layouts/patient-summary/FamilyHistory";
import InsuranceInformation from "@/layouts/patient-summary/InsuranceInformation";

const PatientSummaryLayout = () => {
  return (
    <div className="grid grid-cols-2 gap-5 bg-[#F3F7F8] px-2 py-4 md:px-4 md:pb-6 md:pt-4">
      <PatientSummaryCard className="col-span-2" />
      <ActiveProblems className="col-span-2 md:col-span-1" />
      <ActiveMedications />
      <Allergies />
      <GeneralInformation />
      <PhysicalExams className="col-span-2" />
      <VitalSigns className="col-span-2" />
      <PreviousSurgeries />
      <VaccinationHistory />
      <FamilyHistory />
      <InsuranceInformation />
    </div>
  );
};

export default PatientSummaryLayout;
