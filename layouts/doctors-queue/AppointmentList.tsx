import React from "react";

const appointments = [1, 2, 3];

const AppointmentList = () => {
  return (
    <div className="border border-[rgb(33 33 33 / 0.1)] rounded-lg overflow-hidden">
      <p className="text-lg text-white font-medium bg-[#1175C0] border border-[#1175C0] px-4 py-2">
        Today&apos;s appointment
      </p>
      <p className="px-4 py-2 text-[#101010] text-sm bg-[#F5F5F5]">
        Wednesday, January 1, 2025
      </p>
      {appointments.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between px-4 py-3 ${
            appointments[appointments.length - 1] === idx
              ? "border-none"
              : "border-t"
          }`}
        >
          <div className="flex gap-2.5">
            <p className="text-sm">
              13 <br />
              Aug
            </p>
            <div>
              <p className="text-sm">9:30 am - 10am</p>
              <p className="text-sm font-medium">Check-up</p>
            </div>
          </div>
          <div>
            <p className="text-sm">Telemedicine</p>
            <p className="text-sm">Booked 12 Jan 2025</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AppointmentList;
