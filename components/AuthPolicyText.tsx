import Link from "next/link";

type AuthPolicyContentProps = {
  text: string;
};

export const AuthPolicyContent: React.FC<AuthPolicyContentProps> = ({
  text,
}) => {
  return (
    <p className="text-sm md:text-base text-sofia_dark/80 font-normal font-libre_franklin">
      By clicking <span className="font-medium">{text}</span> you agree to sofia
      central{" "}
      <Link
        className="text-sm md:text-base font-normal text-[#1175C0] underline underline-offset-[3px] hover:underline hover:text-[#1175C0] font-libre_franklin"
        href="#link"
      >
        terms of service
      </Link>{" "}
      and{" "}
      <Link
        className="text-sm md:text-base font-normal text-[#1175C0] underline underline-offset-[3px] hover:underline hover:text-[#1175C0] font-libre_franklin"
        href="#link"
      >
        privacy policy
      </Link>
    </p>
  );
};
