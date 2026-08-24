"use client";
import React from "react";
import ReviewVitalSigns from "@/components/Pharmacy/ReviewVitalSigns";


type Props = {
  params: {
    patientId: string;
  };
};

const PharmacyReviewPage = ({ params }: Props) => {
  const { patientId } = params;

  return (
    <ReviewVitalSigns patientId={patientId} />
  );
};

export default PharmacyReviewPage;
