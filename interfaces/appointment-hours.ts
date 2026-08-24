export interface IAppointmentHoursProps {
  formattedDayOfWeek: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  id: string;
  dayOfWeek: number;
}

export interface IAppointmentHoursOptions {
  label: string;
  value: string;
}
