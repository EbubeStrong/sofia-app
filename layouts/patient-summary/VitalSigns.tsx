import tw from "tailwind-styled-components";

interface VitalSignsProps {
  className?: string;
}

const Name = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal`;
const Value = tw.p`text-sm md:text-base text-[#101010] font-medium`;

const vitalSignsList = [
  {
    name: "Blood pressure",
    value: "120/80 mmHg (Normal)",
  },
  {
    name: "Fasting Blood Glucose",
    value: "90 mg/dL (Normal)",
  },
  {
    name: "Heart RatE",
    value: "72 beats per minute (Normal)",
  },
  {
    name: "Total Cholesterol",
    value: "190 mg/dL (Normal)",
  },
  {
    name: "Body Temperature",
    value: "36.8°C (98.2°F) (Normal)",
  },
  {
    name: "White Blood Cells",
    value: "7,500 cells",
  },
  {
    name: "Respiratory Rate",
    value: "16 breaths per minute (Normal)",
  },
  {
    name: "Postprandial Blood Glucose:",
    value: "30 mg/dL (Normal)",
  },
];

const VitalSigns: React.FC<VitalSignsProps> = ({ className }) => {
  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-lg md:text-xl text-[#101010] font-semibold font-libre_franklin">
          Vitals Signs
        </p>
        <p className="text-sm text-[#101010] hidden md:block">
          <span className="font-semibold">Last updated:</span> 2 Nov 2024 -
          12:39 PM
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 md:gap-y-3">
        {vitalSignsList.map((exam) => (
          <li key={exam.name}>
            <Name>{exam.name}</Name>
            <Value>{exam.value}</Value>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default VitalSigns;
