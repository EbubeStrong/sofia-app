import { IFieldData } from "@/components/FormElements/types";

export function getFieldValue(
  fields: IFieldData[],
  fieldName: string
): string | number | undefined {
  const value = fields.find(
    (field) => Array.isArray(field.name) && field.name.includes(fieldName)
  )?.value as string;

  return value;
}
