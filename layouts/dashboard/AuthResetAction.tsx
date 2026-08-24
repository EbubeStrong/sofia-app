import Link from "next/link";

interface IAuthResetProps {
  description: string;
  path: string;
  label: string;
}

const AuthResetAction: React.FC<IAuthResetProps> = ({
  description,
  path,
  label,
}) => {
  return (
    <div className="flex items-center justify-end gap-2 w-full mb-4">
      <p className="text-sm md:text-base text-sofia_dark/80 font-normal font-libre_franklin">
        {description}
      </p>
      <Link
        href={path}
        className="text-sm md:text-base font-normal text-[#1175C0] underline underline-offset-2 hover:text-[#1175C0] hover:underline font-libre_franklin"
      >
        {label}
      </Link>
    </div>
  );
};

export default AuthResetAction;
