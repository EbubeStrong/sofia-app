import Link from "next/link";

interface IAuthRegProps {
  description: string;
  path: string;
  label: string;
}

const AuthRegisterAction: React.FC<IAuthRegProps> = ({
  description,
  path,
  label,
}) => {
  return (
    <div className="flex items-center justify-center gap-2 w-full">
      <p className="text-sm md:text-base text-sofia_dark/80 font-normal font-libre_franklin">
        {description}
      </p>
      <Link
        href={path}
        className="text-sm md:text-base font-normal text-[#1175C0] underline underline-offset-[3px] hover:underline hover:text-[#1175C0] font-libre_franklin"
      >
        {label}
      </Link>
    </div>
  );
};

export default AuthRegisterAction;
