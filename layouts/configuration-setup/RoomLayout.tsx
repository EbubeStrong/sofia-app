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
import { RoomSetupSchema } from "@/components/FormElements/schemas";
import {
  useFetchRooms,
  useFetchRoomTypes,
  useFetchWards,
  useRooms,
} from "@/services/configuration";
import { invalidateQuery } from "@/config/query-client";
import { TRoomsResp } from "@/interfaces/configuration";
import EmptyTable from "@/components/Tables/EmptyTable";
import WardCardSkeleton from "@/components/Skeletons/WardSkeleton";

interface RoomsLayoutProps {
  initialData: TRoomsResp["data"];
}

interface FieldProps {
  roomNumber_room: string;
  ward_room: string;
  roomType_room: string;
  privateBathroom_room: string;
  features_room: string;
  capacity_room: string;
}

const items = [
  {
    label: "Edit room",
    key: 1,
  },
  {
    label: "Delete room",
    key: 2,
  },
];

const RoomLayout: React.FC<RoomsLayoutProps> = ({ initialData }) => {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [openRoomForm, setOpenRoomForm] = useState(false);

  const { mutate, isPending } = useRooms();

  const { data: wards, isFetching: isFetchingWards } = useFetchWards();

  const { data: roomTypes, isFetching: isFetchingRoomTypes } =
    useFetchRoomTypes();

  const { data: rooms, isFetching: isFetchingRooms } =
    useFetchRooms(initialData);

  const fetchWards = wards?.data?.map((ward) => ({
    label: ward?.name,
    value: ward?.id,
  }));

  const fetchRoomTypes = roomTypes?.map((type) => ({
    label: type?.name,
    value: String(type?.id),
  }));

  const count = rooms?.data?.length || 10;

  const handlePageChange = (page: number, pageSize: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page_number", page.toString());
    params.set("page_size", pageSize.toString());
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handleSubmitRooms = (values: FieldProps) => {
    const {
      roomNumber_room,
      ward_room,
      roomType_room,
      privateBathroom_room,
      features_room,
      capacity_room,
    } = values;

    const payload = {
      roomNumber: roomNumber_room,
      wardId: ward_room,
      roomTypeId: Number(roomType_room),
      hasPrivateBathroom: privateBathroom_room === "Yes",
      features: features_room,
      capacity: Number(capacity_room),
    };

    mutate(
      { body: payload },
      {
        onSuccess: () => {
          setOpenRoomForm(false);
          form.resetFields();
          invalidateQuery(["rooms"]);
          return;
        },
      }
    );
  };

  return (
    <div className="flex flex-col gap-4 bg-white border border-solid border-dark/20 p-4 rounded-lg">
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">
          All rooms ({rooms?.totalCount ?? 0})
        </p>
        <button
          type="button"
          onClick={() => setOpenRoomForm(true)}
          className="px-5 py-3 text-sm inline-flex items-center justify-center gap-1.5 bg-[#1175C0] text-white font-semibold rounded-lg"
        >
          <FaPlus /> Add New
        </button>
      </div>

      <div className="flex flex-col gap-6">
        <div className="w-full md:w-[350px]">
          <FormInput
            placeholder="Search by rooms"
            prefix={<SearchIcon />}
            cssProps={{ $height: "38px" }}
            disabled={rooms?.data?.length === 0}
          />
        </div>

        {isFetchingRooms ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
            {Array.from({ length: count }).map((_, i) => (
              <WardCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <>
            {rooms && rooms?.data?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-5">
                {rooms?.data?.map((room) => (
                  <div
                    key={room?.id}
                    className="flex flex-col gap-4 p-4 bg-white border border-solid border-[#101010]/10 rounded-lg"
                  >
                    <div className="flex justify-between relative">
                      <div>
                        <p className="text-base text-black font-semibold">
                          {room?.roomNumber ?? "---"}
                        </p>
                        <p className="text-sm text-[#101010]/70 font-medium">
                          {room.wardName ?? "---"}
                        </p>

                        <div className="mt-3 flex flex-col gap-1.5">
                          <p className="text-sm text-[#101010]">
                            Capacity:{" "}
                            <span className="text-sm text-[#101010]/60">
                              {room?.capacity ?? "---"} beds
                            </span>
                          </p>
                          <p className="text-sm text-[#101010]">
                            Private bathroom:{" "}
                            <span className="text-sm text-[#101010]/60">
                              {room.hasPrivateBathroom ? "Yes" : "No"}
                            </span>
                          </p>
                          <div>
                            <p className="text-sm text-[#101010] mb-1.5">
                              Features:
                            </p>
                            <div className="flex flex-wrap gap-y-2">
                              {room?.features?.map((f) => (
                                <TagVariant
                                  key={f}
                                  color="default"
                                  label={f}
                                  className="!rounded-full !text-sm !py-0.5 !px-3 !font-libre_franklin"
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 flex items-start gap-1">
                        <TagVariant
                          color="default"
                          label={room.roomTypeName ?? "---"}
                          className="!rounded-full !text-sm !py-0.5 !px-3 !font-libre_franklin"
                        />
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

        {(rooms?.data?.length ?? 0) > 0 && (
          <SofiaPagination
            onChange={handlePageChange}
            align="end"
            current={rooms?.page ?? 1}
            pageSize={rooms?.perPage ?? 10}
            total={rooms?.totalCount}
          />
        )}
      </div>

      <SofiaDrawers
        title={<p className="text-xl">Add Room</p>}
        placement="right"
        open={openRoomForm}
        onClose={() => setOpenRoomForm(false)}
        width={600}
        maskClosable={true}
        zIndex={1005}
      >
        <FormConfig
          form={form}
          schema={RoomSetupSchema({
            wardOptions: fetchWards ?? [],
            wardLoading: isFetchingWards,
            roomTypeOptions: fetchRoomTypes ?? [],
            roomTypeLoading: isFetchingRoomTypes,
          })}
          onSubmit={handleSubmitRooms}
          btnText="Add Room"
          twClassStyle="grid grid-cols-1 xl:grid-cols-2 gap-x-4"
          btnLoading={isPending}
          formName="ward-setup-form"
        />
      </SofiaDrawers>
    </div>
  );
};

export default RoomLayout;
