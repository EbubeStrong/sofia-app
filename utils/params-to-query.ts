type Primitive = string | number | boolean;
type QueryValue = Primitive | Primitive[];
type QueryParams = Record<string, QueryValue | null | undefined>;

export function paramsObjectToQueryString(payload: QueryParams): string {
  const trimmedPayload = trimObject(payload);
  const paramPayloadToArr = Object.keys(trimmedPayload);

  if (!trimmedPayload || paramPayloadToArr.length < 1) return "";

  const queryString = paramPayloadToArr.reduce((acc, element, index, array) => {
    const value = trimmedPayload[element];
    const stringValue = Array.isArray(value) ? value.join(",") : String(value);

    acc = `${array[0] === element ? "?" : ""}${acc}${element}=${stringValue}${
      array[array.length - 1] !== element ? "&" : ""
    }`;

    return acc;
  }, "");

  return queryString;
}

export const isEmpty = (value: unknown): boolean => {
  if (value === undefined || value === null) return true;

  if (typeof value === "string") return value.trim().length === 0;

  if (typeof value === "object") {
    if (Array.isArray(value)) return value.length === 0;
    return Object.keys(value).length === 0;
  }

  return false;
};

export const trimObject = <T extends QueryParams>(obj: T): Partial<T> => {
  const result: Partial<T> = {};

  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      const value = obj[propName];
      if (!isEmpty(value)) {
        result[propName] = value;
      }
    }
  }

  return result;
};
