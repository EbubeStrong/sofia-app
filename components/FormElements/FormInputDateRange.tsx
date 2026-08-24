import { DatePicker } from "antd";
import { RiCalendar2Fill } from "react-icons/ri";
import type { TimeRangePickerProps } from "antd";

//components
import { FormInputDatePickerContainer } from "./styles";

type TFormInputDateRange = {
  showTime?: boolean;
  presets?: TimeRangePickerProps["presets"];
};

const { RangePicker } = DatePicker;

const FormInputDateRange: React.FC<TFormInputDateRange> = ({
  showTime,
  presets,
}) => {
  return (
    <FormInputDatePickerContainer>
      <RangePicker
        suffixIcon={<RiCalendar2Fill className="text-xl" />}
        showTime={showTime}
        presets={presets}
      />
    </FormInputDatePickerContainer>
  );
};

export default FormInputDateRange;
