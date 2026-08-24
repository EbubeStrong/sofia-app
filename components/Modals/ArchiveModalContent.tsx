import { useArchivedModalStore } from "@/stores/archiveModalStore";

const ArchiveModalContent = () => {
  const { closeArchivedModal } = useArchivedModalStore();

  return (
    <div className="">
      <p className="text-sm text-title leading-snug font-medium">
        Archiving a user means they will no longer have access to Sofia. Conduct
        an interview to gather the patient&apos;s medical history, including
        past illnesses, surgeries, allergies, medications, and family medical
        history. The patient&apos;s chief complaint or reason for the current
        visit is documented.
      </p>
      <div className="grid grid-cols-2 gap-4 mt-10">
        <button
          className="bg-[#D91F11] text-white text-sm font-semibold py-2 h-12 px-4 rounded-lg"
          onClick={closeArchivedModal}
        >
          Archive
        </button>
        <button
          className="bg-[#1010100D] text-[#10101066] text-sm font-semibold py-2 h-12 px-4 rounded-lg"
          onClick={closeArchivedModal}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ArchiveModalContent;
