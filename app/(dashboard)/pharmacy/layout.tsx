// app/pharmacy/layout.tsx
"use client";

import React from "react";

type Props = {
  children: React.ReactNode;
};

const PharmacyLayout = ({ children }: Props) => {
  return (
    <section className="min-h-screen">
        {children}
    </section>
  );
};

export default PharmacyLayout;
