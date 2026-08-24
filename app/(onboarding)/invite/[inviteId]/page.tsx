import React from "react";

import AuthWrapper from "@/components/Dashboard/AuthWrapper";
import InviteLayout from "@/layouts/auth/InviteLayout";
import { fetchHospitals } from "@/hooks/use-server-fetchers";
import { HospitalByIdResponse } from "@/interfaces/general";

export type TInviteMemberProps = {
  params: { inviteId: string };
  searchParams: { email: string; hospitalId: string };
};

const InviteMembersModule: React.FC<TInviteMemberProps> = async ({
  params,
  searchParams,
}) => {
  const inviteId = params.inviteId;
  const emailParam = searchParams.email;
  const hospitalIdParam = searchParams.hospitalId;

  const hospitals = await fetchHospitals(hospitalIdParam);

  return (
    <AuthWrapper>
      <InviteLayout
        inviteId={inviteId}
        emailParam={emailParam}
        hospitals={hospitals?.data as HospitalByIdResponse["data"]}
      />
    </AuthWrapper>
  );
};

export default InviteMembersModule;
