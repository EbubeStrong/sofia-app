"use client";

import { CheckIcon } from "@/assets/icons";
import TagVariant from "./TagVariant";
import { formatToCurrency } from "@/utils/format-currency";

export type TPricingOptions = {
  title: string;
  type: string;
  pricing: string;
  pricingDesc: string;
  btnDesc: string;
  features: string[];
};

type TPricingCardProps = {
  option: TPricingOptions;
  selected: string | null;
  setSelected: (type: string) => void;
};

const PricingCard: React.FC<TPricingCardProps> = ({
  option,
  selected,
  setSelected,
}) => {
  return (
    <div className="flex flex-col border border-solid border-[#1175C033] rounded-2xl bg-white p-1">
      <div className="flex flex-col gap-3 rounded-2xl bg-[#00A1FF1A] px-4 py-6 xl:h-[216px]">
        <div className="flex items-center justify-between">
          <p className="font-medium text-[#111111] text-base md:text-xl">
            {option.title}
          </p>
          {selected === option.type && (
            <TagVariant color="success" label="Selected" />
          )}
        </div>
        <div className="mb-3">
          <p className="font-semibold text-[#111111] text-3xl">
            {formatToCurrency(Number(option.pricing), "NGN")}
          </p>
          <p className="text-sm text-[#111111] font-medium">
            {option.pricingDesc}
          </p>
        </div>
        <button
          onClick={() => {
            setSelected(option.type);
          }}
          className="w-full h-12 bg-[#1175C0] text-white text-base font-semibold rounded-xl"
        >
          {option.btnDesc}
        </button>
      </div>
      <ul className="p-4 md:p-6 flex flex-col gap-2">
        <p className="text-base text-[#010101] font-medium mb-1">Features</p>
        {option.features.map((feature, index) => (
          <li
            key={index}
            className="text-sm text-[#010101] font-medium flex items-start gap-2"
          >
            <div>
              <CheckIcon />
            </div>{" "}
            <div className="flex-1">{feature}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PricingCard;
