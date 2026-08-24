import { usePathname, useRouter } from "next/navigation";

//components
import { PendingIcon } from "@/assets/icons";

interface PatientApprovalProps {
  setOpenCancelRequest: React.Dispatch<React.SetStateAction<boolean>>;
}

const benefits = [
  {
    id: 1,
    label: "Empowerment:",
    desc: "Patients have greater control over their health information, leading to more personalized and informed healthcare.",
  },
  {
    id: 2,
    label: "Convenience:",
    desc: "Reduces the need for physical documents and makes it easier to organize and retrieve health data.",
  },
  {
    id: 3,
    label: "Efficiency:",
    desc: "Speeds up the process of healthcare delivery by providing immediate access to medical history and reducing redundancies in tests and treatments.",
  },
];

const PatientApproval: React.FC<PatientApprovalProps> = ({
  setOpenCancelRequest,
}) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-col gap-6 py-2">
      <div>
        <PendingIcon />
        <h2 className="text-lg xl:text-xl text-[#010101] font-semibold mt-2">
          Waiting Patient Approval
        </h2>
      </div>

      <div>
        <p className="text-lg text-[#010101] font-semibold mb-3">Benefits</p>
        <ul className="space-y-2 list-disc ml-4">
          {benefits.map((item) => (
            <li key={item.id} className="text-sm md:text-base text-[#010101]">
              <span className="font-medium">{item.label}</span>{" "}
              <span>{item.desc}</span>
            </li>
          ))}
        </ul>
      </div>

      <p className="text-base text-[#1175C0] font-semibold text-center my-2">
        Waiting Patient Approval in 0:34
      </p>

      <button
        className="w-full max-w-full h-[50px] hidden bg-[#D91F11] text-white text-base font-semibold rounded-lg mb-4"
        type="button"
        onClick={() => setOpenCancelRequest(true)}
      >
        Cancel Request
      </button>

      <button
        className="w-full max-w-full h-[50px] bg-[#1175C0] text-white text-base font-semibold rounded-lg mb-4"
        type="button"
        onClick={() => {
          router.push(
            pathname === `/patients/access`
              ? `/patients/1/summary`
              : `/queues/1/summary`
          );
        }}
      >
        Proceed
      </button>
    </div>
  );
};

export default PatientApproval;
