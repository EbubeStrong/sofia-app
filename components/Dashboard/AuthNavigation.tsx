import React from "react";
import Image from "next/image";
import Link from "next/link";

import BrandLogo from "@/assets/logo/Sofia Central Logo.svg";
import { ROUTE_PATH } from "@/utils/constants";

type TAuthNavProps = {
  stepOptions?: number;
};

const AuthNavigation: React.FC<TAuthNavProps> = ({ stepOptions }) => {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 w-full h-[84px] bg-white border border-b-[#2121211A] px-5">
      <div className="h-full flex items-center justify-between max-w-7xl mx-auto">
        <div className="flex-1">
          <Image
            src={BrandLogo}
            alt="Sofia Central Logo"
            className="w-[54px] h-auto"
            priority
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <p className="hidden md:block text-base text-[#666666]">
            {[1, 2].includes(stepOptions!)
              ? "Already have an account?"
              : "Don't have an account?"}
          </p>
          <Link
            href={
              [1, 2].includes(stepOptions!)
                ? ROUTE_PATH.LOGIN
                : ROUTE_PATH.REGISTER.REGISTER_PATH
            }
            className="font-semibold text-white bg-[#1175C0] py-2.5 px-12 rounded-lg w-fit"
          >
            {[1, 2].includes(stepOptions!) ? "Sign In" : "Sign Up"}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthNavigation;
