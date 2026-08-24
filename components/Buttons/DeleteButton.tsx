import React from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

interface IDeleteProps {
  onSubmitAction?: () => void;
}

const DeleteButton: React.FC<IDeleteProps> = ({ onSubmitAction }) => {
  return (
    <button type="button" onClick={onSubmitAction}>
      <RiDeleteBin5Line className="text-[#D91F11] cursor-pointer text-lg" />
    </button>
  );
};

export default DeleteButton;
