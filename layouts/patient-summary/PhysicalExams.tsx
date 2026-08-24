import tw from "tailwind-styled-components";

interface PhysicalExamsProps {
  className?: string;
}

const Name = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal`;
const Value = tw.p`text-sm md:text-base text-[#101010] font-medium`;

const physicalExamsList = [
  {
    name: "Heart",
    value: "Blockage in the left artery",
  },
  {
    name: "RIGHT FOOT",
    value: "Heavy feeling",
  },
  {
    name: "LUNGS",
    value: "Congestion in the left side of chest",
  },
  {
    name: "LEFT EAR",
    value: "Sharp throbbing pain",
  },
  {
    name: "ABDOMEN",
    value: "Pain on right side",
  },
  {
    name: "LOWER BACK",
    value: "Pain",
  },
  {
    name: "LOWER LIMB",
    value: "Oedema in left side",
  },
  {
    name: "LEFT THIGH",
    value: "Pain",
  },
];

const PhysicalExams: React.FC<PhysicalExamsProps> = ({ className }) => {
  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <div className="flex items-center justify-between mb-2.5">
        <p className="text-lg text-[#101010] font-semibold font-libre_franklin">
          Physical Exams
        </p>
        <p className="text-sm text-[#101010] hidden md:block">
          <span className="font-semibold">Last updated:</span> 2 Nov 2024 -
          12:39 PM
        </p>
      </div>

      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-x-10 md:gap-y-3">
        {physicalExamsList.map((exam) => (
          <li key={exam.name}>
            <Name>{exam.name}</Name>
            <Value>{exam.value}</Value>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PhysicalExams;
