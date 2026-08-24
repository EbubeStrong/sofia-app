import { ISchema } from "./types";

const typeTemplate = "'${label}' is not a valid ${type}";

export const defaultValidateMessages = {
  default: "Validation error on field '${name}'",
  required: "${label} is required",
  enum: "'${name}' must be one of [${enum}]",
  whitespace: "'${name}' cannot be empty",
  date: {
    format: "'${name}' is invalid for format date",
    parse: "'${name}' could not be parsed as date",
    invalid: "'${name}' is invalid date",
  },
  types: {
    string: typeTemplate,
    method: typeTemplate,
    array: typeTemplate,
    object: typeTemplate,
    number: typeTemplate,
    date: typeTemplate,
    boolean: typeTemplate,
    integer: typeTemplate,
    float: typeTemplate,
    regexp: typeTemplate,
    email: typeTemplate,
    url: typeTemplate,
    hex: typeTemplate,
  },
  string: {
    len: "'${name}' must be exactly ${len} characters",
    min: "'${name}' must be at least ${min} characters",
    max: "'${name}' cannot be longer than ${max} characters",
    range: "'${name}' must be between ${min} and ${max} characters",
  },
  number: {
    len: "'${name}' must equal ${len}",
    min: "'${name}' cannot be less than ${min}",
    max: "'${name}' cannot be greater than ${max}",
    range: "'${name}' must be between ${min} and ${max}",
  },
  array: {
    len: "'${name}' must be exactly ${len} in length",
    min: "'${name}' cannot be less than ${min} in length",
    max: "'${name}' cannot be greater than ${max} in length",
    range: "'${name}' must be between ${min} and ${max} in length",
  },
  pattern: {
    mismatch: "'${name}' does not match pattern ${pattern}",
  },
};

export const filterOption = (
  input: string,
  option?: { label: string; value: string }
) => (option?.label ?? "").toLowerCase().includes(input.toLowerCase());

export const checkVisibility = (
  field: ISchema,
  values: Record<string, unknown>
) => {
  if (!field.visibleWhen) return true;

  const { field: depField, equals, notEquals, in: inArray } = field.visibleWhen;

  const current = values[depField];

  if (equals !== undefined) return current === equals;
  if (notEquals !== undefined) return current !== notEquals;
  if (inArray) return inArray.includes(current);

  return true;
};

export function Injector({
  children,
  ...rest
}: {
  children: (props: Record<string, unknown>) => React.ReactElement;
}) {
  return children(rest);
}