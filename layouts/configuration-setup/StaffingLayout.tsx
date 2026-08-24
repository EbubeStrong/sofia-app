"use client";

import React, { ChangeEvent, useEffect, useState } from "react";
import dayjs from "dayjs";

import FormInputNumber from "@/components/FormElements/FormInputNumber";
import { TDepartmentsResp } from "@/interfaces/configuration";
import { useFetchDepartments } from "@/services/configuration";
import EmptyTable from "@/components/Tables/EmptyTable";
import Loader from "@/components/Loader";

interface StaffingLayoutProps {
  initialData: TDepartmentsResp["data"];
}

interface IStaffProps {
  id: string;
  department: string;
  createdAt: Date;
  count: string;
}

const StaffingLayout: React.FC<StaffingLayoutProps> = ({ initialData }) => {
  const [staffingOptions, setStaffingOptions] = useState<IStaffProps[]>([]);

  const { data: departments, isFetching: isFetchingDepartments } =
    useFetchDepartments(initialData);

  useEffect(() => {
    if (departments?.data) {
      setStaffingOptions(
        departments?.data?.map((dept) => ({
          id: dept?.id,
          department: dept?.departmentName,
          createdAt: dept?.createdAt,
          count: String(dept?.staffCount ?? 0),
        }))
      );
    }
  }, [departments]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>, id: string) => {
    setStaffingOptions((prevOption) =>
      prevOption.map((option) =>
        option.id === id ? { ...option, count: e.target.value } : option
      )
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-solid border-dark/20 px-4 py-6 pb-10 rounded-lg">
      <h2 className="text-lg font-semibold">All staffs</h2>

      {isFetchingDepartments ? (
        <div className="flex justify-center py-24">
          <Loader />
        </div>
      ) : (
        <>
          {departments && departments?.data?.length > 0 ? (
            <div className="flex flex-col gap-6">
              {staffingOptions.map(({ id, department, createdAt, count }) => (
                <div key={id} className="grid grid-cols-2 items-end">
                  <div>
                    <p className="text-base text-[#101010] font-semibold">
                      {department}
                    </p>
                    <p className="text-sm text-[#101010]/70">
                      Added{" "}
                      {createdAt
                        ? dayjs(createdAt).format("MMMM D, YYYY")
                        : "---"}
                    </p>
                  </div>
                  <div>
                    <FormInputNumber
                      onChange={(e) => handleInputChange(e, id)}
                      value={count}
                      label="Staff count"
                      disabled
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center">
              <EmptyTable
                message="No records found"
                description="Actions on the records appear here"
              />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default StaffingLayout;
