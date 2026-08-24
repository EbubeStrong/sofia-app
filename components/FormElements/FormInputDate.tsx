import { DatePicker, DatePickerProps } from "antd";
import { RiCalendar2Fill } from "react-icons/ri";
import { Dayjs } from "dayjs";

//components
import { FormInputDatePickerContainer } from "./styles";

type TFormInputDate = {
  placeholder?: string;
  presets?: { label: React.ReactNode; value: Dayjs | (() => Dayjs) }[];
  format?: DatePickerProps["format"];
  onChange?: DatePickerProps["onChange"];
};

const FormInputDate: React.FC<TFormInputDate> = ({
  placeholder,
  presets,
  format,
  onChange,
}) => {
  return (
    <FormInputDatePickerContainer>
      <DatePicker
        placeholder={placeholder}
        suffixIcon={<RiCalendar2Fill className="text-xl" />}
        presets={presets}
        format={format}
        onChange={onChange}
      />
    </FormInputDatePickerContainer>
  );
};

export default FormInputDate;
