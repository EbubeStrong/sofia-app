import { useRouter } from "next/navigation";
// import { BsThreeDotsVertical } from "react-icons/bs";
import { MailOutlined } from "@ant-design/icons";
import type { TableProps } from "antd";
import { Button } from "antd";
import { Modal } from "antd";
import {
  CheckInIcon,
  UserIcon,
  PatientIcon,
  DroppedCaseIcon,
  EmergencyIcon,
} from "@/assets/dashboard-icons";
import { IAdmissionItem, ICartItem, IInventoryItem, ILowStockItem, INearExpiryItem, IOrderHistoryItem, IPharmacyItem } from "@/interfaces/pharmacy";
import SofiaDropdown from "@/components/Dropdowns";
import Link from "next/link";
import { HighlightText } from "@/components/Pharmacy/utils/HighlightText";
import { inventoryMedicineRowActions, inventoryPatientsRowActions } from "@/components/Pharmacy/inventory/InventoryRowActions";
import { DotsVertical } from "@/assets/icons";
import FormInputNumber from "@/components/FormElements/FormInputNumber";


interface IColProps {
  searchValue?: string;
  setOpenEditForm: (val: boolean) => void;
  setGetInventoryId: (val: string) => void;
  setStep: (val: number) => void;
}

export const PharmacyDashboardStats = [
  {
    title: "New Prescription",
    amount: "0",
    icon: <UserIcon />,
    id: "totalPatients",
  },
  {
    title: "Reviewed Prescriptions",
    amount: "0",
    icon: <CheckInIcon />,
    id: "totalCheckins",
  },
  {
    title: "Filled Prescriptions",
    amount: "0",
    icon: <PatientIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "totalActivePatients",
  },
  {
    title: "Rejected Prescriptions",
    amount: "0",
    icon: <DroppedCaseIcon />,
    id: "droppedCases",
  },
];

export const PharmacyLayoutStats = [
  {
    title: "Total Prescriptions",
    amount: "0",
    icon: <UserIcon/>,
    id: "totalPrescriptions",
  },
  {
    title: "New Orders",
    amount: "0",
    icon: <CheckInIcon />,
    id: "newOrders",
  },
  {
    title: "High Priority",
    amount: "0",
    icon: <EmergencyIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "highPriority",
  },
  {
    title: "High Risk Cases",
    amount: "0",
    // icon: <DroppedCaseIcon />,
    icon: <PatientIcon/>,
    id: "droppedCases",
  },
];

export const AdmissionLayoutStats = [
  {
    title: "Pending Requests",
    amount: "1",
    icon: <UserIcon/>,
    id: "pendingRequests",
  },
  {
    title: "Available Beds",
    amount: "3",
    icon: <CheckInIcon />,
    id: "availableBeds",
  },
  {
    title: "Current Patients",
    amount: "1",
    icon: <EmergencyIcon />,
    iconBg: "bg-[#EE9F2D1A]",
    id: "currentPatients",
  },
  {
    title: "Bed Occupancy",
    amount: "25%",
    // icon: <DroppedCaseIcon />,
    icon: <PatientIcon/>,
    id: "bedOccupancy",
  },
];

export const PRESCRIPTION_DATA = [
  { drug: "Paracetamol", value: 800 },
  { drug: "Amoxicillin", value: 600 },
  { drug: "Ibuprofen", value: 950 },
  { drug: "Metformin", value: 700 },
  { drug: "Cetirizine", value: 800 },
  { drug: "Lisinopril", value: 400 },
  { drug: "Levothyroxine", value: 750 },
  { drug: "Atorvastatin", value: 850 },
  { drug: "Amlodipine", value: 700 },
  { drug: "Metoprolol", value: 550 },
  { drug: "Albuterol", value: 620 },
  { drug: "Losartan", value: 500 },
];

export const PharmacyDashboardQueueColumns = () => {
  // const { openRescheduleModal } = useRescheduleModalStore();

  const router = useRouter();

  const columns: TableProps<IPharmacyItem>["columns"] = [
    {
      title: "PRESC ID",
      dataIndex: "prescId",
      key: "prescId",
      render: (prescId) => <span>{prescId}</span>,
    },
    
    {
      title: "PATIENT",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => <span>{patient}</span>,
    },
    {
      title: "DRUG",
      dataIndex: "drug",
      key: "drug",
      render: (drug) => <span>{drug}</span>,
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
      render: (quantity) => <span>{quantity}</span>,
    },
    {
      title: "DOCTOR",
      dataIndex: "doctor",
      key: "doctor",
      // width: 250,
      render: (doctor) => <span>{doctor}</span>,
    },
    {
      title: "DATE",
      dataIndex: "date",
      key: "date",
      // width: 250,
      render: (date) => <span>{date}</span>,
    },
    {
      title: "STATUS",
      dataIndex: "status",
      key: "status",
      // width: 200,
      render: (_, el) => {
        return (
          <button
            onClick={() =>
              router.push(
                `/queues/${el.patientId}/consultation?roomId=${el.callId}`
              )
            }
            className="text-[15px] text-white font-medium bg-[#1175C0] rounded-lg px-3 py-2"
          >
            Start consultation
          </button>
        );
      },
    },
    {
      title: "",
      dataIndex: "action1",
      key: "action1",
      width: 50,
      render: () => {
        return (
          <SofiaDropdown
            items={[
              {
                label: (
                  <button
                    // onClick={openRescheduleModal}
                    className="w-full flex justify-start"
                  >
                    Reschedule
                  </button>
                ),
                key: 1,
              },
              {
                label: (
                  <Link href={`#link`} passHref>
                    View Booking Details
                  </Link>
                ),
                key: 2,
              },
              {
                label: (
                  <Link href={`#link`} passHref>
                    Edit Event Type
                  </Link>
                ),
                key: 3,
              },
              {
                label: <button className="text-[#D92D20]">Delete Event</button>,
                key: 4,
              },
            ]}
            label={
              <button>
                <DotsVertical />
              </button>
            }
          />
        );
      },
    },
  ];

  return columns;
};


export const PharmacyLayoutQueueColumns = () => {
  // const router = useRouter();

  const columns: TableProps<IPharmacyItem>["columns"] = [
    {
      title: "ORDER ID",
      dataIndex: "prescId",
      key: "prescId",
      render: (prescId) => <span>{prescId}</span>,
    },
    {
      title: "PATIENT INFO",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => <span>{patient}</span>,
    },
    {
      title: "ALLERGY",
      dataIndex: "drug",
      key: "drug",
      render: (drug) => <span>{drug}</span>,
    },
    {
      title: "PRESC DOCTOR",
      dataIndex: "doctor",
      key: "doctor",
      // width: 250,
      render: (doctor) => <span>{doctor}</span>,
    },
    {
      title: "DATE ORDERED",
      dataIndex: "date",
      key: "date",
      // width: 250,
      render: (date) => <span>{date}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <span>{priority}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      // width: 200,
      render: (action) => <span>{action}</span>,
    },
  
  ];

  return columns;
};


export const AdmissionLayoutQueueColumns = () => {
  // const router = useRouter();

  const columns: TableProps<IAdmissionItem>["columns"] = [
    {
      title: "ADMISSION ID",
      dataIndex: "prescId",
      key: "prescId",
      render: (prescId) => <span>{prescId}</span>,
    },
    {
      title: "PATIENT ID",
      dataIndex: "patient",
      key: "patient",
      render: (patient) => <span>{patient}</span>,
    },
    {
      title: "ALLERGY",
      dataIndex: "drug",
      key: "drug",
      render: (drug) => <span>{drug}</span>,
    },
    {
      title: "REQUESTING DOCTOR",
      dataIndex: "doctor",
      key: "doctor",
      // width: 250,
      render: (doctor) => <span>{doctor}</span>,
    },
    {
      title: "DATE REQUESTED",
      dataIndex: "date",
      key: "date",
      // width: 250,
      render: (date) => <span>{date}</span>,
    },
    {
      title: "PRIORITY",
      dataIndex: "priority",
      key: "priority",
      render: (priority) => <span>{priority}</span>,
    },
    {
      title: "ACTION",
      dataIndex: "action",
      key: "action",
      // width: 200,
      render: (action) => <span>{action}</span>,
    },
  
  ];

  return columns;
};


export const AdmissionHistoryColumns = () => {
  const columns: TableProps<IAdmissionItem>["columns"] = [
    {
      title: "ADMISSION ID",
      dataIndex: "admissionId",
      key: "admissionId",
      render: (admissionId) => <span>{admissionId}</span>,
    },
    {
      title: "NAME",
      dataIndex: "name",
      key: "name",
      render: (name) => <span>{name}</span>,
    },
    {
      title: "DIAGNOSIS",
      dataIndex: "diagnosis",
      key: "diagnosis",
      render: (diagnosis) => <span>{diagnosis}</span>,
    },
    {
      title: "BED",
      dataIndex: "bed",
      key: "bed",
      render: (bed) => <span>{bed}</span>,
    },
    {
      title: "DURATION",
      dataIndex: "duration",
      key: "duration",
      render: (duration) => <span>{duration}</span>,
    },
    {
      title: "STAY",
      dataIndex: "stay",
      key: "stay",
      render: (stay) => <span>{stay}</span>,
    },
    {
      title: "",
      dataIndex: "action",
      key: "action",
      width: 40,
      render: (action) => <span>{action}</span>,
    },
  ];

  return columns;
};


export const MedicineInventoryColumns = ({ searchValue = "",setOpenEditForm, setGetInventoryId, setStep }: IColProps) => {
  const router = useRouter();

  const columns: TableProps<IInventoryItem>["columns"] = [
    {
      title: "NAME",
      dataIndex: "drugName",
      key: "drugName",
       render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
    ),
    },
    {
      title: "FORM",
      dataIndex: "drugForm",
      key: "drugForm",
      
    },
    {
      title: "STORAGE LOCATION",
      dataIndex: "storageLocation",
      key: "storageLocation",
    },
    {
      title: "PRICE",
      dataIndex: "drugPrice",
      key: "drugPrice",
    },
    {
      title: "NAFDAC NO",
      dataIndex: "nafdacNumber",
      key: "nafdacNumber",
       render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
    ),
    },
    {
      title: "MANUFACTURER",
      dataIndex: "manufacturer",
      key: "manufacturer",
       render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
    ),
    },
    {
      title: "QUANTITY",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "EXPIRY DATE",
      dataIndex: "expiryDate",
      key: "expiryDate",
    },
    {
      title: "",
      key: "actions",
      width: 50,
      render: (_, record) => (
        <SofiaDropdown
          label={
            <button>
              <DotsVertical />
            </button>
          }
          items={inventoryMedicineRowActions(record, router, setOpenEditForm, setGetInventoryId, setStep)}
        />
      ),
    },
  ];

  return columns;
};

export const NearExpiryColumns = (searchValue = "") => {
  const router = useRouter();

  const columns: TableProps<INearExpiryItem>["columns"] = [
    {
      title: "DRUG",
      dataIndex: "drugName",
      key: "drugName",
       render: (text: string) => (
      <HighlightText text={text} highlight={searchValue} />
    ),
    },
    {
      title: "CAPACITY",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "TYPE",
      dataIndex: "drugType",
      key: "drugType",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
      
    },
    {
      title: "AMOUNT",
      dataIndex: "amountRemaining",
      key: "amountRemaining",
      
    },
    {
      title: "DATE OF EXPIRY",
      dataIndex: "dateOfExpiry",
      key: "dateOfExpiry",
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 50,
      render: (_, record) => (
          <Button
            size="small"
            className="!rounded-lg !bg-[#1175C0] !text-white !p-4 hover:!bg-[#1175C0]/90"
            onClick={() => {
              console.log("Send email for", record.drugId);
            }}
          >
            Review
          </Button>
      ),
    },
    {
      title: "",
      key: "dropdown",
      width: 50,
      render: (_, record) => (
        <SofiaDropdown
          label={
            <button>
              <DotsVertical />
            </button>
          }
          // items={inventoryPatientsRowActions(record, router)}
          items={inventoryPatientsRowActions(record, router)}
        />
      ),
    },
  ];

  return columns;
};



export const LowStockColumns = ({
  searchValue = "",
  onDelete,
  editingRowId,
  setEditingRowId,
  reqQtyMap,
  onReqQtyChange,
  onAdd,
}: {
  searchValue?: string;
  onDelete: (id: string) => void;
  editingRowId: string | null;
  setEditingRowId: React.Dispatch<React.SetStateAction<string | null>>;
  reqQtyMap: Record<string, number>;
  onReqQtyChange: (id: string, value: string) => void;
  onAdd: (row: ILowStockItem) => void;
}) => {


  const columns: TableProps<ILowStockItem>["columns"] = [
    {
      title: "DRUG NAME",
      dataIndex: "drugName",
      key: "drugName",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "STRENGTH",
      dataIndex: "strength",
      key: "strength",
    },
    {
      title: "UNIT TYPE",
      dataIndex: "unitType",
      key: "unitType",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "MANUFACTURER",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "AV.QUANTITY",
      dataIndex: "drugQuantity",
      key: "drugQuantity",
      render: (value: number) => (
    <span className="text-red-500 font-medium">
      {value}
    </span>
  ),
    },
    {
  title: "REQ.QUANTITY",
  dataIndex: "reqQuantity",
  key: "reqQuantity",
  render: (_, record) => {
    const isEditing = editingRowId === record.drugId;

    return (
      <div style={{ width: 90 }}>
      <FormInputNumber
        value={reqQtyMap[record.drugId] ?? 0}
        disabled={!isEditing}
        onChange={(e) =>
          onReqQtyChange(record.drugId, e.target.value)
        }
        cssProps={{ $height: "32px" }}
      />
      </div>
    );
  },
},

    {
  title: "ACTIONS",
  key: "actions",
  width: 220,
  render: (_, record) => {
    const qty = reqQtyMap[record.drugId] ?? 0;
    const isEditing = editingRowId === record.drugId;

    return (
      <div className="flex items-center gap-3">

        <Button
          size="small"
          disabled={qty <= 0}
          className="!rounded-lg !bg-[#1175C0] !text-white !p-4 hover:!bg-[#1175C0]/80 disabled:!bg-gray-300 disabled:!text-gray-500"
          onClick={() => onAdd(record)}
        >
          Add
        </Button>

        <button
          className="hover:underline"
          onClick={() => {
            setEditingRowId(isEditing ? null : record.drugId);
          }}
        >
          Edit
        </button>

        <button
          className="text-red-500 hover:underline"
          onClick={() =>
            Modal.confirm({
              title: "Delete Medicine",
              content: "Are you sure you want to delete this medicine?",
              okText: "Yes, Delete",
              okType: "danger",
              cancelText: "Cancel",
              onOk: () => onDelete(record.drugId),
            })
          }
        >
          Delete
        </button>
      </div>
    );
  },
},
  ];
  return columns
};

export const AllCartColumns = (
  searchValue = "",
  onDelete: (id: string) => void,
  onOrder: (cartId: string) => void
) => {
  

  const columns: TableProps<ICartItem>["columns"] = [
    {
      title: "DRUG NAME",
      dataIndex: "drugName",
      key: "drugName",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "UNIT TYPE",
      dataIndex: "unitType",
      key: "unitType",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "STRENGTH",
      dataIndex: "strength",
      key: "strength",
    },
    {
      title: "REQ.QUANTITY",
      dataIndex: "requiredQuantity",
      key: "requiredQuantity",
      render: (value: number) => (
    <span className=" font-medium">
      {value}
    </span>
  ),
    },
    {
      title: "MANUFACTURER",
      dataIndex: "manufacturer",
      key: "manufacturer",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
     {
      title: "ADDED ON",
      dataIndex: "addedOn",
      key: "addedOn",
      render: (value: number) => (
    <span className=" font-medium">
      {value}
    </span>
  ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          
          <Button
            size="small"
            className="!rounded-lg !bg-[#1175C0] !text-white !p-4 hover:!bg-[#1175C0]/80"
            onClick={() => {
              onOrder(record.cartId)
              console.log("Send email for", record.cartId);
            }}
            // icon={<MailOutlined />}
          >
            Order
          </Button>

          {/* Edit */}
          {/* <button
            className="hover:underline"
            onClick={() =>
              router.push(
                `/pharmacy/lowstock-medicine/${record.requestId}/edit`
              )
            }
          >
            Edit
          </button> */}

          {/* Delete */}
          <button
            className="text-red-500 hover:underline"
            onClick={() =>
              Modal.confirm({
                title: "Delete Medicine",
                content:
                  "Are you sure you want to delete this medicine?",
                okText: "Yes, Delete",
                okType: "danger",
                cancelText: "Cancel",
                onOk: () => onDelete(record.cartId),
              })
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return columns
};



export const MultipleOrdersColumns = () => {

  const columns: TableProps<ICartItem>["columns"] = [
  {
    title: "DRUG NAME",
    dataIndex: "drugName",
    key: "drugName",
  },
  {
    title: "UNIT TYPE",
    dataIndex: "unitType",
    key: "unitType",
  },
  {
    title: "STRENGTH",
    dataIndex: "strength",
    key: "strength",
  },
  {
    title: "REQ. QUANTITY",
    dataIndex: "requiredQuantity",
    key: "requiredQuantity",
  },
  {
    title: "MANUFACTURER",
    dataIndex: "manufacturer",
    key: "manufacturer",
  },
  {
    title: "ADDED ON",
    dataIndex: "addedOn",
    key: "addedOn",
  },
]
return columns
};


export const OrderHistoryColumns = (
  searchValue = "",
  onDelete: (id: string) => void
) => {
  const router = useRouter();

  const columns: TableProps<IOrderHistoryItem>["columns"] = [
    {
      title: "FROM",
      dataIndex: "from",
      key: "from",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "TO",
      dataIndex: "to",
      key: "to",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "SUBJECT",
      dataIndex: "subject",
      key: "subject",
      render: (text: string) => (
        <HighlightText text={text} highlight={searchValue} />
      ),
    },
    {
      title: "BODY",
      dataIndex: "body",
      key: "body",
    },
    {
      title: "ORDERED ON",
      dataIndex: "orderDate",
      key: "orderDate",
    },
    {
      title: "ACTIONS",
      key: "actions",
      width: 220,
      render: (_, record) => (
        <div className="flex items-center gap-3">
          
          <Button
            size="small"
            className="!rounded-lg !bg-black !text-white !p-4 hover:!bg-black/80"
            onClick={() => {
              console.log("Send email for", record.requestId);
            }}
            icon={<MailOutlined />}
          >
            Reorder
          </Button>

          {/* Edit */}
          <button
            className="hover:underline"
            onClick={() =>
              router.push(
                `/pharmacy/lowstock-medicine/${record.requestId}/edit`
              )
            }
          >
            Edit
          </button>

          {/* Delete */}
          <button
            className="text-red-500 hover:underline"
            onClick={() =>
              Modal.confirm({
                title: "Delete Medicine",
                content:
                  "Are you sure you want to delete this medicine?",
                okText: "Yes, Delete",
                okType: "danger",
                cancelText: "Cancel",
                onOk: () => onDelete(record.requestId),
              })
            }
          >
            Delete
          </button>
        </div>
      ),
    },
  ];
  return columns
};

