"use client";

import React, { useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { Form } from "antd";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import FormInput from "@/components/FormElements/FormInput";
import { SearchIcon } from "@/assets/icons";
import SofiaPagination from "@/components/Pagination";
import SofiaDropdown from "@/components/Dropdowns";
import TagVariant from "@/components/TagVariant";
import SofiaDrawers from "@/components/Drawers";
import FormConfig from "@/components/FormElements/FormConfig";
import { WardSetupSchema } from "@/components/FormElements/schemas";
import {
  useFetchDepartments,
  useFetchWards,
  useWards,
} from "@/services/configuration";
import { invalidateQuery } from "@/config/query-client";
import { TWardsResp } from "@/interfaces/configuration";
import WardCardSkeleton from "@/components/Skeletons/WardSkeleton";
import EmptyTable from "@/components/Tables/EmptyTable";

interface WardLayoutProps {
  initialData: TWardsResp["data"];
}

interface FieldProps {
  wardName: string;
  wardCode: string;
  department: string;
  floor: string;
  capacity: string;
  description: string;
}

const items = [
  {
    label: "Edit ward",
    key: 1,
  },
  {
    label: "Delete ward",
    key: 2,
  },
];

const WardLayout: React.FC<WardLayoutProps> = ({ initialData }) => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openWardForm, setOpenWardForm] = useState(false);

  const { mutate, isPending } = useWards();

  const { data: departments, isFetching: isFetchingDepartments } =
    useFetchDepartments();

  const { data: wards, isFetching: isFetchingWards } =
    useFetchWards(initialData);

  const fetchDepartments = departments?.data?.map((dept) => ({
    label: dept?.departmentName,
    value: dept?.id,
  }));

  const handleSubmitWards = (values: FieldProps) => {
    const { wardName, wardCode, floor, department, description, capacity } =
      values;

    const payload = {
      name: wardName,
      code: wardCode,
      departmentId: department,
      floor: Number(floor),
      capacity: Number(capacity),
      description: description,
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenWardForm(false);
          form.resetFields();
          invalidateQuery(["wards"]);
          return;
        },
      }
    );
  };

  const count = wards?.data?.length || 10;

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    params.set("page_size", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          All wards ({wards?.totalCount ?? 0})
        </p>
        <button
          type="button"
          onClick={() => setOpenWardForm(true)}
          className="px-5 py-3 text-sm inline-flex items-center justify-center gap-1.5 bg-[#1175C0] text-white font-semibold rounded-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full md:w-[350px]">
          <FormInput
            placeholder="Search by wards"
            prefix={<SearchIcon />}
            cssProps={{ $height: "38px" }}
            disabled={wards?.data?.length === 0}
          />
        </div>

        {isFetchingWards ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {Array.from({ length: count }).map((_, i) => (
              <WardCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {wards && wards?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {wards?.data?.map((ward) => (
                  <div
                    key={ward?.id}
                    className="flex flex-col gap-4 p-4 bg-white border border-solid border-[#101010]/10 rounded-lg"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-base text-black font-semibold">
                          {ward?.name ?? "---"}
                        </p>
                        <p className="text-sm text-[#101010]/70 font-medium">
                          {ward?.department ?? "---"} • Floor{" "}
                          {ward?.floor ?? "---"}
                        </p>
                        <div className="mt-3 flex flex-col gap-1.5">
                          <p className="text-sm text-[#101010]">
                            Capacity:{" "}
                            <span className="text-sm text-[#101010]/60">
                              {ward?.capacity ?? "---"} beds
                            </span>
                          </p>
                          <p className="text-sm text-[#101010]">
                            {ward?.description ?? "---"}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start gap-1">
                        <div>
                          <TagVariant
                            color="default"
                            label={ward?.code ?? "---"}
                            className="!rounded-full !text-sm !py-0.5 !px-3 !font-libre_franklin"
                          />
                        </div>
                        <SofiaDropdown
                          items={items}
                          label={
                            <button className="mt-1">
                              <BsThreeDotsVertical />
                            </button>
                          }
                        />
                      </div>
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

        {(wards?.data?.length ?? 0) > 0 && (
          <SofiaPagination
            onChange={handlePageChange}
            align="end"
            current={wards?.page ?? 1}
            pageSize={wards?.perPage ?? 10}
            total={wards?.totalCount}
          />
        )}
      </div>

      <SofiaDrawers
        title={<p className="text-xl">Add Ward</p>}
        placement="right"
        open={openWardForm}
        onClose={() => setOpenWardForm(false)}
        width={600}
        maskClosable={true}
        zIndex={1005}
      >
        <FormConfig
          form={form}
          schema={WardSetupSchema({
            deptOptions: fetchDepartments ?? [],
            deptLoading: isFetchingDepartments,
          })}
          onSubmit={handleSubmitWards}
          btnText="Add Ward"
          twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
          btnLoading={isPending}
          formName="ward-setup-form"
        />
      </SofiaDrawers>
    </div>
  );
};

export default WardLayout;
