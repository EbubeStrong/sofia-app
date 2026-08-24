"use client";
import React, { useMemo, useState } from "react";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import SofiaDrawers from "../Drawers";
import { usePathname, useRouter } from "next/navigation";
import FormConfig from "../FormElements/FormConfig";
import {
    allergySchema,
    treatmentsSchema,
    vaccinesSchema,
} from "../FormElements/schemas";
import NewPrescriptionForm from "../Pharmacy/Forms/NewPrescriptionForm";
import PatientAllergyForm from "../Pharmacy/Forms/NewAllergyForm";
import PatientVaccinationForm from "../Pharmacy/Forms/NewVaccinationForm";

export type DrawerFormProps = {
  patientId?: string;
  onClose: () => void;
};



type SectionKey = "prescription" | "allergies" | "vaccinations";

type MedicalSectionConfig = {
  key: SectionKey;
  title: string;
  fallbackData: string[]; // last 3 items fallback
  drawerTitle: string;
  DrawerComponent: React.FC<DrawerFormProps>;

};

const MEDICAL_SECTIONS: MedicalSectionConfig[] = [
  {
    key: "prescription",
    title: "Prescription",
    fallbackData: ["Amoxil", "Ciprofloxacin", "Azithromycin"],
    drawerTitle: "Add New Prescription",
    DrawerComponent: NewPrescriptionForm,
  },
  {
    key: "allergies",
    title: "Allergies",
    fallbackData: ["Peas", "Onions", "Amoxil"],
    drawerTitle: "Add New Allergy",
    DrawerComponent: PatientAllergyForm,
  },
  {
    key: "vaccinations",
    title: "Vaccinations",
    fallbackData: ["Covid-19", "Tetanus"],
    drawerTitle: "Add New Vaccination",
    DrawerComponent: PatientVaccinationForm,
  },
];


type PatientMedicalCardsProps = {
    patientDetails?: {
        patientId?: string;
    };
};

const PatientMedicalCards = ({
    patientDetails,
}: PatientMedicalCardsProps) => {
    const [prescriptionForm] = Form.useForm();
    const [allergyForm] = Form.useForm();
    const [vaccinationForm] = Form.useForm();
    const [openDrawer, setOpenDrawer] = useState(false);
  const [activeSection, setActiveSection] = useState<MedicalSectionConfig | null>(null);

    const pathname = usePathname();
    const router = useRouter();

    const handleCloseDrawer = () => {
        setOpenDrawer(false);
        setActiveSection(null);
        // router.replace(pathname);
    };

    

    const handleOpenDrawer = (section: MedicalSectionConfig) => {
    setActiveSection(section);
    setOpenDrawer(true);
  };



    return (
        <div className="w-full">
                  <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        {MEDICAL_SECTIONS.map((section) => {
          // future-proof: API → fallback
          const records = section.fallbackData.slice(0, 3);

          return (
            <div
              key={section.key}
              className="bg-[#F5F5F5] border border-gray-200 rounded-lg p-5 flex flex-col gap-4 shadow-sm"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-bold text-[#101010]">
                  {section.title}
                </h3>
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => handleOpenDrawer(section)}
                  className="!bg-[#1175C0] hover:!bg-[#1680d1] font-medium flex items-center border-none shadow-none"
                >
                  Add New
                </Button>
              </div>

              <div className="flex flex-wrap gap-2">
                {records.length > 0 ? (
                  records.map((item, index) => (
                    <span
                      key={`${section.key}-${index}`}
                      className="px-4 py-1.5 bg-[#F5F5F5] text-gray-700 text-sm font-medium rounded-full border border-gray-300/50"
                    >
                      {item}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400 text-sm italic">
                    No records added yet.
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </section>


                  <SofiaDrawers
        title={
          <p className="text-xl text-[#101010]">
            {activeSection?.drawerTitle ?? "Add Record"}
          </p>
        }
        placement="right"
        open={openDrawer}
        onClose={handleCloseDrawer}
        width={520}
        maskClosable={false}
        zIndex={1005}
      >
        {activeSection && (
          <activeSection.DrawerComponent
            patientId={patientDetails?.patientId}
            onClose={handleCloseDrawer}
          />
        )}
      </SofiaDrawers>
    </div>
  );
};

export default PatientMedicalCards;