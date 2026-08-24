"use client";

import React, { Suspense, useMemo, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { ColumnType } from "antd/es/table";
import dayjs from "dayjs";

import { DepartmentTableColumns } from "@/data/configuration-data";
import SofiaDrawers from "@/components/Drawers";
import SofiaTable from "@/components/Tables/SofiaTable";
import FormInput from "@/components/FormElements/FormInput";
import { SearchIcon } from "@/assets/icons";
import { useIsMobile } from "@/utils/detectDeviceScreen";
import { Form } from "antd";
import { DepartmentSetupSchema } from "@/components/FormElements/schemas";
import FormInputNested from "@/components/FormElements/FormInputNested";
import { useDepartments, useFetchDepartments } from "@/services/configuration";
import { TDepartmentsResp } from "@/interfaces/configuration";
import { invalidateQuery } from "@/config/query-client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

interface FieldProps {
  items: {
    departmentName: string;
    isCenterOfExcellence: boolean;
  }[];
}

interface DeptLayoutProps {
  initialData: TDepartmentsResp["data"];
}

const DepartmentLayout: React.FC<DeptLayoutProps> = ({ initialData }) => {
  const [form] = Form.useForm();
  const isMobile = useIsMobile(1440);
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openDepartmentForm, setOpenDepartmentForm] = useState(false);

  const { mutate, isPending } = useDepartments();

  const { data: departments, isFetching: isFetchingDepartments } =
    useFetchDepartments(initialData);

  const columns = useMemo(() => DepartmentTableColumns(), []);

  const scrollConfig = useMemo(
    () => (isMobile ? { x: "max-content" } : undefined),
    [isMobile]
  );

  const departmentData = departments?.data?.map((dept) => ({
    key: dept?.id,
    id: dept?.id,
    name: dept?.departmentName ?? "---",
    status: dept?.isCenterOfExcellence ? "Yes" : "No",
    staffCount: dept?.staffCount ?? "---",
    addedBy: "---",
    dateAdded: dept?.createdAt
      ? dayjs(dept?.createdAt).format("MMMM D, YYYY")
      : "---",
  }));

  const handleSubmitDepartment = (values: FieldProps) => {
    const _values = values.items.map((item) => ({
      ...item,
      isCenterOfExcellence: item.isCenterOfExcellence ?? false,
    }));

    const payload = {
      departments: _values,
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenDepartmentForm(false);
          form.resetFields();
          invalidateQuery(["departments"]);
          return;
        },
      }
    );
  };

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
      <div className="flex justify-between">
        <p className="text-lg font-semibold">
          All departments ({departments?.totalCount ?? 0})
        </p>
        <button
          type="button"
          onClick={() => setOpenDepartmentForm(true)}
          className="px-5 py-3 text-sm inline-flex items-center justify-center gap-1.5 bg-[#1175C0] text-white font-semibold rounded-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>

      <div>
        <div className="w-full md:w-[350px] mb-4">
          <FormInput
            placeholder="Search departments"
            prefix={<SearchIcon />}
            cssProps={{ $height: "38px" }}
          />
        </div>

        <Suspense>
          <SofiaTable
            columns={columns as ColumnType[]}
            dataSource={departmentData ?? []}
            loading={isFetchingDepartments}
            onChange={handlePageChange}
            currentPage={departments?.page}
            pageSize={departments?.perPage}
            pageTotal={departments?.totalCount ?? 0}
            scroll={scrollConfig}
          />
        </Suspense>
      </div>

      <SofiaDrawers
        title={<p className="text-xl">Add Department</p>}
        placement="right"
        open={openDepartmentForm}
        onClose={() => setOpenDepartmentForm(false)}
        width={600}
        maskClosable={true}
        zIndex={1005}
      >
        <FormInputNested
          form={form}
          schema={DepartmentSetupSchema()}
          formLabel="Department"
          btnLabel="Add More"
          onSubmit={handleSubmitDepartment}
          submitBtnLoading={isPending}
          submitBtnText="Save"
          submitBtnClassName="w-full max-w-full"
        />
      </SofiaDrawers>
    </div>
  );
};

export default DepartmentLayout;
