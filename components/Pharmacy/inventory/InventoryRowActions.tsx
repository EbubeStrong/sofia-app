import { MenuProps, Modal } from "antd";
import { useRouter } from "next/navigation";
import { IInventoryItem, INearExpiryItem } from "@/interfaces/pharmacy";
import { IPatientRecords } from "@/data/patient-record-data";

export const inventoryMedicineRowActions = (
  record: IInventoryItem,
  router: ReturnType<typeof useRouter>,
  setOpenEditForm: (val: boolean) => void,
  setGetInventoryId: (val: string) => void,
  setStep: (val: number) => void
): MenuProps["items"] => [
  {
    key: "view",
    label: (
      <button
        onClick={() => {
          // router.push(`/pharmacy/inventory-medicine/${record.drugId}`)
          setGetInventoryId(record.drugId);
          setOpenEditForm(true);
          setStep(1);
        }}
        className="w-full text-left"
      >
        View Details
      </button>
    ),
  },
  {
    key: "edit",
    label: (
      <button
        onClick={() => {
          setGetInventoryId(record.drugId);
          setOpenEditForm(true);
          setStep(2);
          // router.push(
          //   `/pharmacy/inventory-medicine/${record.drugId}/edit`
          // )
        }}
        className="w-full text-left"
      >
        Edit
      </button>
    ),
  },
  {
    key: "delete",
    label: (
            <button
        onClick={() => {
          Modal.confirm({
            title: "Delete Medicine",
            content: `Are you sure you want to delete "${record.drugName}"?`,
            okText: "Yes, delete",
            okType: "danger",
            cancelText: "Cancel",
            onOk: () => {
              //  delete API will be called here
              console.log("Deleting:", record.drugId);
            },
          });
        }}
        className="w-full text-left text-[#D92D20]"
      >
        Delete
      </button>

    ),
  },
];

export const patientItems = (
  id: string,
  setOpenEditForm: (val: boolean) => void,
  setGetPatientId: (val: string) => void,
  setStep: (val: number) => void
): MenuProps["items"] => [
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(1);
        }}
      >
        Edit basic info
      </button>
    ),
    key: 1,
  },
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(2);
        }}
      >
        Edit insurance info
      </button>
    ),
    key: 2,
  },
  {
    label: (
      <button
        type="button"
        className="w-full flex"
        onClick={() => {
          setOpenEditForm(true);
          setGetPatientId(id);
          setStep(3);
        }}
      >
        Edit emergency contact
      </button>
    ),
    key: 3,
  },
];


export const inventoryPatientsRowActions = (
record: INearExpiryItem, router: ReturnType<typeof useRouter>): MenuProps["items"] => [
  {
    key: "view-history",
    label: (
      <button
        onClick={() =>
        { const route = router.push(``)
          console.log(route)}
        }
        className="w-full text-left"
      >
        View History
      </button>
    ),
  },
  {
    key: "view-billing",
    label: (
      <button
      onClick={() =>
        { const route = router.push(``)
          console.log(route)}
        }
        className="w-full text-left"
      >
        View Billing History
      </button>
    ),
  },
];



export const patientsSummaryTableRowActions = (
record: IPatientRecords, router: ReturnType<typeof useRouter>): MenuProps["items"] => [
  {
    key: "view-history",
    label: (
      <button
        onClick={() =>
        { const route = router.push(``)
          console.log(route)}
        }
        className="w-full text-left"
      >
        View History
      </button>
    ),
  },
  {
    key: "view-billing",
    label: (
      <button
      onClick={() =>
        { const route = router.push(``)
          console.log(route)}
        }
        className="w-full text-left"
      >
        View Billing History
      </button>
    ),
  },
];


