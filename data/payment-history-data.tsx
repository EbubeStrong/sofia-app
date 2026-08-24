import type { TableProps } from "antd";
import Image from "next/image";
import CardImg from "@/public/images/mastercard-svgrepo-com.svg";

type IBillings = {
  key: string | number;
  date: string;
  account: string;
  status: string;
  amount: string;
  cardNumber: string;
};

export const PaymentHistoryTableColumn: TableProps<IBillings>["columns"] = [
  {
    title: "",
    dataIndex: "date",
    key: "date",
    render: (_, item) => (
      <div className="text-sofia_dark font-medium">{item.date}</div>
    ),
  },
  {
    title: "",
    dataIndex: "account",
    key: "account",
    render: (_, item) => (
      <div className="text-sofia_dark font-medium">{item.account}</div>
    ),
  },

  {
    title: "",
    dataIndex: "status",
    key: "status",
    render: (_, item) => (
      <div className="text-sofia_dark font-medium">
        <span className="h-[22px] w-[90px] grid place-items-center bg-[#077D550D] text-[#077D55] text-sm font-medium leading-[18.2px] border border-[#077D5580] rounded-[20px] ">
          {item.status}
        </span>
      </div>
    ),
  },
  {
    title: "",
    dataIndex: "amount",
    key: "amount",
    render: (_, item) => (
      <div className="text-sofia_dark font-medium">{item.amount}</div>
    ),
  },
  {
    title: "",
    dataIndex: "cardNumber",
    key: "cardNumber",
    render: (_, item) => (
      <div className="text-sofia_dark font-medium">{item.cardNumber}</div>
    ),
  },
  {
    title: "",
    dataIndex: "action",
    key: "action",
    render: (_, item) => (
      <div className="flex items-center gap-2 py-1">
        <Image src={CardImg} alt="ATM" width={24} height={24} priority />
        <p className="text-sofia_dark font-medium">{item.cardNumber}</p>
      </div>
    ),
  },
];
