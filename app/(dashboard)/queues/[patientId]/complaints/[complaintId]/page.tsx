import React from "react";
import tw from "tailwind-styled-components";

//components
import BackButton from "@/components/BackButton";

const Content = tw.p`p-3 text-[#101010] text-base font-normal`;

const headersList = ["Date Edited", "Edited by", "Old", "New"];

const bodyList = Array.from({ length: 6 }, (_, index) => ({
  key: index,
  date: "2023-06-01",
  editedBy: "John Doe",
  old: "Patient Diagnoses: A bar chart can be used to show the number of patients diagnosed with each chronic condition (e.g., diabetes, hypertension, asthma). Each bar represents a different chronic condition, with the height of the bar indicating the number of patients affected.",
  new: "Patient Diagnoses: A bar chart can be used to show the number of patients diagnosed with each chronic condition (e.g., diabetes, hypertension, asthma). Each bar represents a different chronic condition, with the height of the bar indicating the number of patients affected.",
}));

const ComplaintDetailsModule = () => {
  return (
    <main className="mt-6 xl:mt-0 flex flex-col gap-5">
      <header className="space-y-2">
        <BackButton>Back</BackButton>
        <h1 className="text-2xl text-sofia_dark font-semibold font-libre_franklin">
          View Daniel&apos;s Complaint
        </h1>
      </header>

      <section className="w-full overflow-x-auto">
        <div className="min-w-max">
          {/* Table Header */}
          <div className="grid grid-cols-[150px_150px_300px_300px]">
            {headersList.map((header) => (
              <p
                className="p-3 font-medium text-base text-[#101010]/70 whitespace-nowrap"
                key={header}
              >
                {header}
              </p>
            ))}
          </div>

          {/* Table Body */}
          <div className="space-y-3 md:space-y-4">
            {bodyList.map((body) => (
              <div
                className="grid grid-cols-[150px_150px_300px_300px] border border-solid border-[#101010]/30 rounded-md"
                key={body.key}
              >
                <Content className="">{body.date}</Content>
                <Content className="">{body.editedBy}</Content>
                <Content className="">{body.old}</Content>
                <Content className="">{body.new}</Content>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <section>
        <div className="min-w-max grid grid-cols-4">
          {headersList.map((header) => (
            <p className="" key={header}>
              {header}
            </p>
          ))}
        </div>
        <div className="">
          {bodyList.map((body) => (
            <div className="grid grid-cols-4" key={body.key}>
              <p className="min-w-[50px]">{body.date}</p>
              <p className="min-w-[150px]">{body.editedBy}</p>
              <p className="min-w-[150px]">{body.old}</p>
              <p className="min-w-[150px]">{body.new}</p>
            </div>
          ))}
        </div>
      </section> */}
    </main>
  );
};

export default ComplaintDetailsModule;
