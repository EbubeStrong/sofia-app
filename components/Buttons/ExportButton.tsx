import React from "react";
import { TiExport } from "react-icons/ti";

const ExportButton = () => {
  return (
    <button
      type="button"
      className="flex items-center gap-2 bg-[#0F0D00] text-white w-fit h-fit rounded-md px-5 py-3 text-sm font-semibold"
    >
      <TiExport className="text-xl" /> Export
    </button>
  );
};

export default ExportButton;
