import React from "react";
import FormInputButton from "../FormElements/FormInputButton";

interface IPatientHeaderProps {
  headerName: string;
  buttonLabel: string;
  addActionLabel?: string;
  onHandleAction?: () => void;
  onViewAction?: () => void;
}

const PatientHeader: React.FC<IPatientHeaderProps> = ({
  headerName,
  buttonLabel,
  onHandleAction = () => {},
  onViewAction = () => {},
  addActionLabel,
}) => {
  return (
    <div className="flex items-center justify-between border border-solid border-[#EAECF0] rounded-[10px] px-2 py-2">
      <h1 className="text-base text-[#667085] font-semibold font-libre_franklin">
        {headerName}
      </h1>
      <div className="flex items-center gap-3">
        {buttonLabel && (
          <button
            onClick={onViewAction}
            className="text-sm text-[#1175C0] font-semibold px-4 h-[40px] border border-solid border-[#1175C0] rounded-[10px]"
          >
            {buttonLabel}
          </button>
        )}

        {addActionLabel && (
          <FormInputButton
            onHandleAction={onHandleAction}
            cssProps={{ $height: "40px", $fontSize: "14px" }}
          >
            {addActionLabel}
          </FormInputButton>
        )}
      </div>
    </div>
  );
};

export default PatientHeader;
