"use client";

import React, { useEffect } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";

import { CheckColoredIcon } from "@/assets/icons";
import { useAuthRegStep } from "@/stores/configFormStore";
import BrandLogo from "@/assets/logo/Sofia Central Logo.svg";

type AuthWrapperProps = {
  children: React.ReactNode;
  stepOption?: number;
};

const benefitsOptions = [
  "Seamless care coordination from admission to discharge.",
  "Empowering our clinicians with smarter, faster tools.",
  "Enhancing patient safety with integrated, accurate records.",
  "Unifying our teams with a single source of truth.",
  "Reducing clicks so you can focus on what matters most: patient care.",
  "Making informed decisions faster with intuitive data access.",
  "Streamlining workflows to create a more efficient hospital.",
  "The foundation for a more connected, data-driven future.",
];

const operationSteps = [
  {
    step: 1,
    title: "Licensing and Operations",
    content:
      "Check Your Email: We've sent a default password to your registered email address. Please check your inbox (and spam folder, just in case) for the email from us.",
  },
  // {
  //   step: 2,
  //   title: "Department and Services",
  //   content:
  //     "Please provide us with some details about your business. This information will help us serve you better.",
  // },
  {
    step: 2,
    title: "Insurance and Technology",
    content:
      "Collaborate with your team by inviting them to join.You can always invite more team members later from your.",
  },
  // {
  //   step: 4,
  //   title: "Staffing and Compliance",
  //   content:
  //     "Please provide us with some details about your business. This information will help us serve you better.",
  // },
];

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children, stepOption }) => {
  const pathname = usePathname();

  const { currentStep, setCurrentStep } = useAuthRegStep();

  useEffect(() => {
    switch (pathname) {
      case "/auth/licensing":
        setCurrentStep(1);
        break;
      case "/auth/technology":
        setCurrentStep(2);
        break;
      default:
        break;
    }
  }, [pathname, setCurrentStep]);

  const fallbackLeftPanel = () => (
    <section className="w-full max-w-full md:max-w-[40%] xl:max-w-[50%] bg-[#1D3354] px-5 py-8 lg:px-16 lg:py-10 xl:py-20 hidden xl:flex flex-col justify-start">
      <div className="mb-6">
        <Image
          src={BrandLogo}
          alt="Sofia Central"
          className="w-[60px] h-auto"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold text-white mb-6 md:mb-16 max-w-md">
        Get Access to your Patient&apos;s Medical Records
      </h1>
      <p className="text-lg text-white/70 font-medium max-w-md">
        Use your{" "}
        <span className="text-[#1175C0] font-semibold">Patient&apos;s ID</span>{" "}
        to securely access, view, and manage their medical data on the Sofia
        Digital Health Locker (DHL) Portal
      </p>
    </section>
  );

  const registrationLeftPanel = () => (
    <section className="w-full max-w-full md:max-w-[40%] xl:max-w-[50%] bg-[#1D3354] px-5 py-8 lg:px-16 lg:py-10 xl:py-16 hidden xl:flex flex-col justify-start">
      <div className="mb-6">
        <Image
          src={BrandLogo}
          alt="Sofia Central"
          className="w-[60px] h-auto"
          priority
        />
      </div>

      <h1 className="text-3xl font-bold text-white mb-6 md:mb-16 max-w-md">
        Get Access to your Patient&apos;s Medical Records
      </h1>
      <p className="text-lg text-white font-medium mb-4">Sofia benefits</p>
      <ul className="list-disc flex flex-col gap-3.5 pl-4">
        {benefitsOptions.map((option, index) => (
          <li key={index} className="text-lg text-white font-medium">
            {option}
          </li>
        ))}
      </ul>
    </section>
  );

  const registrationStepsPanel = () => (
    <section className="w-full max-w-full md:max-w-[40%] xl:max-w-[50%] bg-[#1D3354] px-5 py-8 lg:px-16 lg:py-10 xl:py-16 hidden xl:flex flex-col justify-start">
      <div className="mb-6">
        <Image
          src={BrandLogo}
          alt="Sofia Central"
          className="w-[60px] h-auto"
          priority
        />
      </div>

      <div className="mb-12">
        <h1 className="text-3xl font-bold text-white mb-4 max-w-md">
          Streamline Healthcare with Sofia central
        </h1>
        <p className="text-lg text-white/80 font-medium mb-4">
          Healthcare providers can enjoy a more efficient workflow, improve
          patient care, and ultimately achieve better health outcomes for their
          patients.
        </p>
      </div>

      <ul className="flex flex-col gap-12">
        {operationSteps.map((option, index) => (
          <li key={option.step} className="flex gap-3">
            <div className="">
              <div className="w-12 h-12 bg-[#1175C0] text-white font-semibold text-base flex items-center justify-center rounded-full">
                {currentStep >= option.step ? (
                  <CheckColoredIcon color="white" />
                ) : (
                  option.step
                )}
              </div>
              {index !== operationSteps.length - 1 && (
                <div className="w-[2px] h-full ml-6 bg-[#1175C0] opacity-50"></div>
              )}
            </div>
            <div>
              <p className="text-lg text-white font-medium mb-1">
                {option.title}
              </p>
              <p className="text-base text-white/80 font-normal">
                {option.content}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );

  const leftPanelVisible = () => {
    switch (stepOption) {
      case 1:
        return registrationLeftPanel();
      case 2:
        return registrationStepsPanel();
      default:
        return fallbackLeftPanel();
    }
  };

  return (
    <div className="px-5 w-full min-h-screen h-auto flex flex-col justify-center py-8 bg-[#F5F5F5]">
      <div className="flex flex-col xl:flex-row w-full max-w-7xl mx-auto rounded-lg overflow-hidden">
        {leftPanelVisible()}

        <section className="w-full max-w-full md:max-w-[80%] xl:max-w-[50%] my-0 mx-auto">
          {children}
        </section>
      </div>
    </div>
  );
};

export default AuthWrapper;
