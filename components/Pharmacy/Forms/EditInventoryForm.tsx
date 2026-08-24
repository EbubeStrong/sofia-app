"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Form } from "antd";

import { toast } from "sonner";


import { invalidateQuery } from "@/config/query-client";
import ComponentLoader from "@/components/Loader/ComponentLoader";
import FormConfig from "@/components/FormElements/FormConfig";
import { UserInfoResponse } from "@/interfaces/general";
import storage from "@/config/storage";
import { useInventoryRecordById, useUpdatePharmacyNewMedicineRequest } from "@/services/pharmacy";
import { AddMedicationSchema } from "@/layouts/pharmacy/schema";
import { TCreatePharmacyNewMedicineRequestResponse } from "@/interfaces/pharmacy";
import InventoryDetails from "../inventory/InventoryDetails";


type InventoryFormProps = {
  getInventoryId: string;
  setOpenEditForm: React.Dispatch<React.SetStateAction<boolean>>;
  step: number;
};



type TInventoryFields = {
  name: string;
  storeLocation: string;
  formId: string;
  ndc: string;
  price: number;
  quantity: number;
  manufacturer: string;
  expiryDate: string;
  attachment?: File; // optional, include if there's a file upload
  uploadedFileUrl?: string; // optional, include if the file upload returns a URL
};


const EditInventoryForm: React.FC<InventoryFormProps> = ({
  setOpenEditForm,
  getInventoryId,
  step

}) => {
  const [user, setUser] = useState({} as UserInfoResponse);
  const [form] = Form.useForm();

useEffect(() => {
      const user = storage.getUser();
      console.log("user from inventory useEffect", user);
      setUser(user as UserInfoResponse);
    }, [user?.hospitalId, user?.id]);

  

  const {
    data: inventoryRecord,
    isFetching: isFetchingInventoryRecord,
    isSuccess: isInventoryRecordSuccess,
  } = useInventoryRecordById(getInventoryId);


  const { mutate: updateInventory, isPending: isUpdatingInventory } = useUpdatePharmacyNewMedicineRequest(getInventoryId);


  const getFieldValuesByStep = useCallback(
    ( inventoryRecord: TCreatePharmacyNewMedicineRequestResponse["data"]) => {

          return {
            name: inventoryRecord.name ?? "",
            formId: inventoryRecord.form ?? "",
            storeLocation: inventoryRecord.storeLocation ?? "",
            manufacturer: inventoryRecord.manufacturer ??  "",
            ndc: inventoryRecord.nDC ?? "",
            price: inventoryRecord.price ?? 0,
            quantity: inventoryRecord.quantity ?? 0,
            expiryDate: inventoryRecord.expiryDate ?? "",
            attachment: inventoryRecord.attachment ?? undefined,
            uploadedFileUrl: inventoryRecord.uploadedFileUrl ?? undefined,
          };
        
      
    },
    []
  );

  useEffect(() => {
    if (!isInventoryRecordSuccess || !inventoryRecord) return;

    const fieldsToSet = getFieldValuesByStep(inventoryRecord);
    if (fieldsToSet) {
      form.setFieldsValue(fieldsToSet);
    }
  }, [form, isInventoryRecordSuccess, inventoryRecord, getFieldValuesByStep]);

  const handleSubmitMedication = (values: TInventoryFields) => {
    const userId = user?.id;
      const hospitalId = user?.hospitalId;
      console.log("User ID:", userId);
      console.log("Hospital ID:", hospitalId);
      console.log("Submitting new medicine with values:", values);
    
      if (!userId || !hospitalId) {
        toast.error("hospital information missing");
        return;
      }
    const payload = {
      userId: userId,
      hospitalId: hospitalId,
      name: values.name,
      form: values.formId,
      storeLocation: values.storeLocation,
      price: values.price,
      quantity: values.quantity,
      manufacturer: values.manufacturer,
      nDC: values.ndc,
      expiryDate: values.expiryDate,
      attachment: values.attachment, // optional, include if there's an uploaded file
      
      uploadedFileUrl: values.uploadedFileUrl, // optional, include if the file upload returns a URL
    };
    updateInventory(
      { body: payload },
      {
        onSuccess: () => {
          toast.success("Inventory info updated successfully");
          invalidateQuery(["existing_inventory"]);
          invalidateQuery(["inventory"]);
          invalidateQuery(["inventory_single_record"]);
          form.resetFields();
          setOpenEditForm(false);
          return;
        },
      }
    );
  };

 const inventoryLoaderText = step === 1 ? "Loading inventory details..." : "Loading inventory info...";

  if (isFetchingInventoryRecord) {
    return <ComponentLoader label={inventoryLoaderText} />;
  }

  return (
    <div>

      {step === 1 && (
          <div>
            <InventoryDetails InventoryDetail={inventoryRecord} />
          </div>
      )}

      {step === 2 && (
        <FormConfig
          form={form}
          schema={AddMedicationSchema()}
          onSubmit={handleSubmitMedication}
          btnText="Save"
          twClassStyle="grid grid-cols-1 gap-x-6"
          btnLoading={isUpdatingInventory}
          formName="add-medication-form"
          />
      )}
    </div>
  );
};

export default EditInventoryForm;