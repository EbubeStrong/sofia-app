"use client";
import PharmacyFormDetails from "@/components/Pharmacy/PharmacyFormDetails";
import { useParams } from "next/navigation"; // Next.js 13 app router
import React from "react";

const PharmacyApprovedPage = () => {
  const params = useParams();
  let patientId = params.patientId;

  if (Array.isArray(patientId)) {
    patientId = patientId[0]; // take first if it's an array
  }

  return <PharmacyFormDetails tab="approved"  initialPatientId={patientId} />;
};

export default PharmacyApprovedPage;
