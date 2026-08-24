import tw from "tailwind-styled-components";

const Name = tw.p`text-xs text-[#101010]/50 font-normal font-libre_franklin uppercase leading-normal`;
const Value = tw.p`text-sm md:text-base text-[#101010] font-medium`;

const generalInformationList = [
  {
    name: "BMI",
    value: "23.1",
  },
  {
    name: "WEIGHT",
    value: "75 kg (165 lbs)",
  },
  {
    name: "HEIGHT",
    value: <span>180 cm (5&apos;11&quot;)</span>,
  },
];

const GeneralInformation = () => {
  return (
    <div className="rounded-lg bg-white p-4 col-span-2 md:col-span-1">
      <p className="text-lg text-[#101010] font-semibold font-libre_franklin mb-1.5">
        General information
      </p>
      <ul className="grid grid-cols-2 md:grid-cols-2 gap-y-3">
        {generalInformationList.map((info) => (
          <li key={info.name}>
            <Name>{info.name}</Name>
            <Value>{info.value}</Value>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GeneralInformation;
