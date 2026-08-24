import React from "react";

interface IArchiveProps {
  onSubmitAction?: () => void;
}

const ArchiveButton: React.FC<IArchiveProps> = ({ onSubmitAction }) => {
  return (
    <button
      onClick={onSubmitAction}
      className="text-[#D91F11] text-lg font-bold border border-[#D91F11] rounded-[10px] py-[10px] h-12 px-5 w-fit"
    >
      Archive User
    </button>
  );
};

export default ArchiveButton;
