"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

import { CheckIconLg } from "@/assets/icons";
import { HospitalByIdResponse } from "@/interfaces/general";
import { ROUTE_PATH } from "@/utils/constants";
import Loader from "@/components/Loader";

type TOnboardingCompletionProps = {
  hospitals: HospitalByIdResponse["data"];
};

const OnboardingCompletionLayout: React.FC<TOnboardingCompletionProps> = ({
  hospitals,
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleCompleteOnboarding = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      router.push(ROUTE_PATH.DASHBOARD.DASHBOARD_PATH);
    }, 2000);
  };

  return (
    <div className="flex flex-col xl:justify-start w-full h-full bg-white xl:min-h-[calc(100vh-48px)] px-5 py-8 lg:px-16 lg:py-10 xl:py-24">
      <div className="w-full flex justify-center mb-10">
        <CheckIconLg />
      </div>

      <div className="mb-10">
        <h1 className="text-xl lg:text-3xl text-[#101010] text-center font-semibold leading-tight mb-5">
          Great Job
        </h1>
        <p className="text-sm md:text-base xl:text-2xl text-[#212121]/80 text-center font-medium mb-2">
          Welcome, {hospitals.hospitalName ?? "---"}
        </p>
        <p className="text-sm md:text-base text-[#212121]/80 text-center font-medium mb-2">
          You&apos;ve successfully completed your onboarding. We&apos;re excited
          to have you onboard. Let&apos;s begin delivering exceptional care
          together.
        </p>
      </div>

      <button
        type="button"
        onClick={handleCompleteOnboarding}
        className="flex items-center justify-center bg-[#1175C0] text-base font-semibold text-white h-14 rounded-xl"
      >
        {loading ? <Loader color="#fff" /> : "Go to Dashboard"}
      </button>
    </div>
  );
};

export default OnboardingCompletionLayout;
