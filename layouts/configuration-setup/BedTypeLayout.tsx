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
import { BedSetupSchema } from "@/components/FormElements/schemas";
import { invalidateQuery } from "@/config/query-client";
import {
  useBeds,
  useFetchBeds,
  useFetchBedTypes,
  useFetchRooms,
} from "@/services/configuration";
import { TBedsResp } from "@/interfaces/configuration";
import EmptyTable from "@/components/Tables/EmptyTable";
import WardCardSkeleton from "@/components/Skeletons/WardSkeleton";

interface BedLayoutProps {
  initialData: TBedsResp["data"];
}

interface FieldProps {
  bedNumber_bed: string;
  roomType_bed: string;
  bedType_bed: string;
  features_bed: string;
  equipments_bed: string;
}

const items = [
  {
    label: "Edit bed",
    key: 1,
  },
  {
    label: "Delete bed",
    key: 2,
  },
];

const BedTypeLayout: React.FC<BedLayoutProps> = ({ initialData }) => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openBedTypeForm, setOpenBedTypeForm] = useState(false);

  const { mutate, isPending } = useBeds();

  const { data: bedTypes, isFetching: isFetchingBedTypes } = useFetchBedTypes();

  const { data: beds, isFetching: isFetchingBeds } = useFetchBeds(initialData);

  const { data: rooms, isFetching: isFetchingRooms } = useFetchRooms();

  const fetchBedTypes = bedTypes?.map((type) => ({
    label: type?.name,
    value: String(type?.id),
  }));

  const fetchRooms = rooms?.data?.map((room) => ({
    label: room?.roomNumber,
    value: String(room?.id),
  }));

  const count = beds?.data?.length || 10;

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    params.set("page_size", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSubmitBeds = (values: FieldProps) => {
    const {
      bedNumber_bed,
      roomType_bed,
      bedType_bed,
      features_bed,
      equipments_bed,
    } = values;

    const payload = {
      bedNumber: bedNumber_bed,
      roomId: roomType_bed,
      bedTypeId: Number(bedType_bed),
      features: features_bed,
      equipments: equipments_bed,
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenBedTypeForm(false);
          form.resetFields();
          invalidateQuery(["beds"]);
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          All beds ({beds?.totalCount ?? 0})
        </p>
        <button
          type="button"
          onClick={() => setOpenBedTypeForm(true)}
          className="px-6 py-3 text-sm inline-flex items-center justify-center gap-1.5 bg-[#1175C0] text-white font-semibold rounded-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full md:w-[350px]">
          <FormInput
            placeholder="Search by beds"
            prefix={<SearchIcon />}
            cssProps={{ $height: "38px" }}
            disabled={beds?.data?.length === 0}
          />
        </div>

        {isFetchingBeds ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {Array.from({ length: count }).map((_, i) => (
              <WardCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {beds && beds?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {beds?.data?.map((bed) => (
                  <div
                    key={bed?.id}
                    className="flex flex-col gap-4 p-4 bg-white border border-solid border-[#101010]/10 rounded-lg"
                  >
                    <div className="flex justify-between relative">
                      <div>
                        <p className="text-base text-black font-semibold">
                          {bed?.bedNumber ?? "---"}
                        </p>

                        <div className="mt-3 flex flex-col gap-2">
                          <p className="text-sm text-[#101010]">
                            Bed Type:{" "}
                            <span className="text-sm text-[#101010]/60">
                              {bed?.bedTypeName ?? "---"}
                            </span>
                          </p>
                          <p className="text-sm text-[#101010]">
                            Occupied:{" "}
                            <span className="text-sm text-[#101010]/60">
                              {bed?.isOccupied ? "Yes" : "No"}
                            </span>
                          </p>
                          <div>
                            <p className="text-sm text-[#101010] mb-1.5">
                              Features:
                            </p>
                            <div className="flex flex-wrap gap-y-2">
                              {bed?.features?.map((f) => (
                                <TagVariant
                                  key={f}
                                  color="default"
                                  label={f}
                                  className="!rounded-full !text-sm !py-0.5 !px-3 !font-libre_franklin"
                                />
                              ))}
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-[#101010] mb-1.5">
                              Equipment:
                            </p>
                            <div className="flex flex-wrap gap-y-2">
                              {bed?.equipments?.map((e) => (
                                <TagVariant
                                  key={e}
                                  color="default"
                                  label={e}
                                  className="!rounded-full !text-sm !py-0.5 !px-3 !font-libre_franklin"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 flex items-start gap-1">
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

        {(beds?.data?.length ?? 0) > 0 && (
          <SofiaPagination
            onChange={handlePageChange}
            align="end"
            current={beds?.page ?? 1}
            pageSize={beds?.perPage ?? 10}
            total={beds?.totalCount}
          />
        )}
      </div>

      <SofiaDrawers
        title={<p className="text-xl">Add Bed</p>}
        placement="right"
        open={openBedTypeForm}
        onClose={() => setOpenBedTypeForm(false)}
        width={600}
        maskClosable={true}
        zIndex={1005}
      >
        <FormConfig
          form={form}
          schema={BedSetupSchema({
            bedTypeOptions: fetchBedTypes ?? [],
            bedTypeLoading: isFetchingBedTypes,
            roomTypeOptions: fetchRooms ?? [],
            roomTypeLoading: isFetchingRooms,
          })}
          onSubmit={handleSubmitBeds}
          btnText="Add Bed"
          twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
          btnLoading={isPending}
          formName="ward-setup-form"
        />
      </SofiaDrawers>
    </div>
  );
};

export default BedTypeLayout;
