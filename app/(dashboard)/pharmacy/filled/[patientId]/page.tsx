"use client";
import PharmacyFormDetails from "@/components/Pharmacy/PharmacyFormDetails";
import { useParams } from "next/navigation"; // Next.js 13 app router
import React from "react";

const PharmacyFilledPage = () => {
  const params = useParams();
  let patientId = params.patientId;

  if (Array.isArray(patientId)) {
    patientId = patientId[0]; 
  }

  return <PharmacyFormDetails tab="filled"  initialPatientId={patientId} />;
};

export default PharmacyFilledPage;
