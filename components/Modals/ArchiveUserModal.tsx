import { Modal } from "antd";
import React from "react";
import { RiDeleteBin3Fill } from "react-icons/ri";

export default function ArchiveUserModal({
  open,
  onOk,
  onCancel,
}: {
  open: boolean;
  onOk: () => void;
  onCancel: () => void;
}) {
  return (
    <Modal
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={624}
      footer={null}
    >
      <div className="bg-white rounded py-6 md:py-10 px-4 md:px-8">
        <div className="w-[70px] h-[70px] flex items-center justify-center bg-[#D91F110D] rounded-full text-[#D91F11] text-[27px]">
          <RiDeleteBin3Fill />
        </div>
        <h4 className="text-2xl text-sofia_dark font-bold mt-5 mb-4">
          Archived User
        </h4>
        <p className="text-sm text-title leading-[19.6px] font-medium">
          Archiving a user means they will no longer have access to Sofia.
          Conduct an interview to gather the patient&apos;s medical history,
          including past illnesses, surgeries, allergies, medications, and
          family medical history. The patient&apos;s chief complaint or reason
          for the current visit is documented.
        </p>
        <div className="grid grid-cols-2 gap-6 mt-10">
          <button
            className="bg-[#D91F11] text-white text-sm font-semibold py-3 px-4 rounded-[10px]"
            onClick={onOk}
          >
            Archive
          </button>
          <button
            className="bg-[#1010100D] text-[#10101066] text-sm font-semibold py-3 px-4 rounded-[10px]"
            onClick={onOk}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}
