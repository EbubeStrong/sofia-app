const medicationList = [
  {
    name: "Lisinopril",
    dosage: "10mg",
  },
  {
    name: "Metformin",
    dosage: "500mg",
  },
  {
    name: "Atorvastatin",
    dosage: "20mg",
  },
];

const ActiveMedications = () => {
  return (
    <div className="rounded-lg bg-white p-4 col-span-2 md:col-span-1">
      <p className="text-lg text-[#101010] font-semibold font-libre_franklin mb-1.5">
        Active Medication
      </p>
      <ul>
        {medicationList.map((medication, index) => (
          <li
            key={index}
            className="text-sm md:text-base text-[#101010] font-normal font-libre_franklin"
          >
            {medication.name} - {medication.dosage}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ActiveMedications;
