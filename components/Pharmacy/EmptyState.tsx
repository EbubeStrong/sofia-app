"use client";

import React from "react";
import Image from "next/image";
import NoPrescription from "@/public/images/pharm-empty-state.svg";


type EmptyStateProps = {
  activeKey: string;
};

const EMPTY_STATE_CONTENT: Record<
  string,
  { title: string; description: string }
> = {
  new: {
    title: "No prescription added",
    description: "All requests for new prescriptions are logged here.",
  },
  reviewed: {
    title: "No prescriptions reviewed yet",
    description: "Prescriptions that have been reviewed will appear here.",
  },
  filled: {
    title: "No prescriptions filled",
    description: "Filled prescriptions will be listed here once available.",
  },
  approved: {
    title: "No approved prescriptions",
    description:
      "Prescriptions approved by the pharmacist will show up here.",
  },
  completed: {
    title: "No completed prescriptions",
    description:
      "Completed prescription requests will be displayed here.",
  },
  archived: {
    title: "No archived prescriptions",
    description:
      "Archived prescriptions are stored here for reference.",
  },
  all: {
    title: "No prescriptions available",
    description:
      "All prescriptions across every stage will appear here.",
  },
};

const EmptyState: React.FC<EmptyStateProps> = ({ activeKey }) => {
  const emptyContent = EMPTY_STATE_CONTENT[activeKey];

  if (!emptyContent) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-200px)] items-center justify-center text-center px-4">
      <Image
        src={NoPrescription}
        alt="No Prescription"
        priority
        className="mb-6"
      />

      <h3 className="text-lg font-semibold text-gray-900 mb-2">
        {emptyContent.title}
      </h3>

      <p className="text-sm text-gray-500 max-w-md">
        {emptyContent.description}
      </p>
    </div>
  );
};

export default EmptyState;
