const surgeryList = [
  {
    name: "Laparoscopy",
  },
  {
    name: "Neurosurgery",
  },
];

const PreviousSurgeries = () => {
  return (
    <div className="rounded-lg bg-white p-4 col-span-2 md:col-span-1">
      <p className="text-lg md:text-xl text-[#101010] font-semibold font-libre_franklin mb-1.5">
        Previous Surgeries
      </p>
      <ul>
        {surgeryList.map((surgery) => (
          <li
            key={surgery.name}
            className="text-sm md:text-base text-[#101010] font-normal font-libre_franklin"
          >
            {surgery.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreviousSurgeries;
