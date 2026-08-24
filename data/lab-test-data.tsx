import type { TableProps } from "antd";
import Link from "next/link";
import { BsThreeDotsVertical } from "react-icons/bs";
import { usePathname } from "next/navigation";

//components
import SofiaDropdown from "@/components/Dropdowns";

interface ILabTestProps {
  date: Date;
  type: string;
  orderName: string;
  specimen: string;
  priority: string;
  orderBy: string;
  id: string;
  patientId: string;
}

export const LabTestTableColumns = () => {
  const pathname = usePathname();

  const columns: TableProps<ILabTestProps>["columns"] = [
    {
      title: "DATE RECORDED",
      dataIndex: "date",
      key: "date",
      render: (date) => <span>{date}</span>,
    },
    {
      title: "TYPE",
      dataIndex: "type",
      key: "type",
      render: (type) => <span>{type}</span>,
    },
    {
      title: "ORDER NAME",
      dataIndex: "orderName",
      key: "orderName",
      render: (orderName) => <span>{orderName}</span>,
    },
    {
      title: "SPECIMEN",
      dataIndex: "specimen",
      key: "specimen",
      render: (specimen) => <span>{specimen}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => (
        <span className="bg-[#D91F11] text-white py-2 px-4 rounded-full">
          {priority}
        </span>
      ),
    },
    {
      title: "ORDERED BY",
      dataIndex: "orderBy",
      key: "orderBy",
      render: (orderBy) => <span>{orderBy}</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      render: (_, item) => {
        return (
          <SofiaDropdown
            items={[
              {
                label: (
                  <Link
                    href={`${pathname}/test-result`}
                    className="inline-block py-0.5 px-6 font-medium text-base"
                    passHref
                  >
                    Add test result
                  </Link>
                ),
                key: 1,
              },
              {
                label: (
                  <Link
                    href={`${pathname}/${item.id}`}
                    className="inline-block py-0.5 px-6 font-medium text-base"
                    passHref
                  >
                    View
                  </Link>
                ),
                key: 2,
              },
            ]}
            label={
              <button>
                <BsThreeDotsVertical />
              </button>
            }
          />
        );
      },
    },
  ];

  return columns;
};
