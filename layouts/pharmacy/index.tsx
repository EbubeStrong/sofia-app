"use client"

import { useEffect, useState } from "react";
import { useSearchParams, useRouter, usePathname } from "next/navigation";


import { PharmacyLayoutStats } from "@/data/pharmacy-data";
import { DCard, DTitle } from "@/styles/HospitalCard";
import PharmacyQueueLayoutTable from "./PharmacyQueueLayoutTable";
import { TPharmacyPrescriptionQueueResp } from "@/interfaces/pharmacy";
import { Button, Space } from "antd";
import SofiaDrawers from "@/components/Drawers";
import NewPrescriptionForm from "@/components/Pharmacy/Forms/NewPrescriptionForm";
import { usePharmacyPrescriptionStats } from "@/services/pharmacy";
import { HospitalByIdResponse } from "@/interfaces/general";
import { FaPlus } from "react-icons/fa";


type TQueueProps = {
  initialData: TPharmacyPrescriptionQueueResp["data"];
  hospitals: HospitalByIdResponse["data"];
};

const PharmacyLayoutModule: React.FC<TQueueProps> = ({ initialData, hospitals }) => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const patientIdFromUrl = searchParams.get("patient_id");
    const [openNewPrescription, setOpenNewPrescription] = useState(false);
    const { data: prescriptionsStats } = usePharmacyPrescriptionStats();

    const statsFromApi = prescriptionsStats;

const resolvedStats = PharmacyLayoutStats.map((stat) => {
  let amount = stat.amount;

  if (statsFromApi) {
    if (stat.id === "totalPrescriptions") {
      amount = String(statsFromApi.totalPrescription ?? 0);
    }

    if (stat.id === "newOrders") {
      amount = String(statsFromApi.totalOrder ?? 0);
    }

    if (stat.id === "highPriority") {
      amount = String(statsFromApi.totalHighPriority ?? 0);
    }

    if (stat.id === "droppedCases") {
      amount = "0";
    }
  }

  return { ...stat, amount };
});


    useEffect(() => {
    if (patientIdFromUrl) {
      setOpenNewPrescription(true);
    }
  }, [patientIdFromUrl]);
    const handleNewPrescriptionClick = () => {
  setOpenNewPrescription(true);
  
};

const handleCloseDrawer = () => {
  setOpenNewPrescription(false);
  router.replace(pathname); 
};
    return (
        <div className="flex flex-col gap-7">
            <section className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
                <div className="flex-1">
                    <h1 className="text-xl md:text-2xl text-[#101010] font-bold font-libre_franklin">
                        Pharmacy
                    </h1>
                    <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
                        Search for existing patients or register new ones to begin their visit
                    </p>
                </div>
                <Space size="small">
                      <Button
                        type="primary"
                        variant="text"
                        className="!bg-[#1175C0] hover:!bg-[#1174c0dd] !transition-all duration-75 !py-6 !text-white !rounded-md !font-bold"
                        onClick={handleNewPrescriptionClick}
                      >
                      <FaPlus />  New Prescription
                      </Button>
                    </Space>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
                {resolvedStats.map((stat) => (
                    <DCard $type={stat.id} key={stat.id} className="relative">
                        <DTitle $type={stat.id}>{stat.title}</DTitle>

                        <div className="flex flex-col gap-2 justify-center">
                            <p
                                className={`${stat.id === "totalPrescriptions" ? "text-white" : "text-sofia_dark"
                                    } text-xl md:text-2xl font-bold text-sofia_dark font-libre_franklin`}
                            >
                                {stat.amount}
                            </p>
                        </div>

                        <div
                            className={`absolute top-0 right-0 m-4 w-11 h-11 flex items-center justify-center rounded-full`}
                        >
                            {stat.icon}
                        </div>
                    </DCard>
                ))}
            </section>

            <PharmacyQueueLayoutTable tableData={initialData} type="queue" hospitals={hospitals}/>

            
             <SofiaDrawers
            title={
              <>
                <p className="text-xl text-[#101010]">Prescription Submission Form</p>
                <p className="text-sm text-[#101010]/50">
                    Fill out the form below to submit a new prescription
                </p>
              </>
            }
            placement="right"
            open={openNewPrescription}
            onClose={handleCloseDrawer}
            width={520}
            maskClosable={false}
            zIndex={1005}
          >
            <NewPrescriptionForm />
          </SofiaDrawers>
        </div>
    )
}

export default PharmacyLayoutModule;