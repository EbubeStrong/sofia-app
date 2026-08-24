"use client";

// import { mockPrescriptionPatients } from "./utils/types";
// import { useSearchParams } from "next/navigation";
// import { HospitalByIdResponse } from "@/interfaces/general";
import { TCreatePharmacyNewMedicineRequestResponse } from "@/interfaces/pharmacy";
import { formatLocalDateOnly } from "@/utils/formatLocalDateOnly";
import Image from "next/image";




const InventoryDetails = ({ InventoryDetail }: {  InventoryDetail: TCreatePharmacyNewMedicineRequestResponse["data"] | undefined }) => {
//    const searchParams = useSearchParams();

   
     

  return (
    <div className="flex flex-col gap-6 p-4">
      {/* PATIENT INFO */}
      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-gray-500 text-sm">Drug Name</p>
          <p className="font-medium">{InventoryDetail?.name ?? "---"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Type/Form</p>
          <p className="font-medium">{InventoryDetail?.form ?? "---"}</p>
        </div>

        <div>
          <p className="text-gray-500 text-sm">Store Location</p>
          <p className="font-medium">{InventoryDetail?.storeLocation ?? "---"}</p>
        </div>
      </div>

      
        <>
        <div
          key={InventoryDetail?.id ?? "---"}
          className="bg-gray-100 rounded-lg p-4 flex flex-col gap-4"
        >
          <h3 className="font-semibold">Inventory</h3>

          {/* <p className="font-medium">{PrescriptionDetailsData?.medication?.drug}</p> */}

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-gray-500">Drug Name</p>
              <p>{InventoryDetail?.name ?? "---"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Form</p>
              <p>{InventoryDetail?.form ?? "---"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Quantity Left</p>
              <p>{InventoryDetail?.quantity ?? "---"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Price</p>
              <p>{InventoryDetail?.price ?? "---"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Nafdac Number</p>
              <p>{InventoryDetail?.nDC ?? "---"}</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Drug Expiry Date</p>
              <p>{formatLocalDateOnly(InventoryDetail?.expiryDate) ?? "---"}</p>
            </div>
          </div>
        </div>
      
      </>

      {/* HOSPITAL */}
      {/* <div className="flex flex-col gap-1">
        <p className="text-sm text-gray-500">Hospital Name</p>
        <p className="font-medium">{hospitals?.hospitalName}</p>
        <p className="text-sm">{hospitals?.address}</p>
        <p className="text-sm">{hospitals?.phoneNumber}</p>
      </div> */}

      
      
      
{InventoryDetail?.uploadedFileUrl && (
  <>
    <p className="text-sm text-gray-500 mb-1">Drug Image Attachment</p>
    <div className="w-full h-64 relative">
      <Image
        src={InventoryDetail.uploadedFileUrl}
        alt="Drug Image"
        layout="fill"
        objectFit="contain"
        className="rounded-md"
      />
    </div>
  </>
)}
    </div>
  );
};

export default InventoryDetails;
