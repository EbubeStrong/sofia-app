"use client";


import { Button} from "antd";
// import { mockPrescriptionPatients } from "./utils/types";
import { useSearchParams } from "next/navigation";
import { useFetchPrescriptionDataByIds } from "@/services/pharmacy";
import { HospitalByIdResponse } from "@/interfaces/general";
import ComponentLoader from "../Loader/ComponentLoader";
import { formatLocalDateOnly } from "@/utils/formatLocalDateOnly";


type TabStatus =
  | "prescription"
  | "approved"
  | "reject"
  | "completed"
  | "archived";

const primaryBtn =
  "!h-12 !bg-[#1175C0] !text-white hover:!bg-[#0f64a6] !font-medium !rounded-md !w-full";

const dangerBtn =
  "!h-12 !bg-red-600 !text-white hover:!bg-red-700 !font-medium !rounded-md !w-full";

const outlineBtn =
  "!h-12 !border !border-gray-400 !text-gray-800 hover:!border-gray-600 hover:!text-black !font-medium !rounded-md !w-full";


const ViewPrescriptionDetails = ({ patientId, patientConsultationId, hospitals }: { patientId: string, patientConsultationId: number, hospitals: HospitalByIdResponse["data"] | undefined }) => {
   const searchParams = useSearchParams();

   
     

  const rawTab = searchParams.get("q");

  const tab: TabStatus =
    rawTab === "approved" ||
    rawTab === "reject" ||
    rawTab === "completed" ||
    rawTab === "archived"
      ? rawTab
      : "prescription"; 
//   const patient = mockPrescriptionPatients.find(
//   (p) =>
//     p.patientId === patientId &&
//     p.prescriptions.some(
//       (pr) => pr.prescriptionId === String(patientConsultationId)
//     )
// );



const { data: PrescriptionDetailsData, isFetching: isFetchingPrescriptionDetails  } = useFetchPrescriptionDataByIds(
  tab,
  patientConsultationId,
  patientId,
);

console.log("PrescriptionDetailsData:", PrescriptionDetailsData);

if (isFetchingPrescriptionDetails) {
    return <ComponentLoader label="Loading prescription info..." />;
  }



  // if (!patient) return null;

  return (
    <div className="flex flex-col gap-6 p-4">

      {/* PRINT */}
      <Button className="w-fit border border-black font-medium">
        Print Only
      </Button>

      {/* PATIENT INFO */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Patient Name</p>
          <p className="font-medium">{PrescriptionDetailsData?.patient?.firstName} {PrescriptionDetailsData?.patient?.lastName}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Patient Date of Birth</p>
          <p className="font-medium">{PrescriptionDetailsData?.patient?.dob}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Patient Phone Number</p>
          <p className="font-medium">{PrescriptionDetailsData?.patient?.phoneNumber}</p>
        </div>
      </div>

      
        <>
        <div
          key={PrescriptionDetailsData?.medication?.id}
          className="bg-gray-100 rounded-lg p-4 flex flex-col gap-4"
        >
          <h3 className="font-semibold">Prescribed Drug</h3>

          {/* <p className="font-medium">{PrescriptionDetailsData?.medication?.drug}</p> */}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Patient Drug</p>
              <p>{PrescriptionDetailsData?.medication?.drug}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Form</p>
              <p>{PrescriptionDetailsData?.medication?.form}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Total Quantity</p>
              <p>{PrescriptionDetailsData?.medication?.totalQuantity}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Refill Number</p>
              <p>{PrescriptionDetailsData?.medication?.refillNumber}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Allow Substitute</p>
              <p>{PrescriptionDetailsData?.medication?.allowSubstitute}</p>
            </div>
          </div>
        </div>
      

      {/* DIRECTIONS */}
      <div>
        <p className="text-sm text-gray-500 mb-1">Directions</p>
        <div className="border rounded-md p-3 text-sm">
          {PrescriptionDetailsData?.medication?.directions}
        </div>
      </div>
      </>

      {/* HOSPITAL */}
      <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500">Hospital Name</p>
        <p className="font-medium">{hospitals?.hospitalName}</p>
        {/* <p className="font-medium">{patient.hospital.name}</p> */}
        <p className="text-sm">{hospitals?.address}</p>
        {/* <p className="text-sm">{patient.hospital.address}</p> */}
        <p className="text-sm">{hospitals?.phoneNumber}</p>
        {/* <p className="text-sm">{patient.hospital.phone}</p> */}
      </div>

      {/* PRESCRIBER */}
      <div className="bg-gray-100 p-4 rounded-lg grid grid-cols-2 gap-6">
        <div>
          <p className="text-sm text-gray-500">Prescribers Name</p>
          <p>{PrescriptionDetailsData?.doctor?.firstName}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Prescribers Phone Number</p>
          <p>{PrescriptionDetailsData?.doctor?.phoneNumber}</p>
        </div>

        <div>
          <p className="text-sm text-gray-500">Date Prescribed</p>
          <p>{formatLocalDateOnly(PrescriptionDetailsData?.medication?.createdAt)}</p>
        </div>
      </div>

      
      {/* <Button className="!h-12 !bg-[#1175C0] !text-white !hover:!bg-[#1175C0] !font-medium !rounded-md !w-full">
        Approve Prescription
      </Button>
      <Button className="!h-12 !bg-[#1175C0] !text-white !hover:!bg-[#1175C0] !font-medium !rounded-md !w-full">
        Reject Prescription
      </Button>
      <Button className="!h-12 !bg-[#1175C0] !text-white !hover:!bg-[#1175C0] !font-medium !rounded-md !w-full">
        Forward to another Pharmacy
      </Button>
      <Button className="!h-12 !bg-[#1175C0] !text-white !hover:!bg-[#1175C0] !font-medium !rounded-md !w-full">
        Save to Patient Profile
      </Button> */}
      {/* ACTIONS */}
{tab === "prescription" && (
  <>
    <Button className={primaryBtn}>
      Approve Prescription
    </Button>

    <Button className={dangerBtn}>
      Reject Prescription
    </Button>

    <Button className={outlineBtn}>
      Forward to another Pharmacy
    </Button>
  </>
)}

{tab === "approved" && (
  <Button className={primaryBtn}>
    Complete Prescription
  </Button>
)}

{tab === "completed" && (
  <Button className={primaryBtn}>
    Save to Patient Profile
  </Button>
)}

{tab === "archived" && (
  <Button className={dangerBtn}>
    Remove from Archive
  </Button>
)}

    </div>
  );
};

export default ViewPrescriptionDetails;
