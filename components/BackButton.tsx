"use client";

import { useRouter } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";

interface IBackButtonProp {
  children: React.ReactNode;
  toPath?: string;
}

const BackButton: React.FC<IBackButtonProp> = ({ children, toPath }) => {
  const router = useRouter();

  const handlePageRoute = () => {
    const path = toPath ? router.push(toPath) : router.back();
    return path;
  };

  return (
    <button
      type="button"
      onClick={handlePageRoute}
      className="flex items-center gap-1.5 text-base font-semibold text-sofia_dark font-libre_franklin"
      aria-label={
        typeof children === "string" ? `Go back: ${children}` : "Go back"
      }
    >
      <IoArrowBack className="text-xl" aria-hidden="true" />
      {children}
    </button>
  );
};

export default BackButton;
