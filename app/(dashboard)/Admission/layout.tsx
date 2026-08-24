// app/pharmacy/layout.tsx
"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const AdmissionLayout = ({ children }: Props) => {
  return (
    <section className="min-h-screen">
        {children}
    </section>
  );
};

export default AdmissionLayout;
