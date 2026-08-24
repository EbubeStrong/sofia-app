const alergyList = [
  {
    name: "Penicillin V",
    dosage: "7984",
    type: "Medication",
  },
  {
    name: "Shellfish",
    dosage: "2324",
    type: "Food",
  },
];

const Allergies = () => {
  return (
    <div className="rounded-lg bg-white p-4 col-span-2 md:col-span-1">
      <p className="text-lg text-[#101010] font-semibold font-libre_franklin mb-1.5">
        Allergies
      </p>
      <ul>
        {alergyList.map((alergy, index) => (
          <li
            key={index}
            className="text-sm md:text-base text-[#101010] font-normal font-libre_franklin"
          >
            {alergy.type}: {alergy.name} [{alergy.dosage}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Allergies;
