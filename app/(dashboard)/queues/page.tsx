import { fetchDoctorAppointments } from "@/hooks/use-server-fetchers";
import DoctorQueueLayout from "@/layouts/doctors-queue/QueueLayout";
import { IDoctorAppointmentData } from "@/interfaces/doctors";

type Props = {
  searchParams: {
    page_number?: string;
    page_size?: string;
    query?: string;
    unattended?: string;
  };
};

const DoctorQueuesModule: React.FC<Props> = async ({ searchParams }) => {
  const pageNumber = searchParams.page_number;
  const pageSize = searchParams.page_size;
  const unattended = searchParams.unattended;

  const appointmentParams = new URLSearchParams({
    page: pageNumber ?? "1",
    perPage: pageSize ?? "10",
    isUpcoming: unattended as string,
  });

  const appointments = await fetchDoctorAppointments(appointmentParams);

  return (
    <DoctorQueueLayout
      initialData={appointments?.data as IDoctorAppointmentData}
    />
  );
};

export default DoctorQueuesModule;
