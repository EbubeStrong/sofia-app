import PatientProfile from "@/layouts/patients/PatientProfile";

const ProfileAccessModule = () => {
  return (
    <div className="flex flex-col gap-7">
      <div>
        <h1 className="text-xl xl:text-2xl text-[#010101] font-semibold">
          Patient Profile
        </h1>
        <p className="text-base text-[#010101] font-normal">
          Get Access to your Patient&apos;s Medical Records
        </p>
      </div>

      <PatientProfile />
    </div>
  );
};

export default ProfileAccessModule;
