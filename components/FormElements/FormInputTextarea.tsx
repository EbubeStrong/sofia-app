import { Input, InputProps } from "antd";

interface IFormTextAreaProps {
  placeholder?: string;
  label?: string;
  value?: InputProps["value"];
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
}

//components
import { FormInputTextAreaContainer } from "./styles";

const FormInputTextarea: React.FC<IFormTextAreaProps> = ({
  placeholder,
  label,
  value,
  onChange,
}) => {
  const { TextArea } = Input;

  return (
    <FormInputTextAreaContainer>
      {label && (
        <p className="text-base text-[#101010] font-medium mb-1.5">{label}</p>
      )}
      <TextArea 
      placeholder={placeholder} 
      rows={4} 
      value={value}
      onChange={onChange}
      />
    </FormInputTextAreaContainer>
  );
};

export default FormInputTextarea;
