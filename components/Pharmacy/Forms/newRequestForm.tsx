"use client";

import React, { useEffect, useMemo} from "react";
import { Form } from "antd";
import { toast } from "sonner";

import { NewMedicineRequestSchema } from "@/layouts/pharmacy/schema";
import { useCreatePharmacyNewMedicineRequest} from "@/services/pharmacy";
import FormConfig from "@/components/FormElements/FormConfig";
import { invalidateQuery } from "@/config/query-client";
import { useFetchCartItemsByIds } from "@/hooks/use-client-fetchers";
import { useSearchParams } from "next/navigation";
import Loader from "@/components/Loader";



type TNewRequestInfoFields = {
    senderEmail: string;
    receiverEmail: string;
    mailSubject: string;
    mailBody: string;
    userId: number;
    drugName: string;
    unitType: string;
    strength: string;
    requiredQuantity: string;
    manufacturer: string;
    pharmacyName: string;
    pharmacyAddress: string;
    pharmacyNumber: string;
    upload: string;
};
// interface NewMedicineRequestProps {
//   setOpenNewSingleOrderRequest: React.Dispatch<SetStateAction<boolean>>;
// }

const NewMedicineRequestForm: 
React.FC
 = () => {
  const searchParams = useSearchParams();
  const [form] = Form.useForm();
  // const [requestId, setRequestId] = useState("");
   
    // const router = useRouter();
    const cartId = searchParams.get("cartId");
  
    const cartIds = useMemo(
  () => (cartId ? [cartId] : []),
  [cartId]
);
    
  
    const { data: cartItemData, isFetching: isFetchingCartItem } = useFetchCartItemsByIds(cartIds);
    const { mutate: createNewRequest, isPending: isCreatingNewRequest } = useCreatePharmacyNewMedicineRequest();
    console.log("cartitem",cartItemData)

  

    useEffect(() => {
  if (!cartItemData?.length) return;

  const item = cartItemData[0];

  form.setFieldsValue({
    drugName: item.drugName,
    unitType: item.unitType,
    strength: item.strength,
    requiredQuantity: item.requiredQuantity,
    manufacturer: item.manufacturer,
    pharmacyName: "Rose Pharmacy",
    pharmacyAddress: "12 Maryland Close Lagos",
    pharmacyNumber: "08101828248",
  });
}, [cartItemData, form]);

if(isFetchingCartItem) {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
    <Loader color="#1175c0" size={28} />
  </div>
  )
}

  
  const handleNewRequestInfo = (values: TNewRequestInfoFields) => {
    const payload = {
    senderEmail: values.senderEmail,
    receiverEmail: values.receiverEmail,
    mailSubject: values.mailSubject,
    mailBody: values.mailBody,
    userId: "dummy-001",
    drugName: values.drugName,
    unitType: values.unitType,
    strength: values.strength,
    requiredQuantity: values.requiredQuantity,
    manufacturer: values.manufacturer,
    pharmacyName: values.pharmacyName,
    pharmacyAddress: values.pharmacyAddress,
    pharmacyNumber: Number(values.pharmacyNumber),
    upload: values.upload,
    };
    console.log("payload", payload)
    createNewRequest(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("New request sent successfully");
          // setRequestId(response?.requestId);
          invalidateQuery(["pharmacyAllRequest"]);
          form.resetFields();
          return;
        },
      }
    );
  };

  const item = cartItemData?.[0];


  return (
    <div>
       {item && (
      <div className="bg-[#F8F8F8] rounded-lg p-5 mb-6">
        <h3 className="text-[16px] font-semibold text-[#1A1A1A]">
          Rose Pharmacy
        </h3>
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-1">
          <span>12 Maryland Close Lagos</span>
          <span>08101828248</span>
        </div>
        <div className="mt-4">
          <p className="text-[12px] text-[#6B7280] mb-1">Patient Drug</p>
          <p className="text-[15px] font-medium text-[#1A1A1A]">
            {item.drugName}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-y-5 gap-x-8 mt-5">
          <div>
            <p className="text-[12px] text-[#6B7280] mb-1 uppercase">
              Type
            </p>
            <p className="text-[14px] font-medium text-[#1A1A1A]">
              {item.unitType}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#6B7280] mb-1">
              REQ Quantity
            </p>
            <p className="text-[14px] font-medium text-[#1A1A1A]">
              {item.requiredQuantity}
            </p>
          </div>
          <div>
            <p className="text-[12px] text-[#6B7280] mb-1 uppercase">
              Manufacturer
            </p>
            <p className="text-[14px] font-medium text-[#1A1A1A]">
              {item.manufacturer}
            </p>
          </div>

          <div>
            <p className="text-[12px] text-[#6B7280] mb-1 uppercase">
              Strength
            </p>
            <p className="text-[14px] font-medium text-[#1A1A1A]">
              {item.strength}
            </p>
          </div>

        </div>
      </div>
    )}
        <FormConfig
          form={form}
          schema={NewMedicineRequestSchema()}
          onSubmit={handleNewRequestInfo}
          btnLoading={isCreatingNewRequest}
        />
    </div>
  );
};

export default NewMedicineRequestForm;
