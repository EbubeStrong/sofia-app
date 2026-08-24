interface ActiveProblemsProps {
  className?: string;
}

const ActiveProblems: React.FC<ActiveProblemsProps> = ({ className }) => {
  return (
    <div className={`rounded-lg bg-white p-4 ${className}`}>
      <p className="text-lg text-[#101010] font-semibold font-libre_franklin mb-1.5">
        Active Problems
      </p>
      <p className="text-sm md:text-base text-[#101010] font-normal font-libre_franklin">
        Shortness of breath on exertion, Previously diagnosed with acute
        bronchitis and treated with bronchodilators, empiric antibiotics, and a
        short course oral steroid taper
      </p>
    </div>
  );
};

export default ActiveProblems;
