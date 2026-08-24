"use client";

import React, { useMemo, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
import SofiaTable from "@/components/Tables/SofiaTable";
import { useFetchMultipleOrders, useProcessMultipleOrders } from "@/hooks/use-client-fetchers";
import { MultipleOrdersColumns } from "@/data/pharmacy-data";
import FormInputTextarea from "@/components/FormElements/FormInputTextarea";
import FormInput from "@/components/FormElements/FormInput";
import { Button } from "antd";
import BackButton from "@/components/BackButton";
import { toast } from "sonner";

const MultipleOrdersTable = () => {
  // const searchParams = useSearchParams();
  // const router = useRouter();

  // const idsParam = searchParams.get("ids");

  // const ids = useMemo(() => {
  //   if (!idsParam) return [];
  //   return idsParam.split(",");
  // }, [idsParam]);

  // const { data, isLoading } = useFetchCartItemsByIds(ids);
  const { data, isLoading } = useFetchMultipleOrders();
  const { mutate: processOrders, isPending: isProcessingOrders } = useProcessMultipleOrders();


  const [form, setForm] = useState({
    from: "",
    to: "",
    subject: "",
    instruction: "",
  });

  const ordersPayload = useMemo(() => {
  return (data ?? []).map((item: Record<string, unknown>) => ({
    cartId: item.cartId,
    drugName: item.drugName,
    unitType: item.unitType,
    strength: item.strength,
    requiredQuantity: item.requiredQuantity,
    manufacturer: item.manufacturer,
  }));
}, [data]);

const handleSubmitOrder = () => {
  const payload = {
    from: form.from,
    to: form.to,
    subject: form.subject,
    instruction: form.instruction,
    orders: ordersPayload,
  };

  processOrders(payload, {
    onSuccess: () => {
      toast.success("Order processed successfully");
    },
  });
};



  // guard – must come from multiple selection
  // useEffect(() => {
  //   if (ids.length < 2) {
  //     router.replace("/pharmacy/order-management/cart");
  //   }
  // }, [ids, router]);

  return (
    <>
<div className="flex items-center justify-between p-4">
  <div className="flex flex-col items-center ">
    <BackButton>back</BackButton>
    <span className="text-lg font-semibold text-[#101010]">
      Send request
    </span>
  </div>
  <div className="flex flex-[0.5] bg-inherit px-2 py-1 rounded text-xs font-medium flex items-center gap-3 ">
                       <Button
                         color="default" 
                         variant="outlined"
                         className=" !transition-all duration-75 !py-6 !rounded-md w-full !font-bold !text-[#1175C0]"
                         // onClick={handleNewMedicineClick}
                        //  icon={<MailOutlined />}
                       >
                         Upload
                       </Button>
                       <Button
                         variant="text"
                         className="!bg-[#1175C0] !font-bold !text-white !transition-all duration-75 !py-6 !rounded-md w-full"
                         loading={isProcessingOrders}
                         onClick={handleSubmitOrder}
                       >
                         Order
                       </Button>
                 </div>
</div>

    <div className=" border rounded-lg p-4 mb-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormInput
            placeholder="From"
            value={form.from}
            onChange={(e) =>
              setForm((p) => ({ ...p, from: e.target.value }))
            }
          />

          <FormInput
            placeholder="To (Supplier)"
            value={form.to}
            onChange={(e) =>
              setForm((p) => ({ ...p, to: e.target.value }))
            }
          />

          
        </div>
        <div className="mt-4">
        <FormInput
            placeholder="Subject"
            value={form.subject}
            onChange={(e) =>
              setForm((p) => ({ ...p, subject: e.target.value }))
            }
          />
         </div>
        <div className="mt-4">
          <FormInputTextarea
            label="Instruction"
            placeholder="Write your instructions for supplier"
            value={form.instruction}
            onChange={(e) =>
              setForm((p) => ({ ...p, instruction: e.target.value }))
            }
          />
        </div>
      </div>
    <div className="bg-white border rounded-lg p-4">
      <SofiaTable
        columns={MultipleOrdersColumns()}
        dataSource={data ?? []}
        loading={isLoading}
        pageTotal={data?.length ?? 0}
        
      />
    </div>
    </>
  );
};

export default MultipleOrdersTable;
