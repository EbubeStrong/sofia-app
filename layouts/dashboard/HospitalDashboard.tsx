"use client";

import React, { useState } from "react";
import { FaUserPlus } from "react-icons/fa";
import { toast } from "sonner";
import { Form } from "antd";

import SofiaDrawers from "@/components/Drawers";
import {
  DashboardStats,
  DISEASE_DATA,
  TREATMENT_DATA,
} from "@/data/dashboard-data";
import FormInputNested from "@/components/FormElements/FormInputNested";
import { InviteMembersSchema } from "@/components/FormElements/schemas";
import { useFetchRoles } from "@/services/general";
import { useInviteMembers } from "@/services/authenticate";
import BarChartVariant from "@/components/Charts/BarChart";
import LineChartVariant from "@/components/Charts/LineChart";
import StatsCardVariant from "@/components/StatsCardVariant";

type HospitalDashboardProps = {
  currentRole: string;
};

interface FieldProps {
  items: {
    firstName: string;
    lastName: string;
    email: string;
    roleId: number;
  }[];
}

const HospitalDashboard: React.FC<HospitalDashboardProps> = ({
  currentRole,
}) => {
  const [form] = Form.useForm();
  const [openInvite, setOpenInvite] = useState(false);

  const { data: roles, isFetching: isFetchingRoles } =
    useFetchRoles(currentRole);

  const { mutate: inviteMember, isPending: isInvitingMember } =
    useInviteMembers();

  const fetchRoles = roles?.map((role) => ({
    label: role?.name,
    value: role?.id,
  }));

  const handleInviteMember = (values: FieldProps) => {
    const _values = values.items.map((v) => ({
      ...v,
      roleId: Number(v.roleId),
    }));

    const payload = {
      invites: _values,
    };

    inviteMember(
      { body: payload },
      {
        onSuccess: (response) => {
          toast.success(response.message ?? "Invitations sent successfully");
          setOpenInvite(false);
          form.resetFields();
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-7">
      <section className="flex flex-col md:flex-row gap-4">
        <div className="flex-1">
          <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
            Dashboard
          </h1>
          <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
            Comprehensive patient flow management and metrics
          </p>
        </div>

        <button
          type="button"
          onClick={() => setOpenInvite(true)}
          className="w-[140px] h-12 inline-flex items-center justify-center gap-2 bg-[#1175C0] text-white font-semibold rounded-lg"
        >
          <FaUserPlus /> Invite
        </button>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {DashboardStats.map((stat) => (
          <StatsCardVariant
            key={stat.id}
            id={stat.id}
            title={stat.title}
            amount={stat.amount}
            icon={stat.icon}
            // extra={stat.extra}
          />
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 w-full max-w-full gap-5">
        <div className="border border-solid border-dark/20 rounded-lg p-4 bg-white">
          <div className="mb-6">
            <p className="text-base font-semibold text-[#1D2129] leading-normal">
              Patients Treated Over Time
            </p>
            <p className="text-sm text-[#212121]/80 font-normal">
              How many patients each doctor treats monthly
            </p>
          </div>
          <BarChartVariant
            data={TREATMENT_DATA}
            xKey="month"
            bars={[{ dataKey: "value", fill: "#1D3354", name: "Patient" }]}
          />
        </div>

        <div className="border border-solid border-dark/20 rounded-lg p-4 bg-white">
          <div className="mb-6">
            <p className="text-base font-semibold text-[#1D2129] leading-normal">
              Disease distribution
            </p>
            <p className="text-sm text-[#212121]/80 font-normal">
              How many patients each doctor treats monthly
            </p>
          </div>
          <LineChartVariant
            data={DISEASE_DATA}
            xKey="month"
            lines={[
              { dataKey: "malaria", color: "#2563EB", name: "Malaria" },
              { dataKey: "typhoid", color: "#22D3EE", name: "Typhoid" },
            ]}
          />
        </div>
      </section>

      <SofiaDrawers
        title={
          <>
            <p className="text-xl">Invite Team Mates</p>
            <p className="text-sm !font-normal !text-[#101010]/70">
              Collaborate with your team by inviting them to join. You can only
              send 4 invites at once.
            </p>
          </>
        }
        placement="right"
        open={openInvite}
        onClose={() => setOpenInvite(false)}
        width={700}
        maskClosable={true}
        zIndex={1005}
      >
        <FormInputNested
          form={form}
          schema={InviteMembersSchema({
            roleOptions: fetchRoles ?? [],
            roleLoading: isFetchingRoles,
          })}
          formLabel="User"
          btnLabel="Add More"
          onSubmit={handleInviteMember}
          submitBtnLoading={isInvitingMember}
          submitBtnText="Send Invite"
          submitBtnClassName="w-full max-w-full md:max-w-[25%]"
        />
      </SofiaDrawers>
    </div>
  );
};

export default HospitalDashboard;
