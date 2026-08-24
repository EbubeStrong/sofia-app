import { Modal } from "antd";
import React from "react";

const planList = [
  {
    title: "Free",
    price: 0,
    btnText: "Your Current Plan",
    listTitle: "Free for user getting started with Sofia",
    featureList: [
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
    ],
  },
  {
    title: "Enterprise",
    price: 30,
    btnText: "Upgrade to Enterprise",
    listTitle: "Everything in free, and;",
    featureList: [
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
    ],
  },
  {
    title: "Enterprise Plus",
    price: 50,
    btnText: "Upgrade to Enterprise Plus",
    listTitle: "Free for user getting started with Sofia",
    featureList: [
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
      "Unlimited messages interaction and history",
    ],
  },
];

export default function UpgradePlanModal({
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
      title={
        <div className="border-b border-[#1010101A] pb-2">
          <div className="flex items-center gap-[10px]">
            <p className="text-#1D2129] text-2xl font-semibold">Change Plan</p>
            <span className="h-7 w-[75px] flex justify-center items-center bg-[#1175C01A] text-secondary-950 text-sm font-semibold rounded-[2px]">
              Monthly
            </span>
          </div>
          <p className="text-[#1D2129CC] text-sm mt-2 font-normal">
            You will be charged on a monthly basis
          </p>
        </div>
      }
      open={open}
      onOk={onOk}
      onCancel={onCancel}
      width={1024}
      footer={null}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {planList.map((item, index) => (
          <article
            key={index}
            className={`${
              index === 1 && "lg:border-x border-[#0000001A]"
            } py-[30px] px-4`}
          >
            <h2 className="text-[#1D2129] text-[32px] leading-[28px] font-semibold mb-4">
              {item.title}
            </h2>
            <p
              className={`${
                index === 0 ? "text-[#1D212933]" : "text-[#1D2129]"
              } text-sm leading-[16.8px] mb-[14px]`}
            >
              USD ${item.price}/Month
            </p>
            <button
              onClick={onOk}
              className={`w-full h-[50px] ${
                index === 0
                  ? "bg-[#1175C01A] text-[#1175C080]"
                  : "bg-[#1175C0] text-white"
              } text-sm font-semibold rounded-[10px]`}
            >
              {item.btnText}
            </button>
            <p className="text-sofia_dark font-semibold mt-[50px]">
              {item.listTitle}
            </p>
            <div className="grid gap-4 mt-3">
              {item.featureList.map((feature, i) => (
                <div key={i} className="flex items-center gap-3 ">
                  <span className="icon-[material-symbols--check] text-[#101010] text-2xl"></span>
                  <p className="text-[#101010CC] leading-5">{feature}</p>
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>
    </Modal>
  );
}
