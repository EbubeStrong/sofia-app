import { RiCloseCircleFill } from "react-icons/ri";

interface CancelRequestContentProps {
  setOpenCancelRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelRequestContent: React.FC<CancelRequestContentProps> = ({
  setOpenCancelRequest,
}) => {
  return (
    <div className="mt-6">
      <div className="w-[70px] h-[70px] flex items-center justify-center bg-[#D91F110D] rounded-full text-[#D91F11] text-[27px]">
        <RiCloseCircleFill />
      </div>
      <h4 className="text-2xl text-sofia_dark font-bold mt-5 mb-4">
        Cancel Request
      </h4>
      <p className="text-sm text-title leading-snug font-normal">
        Each request is valid for 1 minute and will be sent to the patient for
        approval. Please ensure the patient grants permission within this
        timeframe to proceed.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <button className="bg-[#D91F11] text-white text-sm font-semibold py-2 h-12 px-4 rounded-lg">
          Yes, Cancel
        </button>
        <button
          className="bg-[#1010100D] text-[#10101066] text-sm font-semibold py-2 h-12 px-4 rounded-lg"
          onClick={() => setOpenCancelRequest(false)}
        >
          Back
        </button>
      </div>
    </div>
  );
};

export default CancelRequestContent;
