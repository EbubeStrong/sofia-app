"use client";

import React, { useEffect, useState } from "react";

import SofiaCallRoom from "@/components/ConferenceCall";
import storage from "@/config/storage";
import { UserInfoResponse } from "@/interfaces/general";

const TelemedicineLayout = () => {
  const [user, setUser] = useState({} as UserInfoResponse);
  const [isLoading, setIsLoading] = useState(true);

  const userID = user?.doctorId ?? "";
  const userName = `${user?.firstName} ${user?.lastName}`;

  useEffect(() => {
    const user = storage.getUser();
    if (user) setUser(user);
  }, []);

  useEffect(() => {
    // Set a 2-second timeout
    const loadingTimer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    // Cleanup function
    return () => clearTimeout(loadingTimer);
  }, []);

  if (isLoading && !userID) {
    return (
      <div className="w-full h-[100vh] flex flex-col items-center justify-center bg-[#F4F6F8] gap-4">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#1175C0]"></div>
        <p className="text-[#1175C0] font-medium">Initializing video call...</p>
      </div>
    );
  }

  return <SofiaCallRoom userId={userID} userName={userName} />;
};

export default TelemedicineLayout;
