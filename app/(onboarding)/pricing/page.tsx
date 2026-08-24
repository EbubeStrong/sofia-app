"use client";

import React, { useState } from "react";

import AuthNavigation from "@/components/Dashboard/AuthNavigation";
import PricingCard from "@/components/PricingCard";
import SegmentedVariant from "@/components/SegmentedVariant";
import {
  annualPricingOptions,
  monthlyPricingOptions,
  planOptions,
} from "@/data/pricing";

const PricingModule = () => {
  const [selected, setSelected] = useState<string>("");
  const [plan, setPlan] = useState<string>("monthly");

  return (
    <main className="px-5 pt-32 pb-28 xl:pt-36 bg-[#F5F5F5]">
      <AuthNavigation />

      <div className="flex flex-col gap-10 w-full bg-white px-6 py-8 max-w-7xl mx-auto rounded-lg">
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <h1 className="text-2xl xl:text-4xl font-bold text-[#1D3354] mb-1">
              Choose the right plan for your team
            </h1>
            <p className="text-base text-[#010101B2] max-w-2xl">
              There are many variations of passages of Lorem Ipsum available,
              but the majority have suffered alteration in
            </p>
          </div>
          <button className="text-base w-fit font-semibold bg-[#1175C0] h-12 px-10 xl:px-16 text-white rounded-xl">
            Next
          </button>
        </div>

        <div className="flex justify-end">
          <SegmentedVariant
            options={planOptions}
            onChange={(value) => {
              setPlan(value as string);
            }}
            value={plan}
            size="middle"
            shape="round"
          />
        </div>

        {plan === "monthly" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {monthlyPricingOptions.map((option) => (
              <PricingCard
                key={option.type}
                option={option}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        )}
        {plan === "annually" && (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {annualPricingOptions.map((option) => (
              <PricingCard
                key={option.type}
                option={option}
                selected={selected}
                setSelected={setSelected}
              />
            ))}
          </div>
        )}

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <p className="text-sm font-medium text-[#010101B2]">
            Signing up as{" "}
            <span className="text-[#1175C0]">
              davidudemezue@sofiamatics.com
            </span>
          </p>
        </div>
      </div>
    </main>
  );
};

export default PricingModule;
