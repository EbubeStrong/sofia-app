"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

//components
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import SofiaDrawers from "../Drawers";

interface IPatientSidemenuProps {
  routeId: string;
}

const PatientSideMenu: React.FC<IPatientSidemenuProps> = ({ routeId }) => {
  const pathname = usePathname();
  const [openSidemenu, setOpenSidemenu] = useState(false);

  const BASE_URL = `/queues/${routeId}`;

  const PatientSideMenu = [
    {
      title: "Medical Record",
      content: [
        {
          title: "Patient Complaints",
          link: `${BASE_URL}/complaints`,
        },
        {
          title: "Vitals Signs",
          link: `${BASE_URL}/vitals`,
        },
        {
          title: "Diagnosis",
          link: `${BASE_URL}/diagnosis`,
        },
        {
          title: "Lab Tests",
          link: `${BASE_URL}/laboratory-test`,
        },
        {
          title: "Imaging",
          link: `${BASE_URL}/imaging`,
        },
        {
          title: "Doctors Note",
          link: `${BASE_URL}/doctors-note`,
        },
        {
          title: "Allergies",
          link: `${BASE_URL}/allergies`,
        },
      ],
    },
    {
      title: "Treatment",
      content: [
        {
          title: "Treatments",
          link: `${BASE_URL}/treatments`,
        },
        {
          title: "Nurses Note",
          link: `${BASE_URL}/nurses-note`,
        },
        {
          title: "Surgeries",
          link: `${BASE_URL}/surgeries`,
        },
        {
          title: "Vaccinations/Immunization",
          link: `${BASE_URL}/vaccinations`,
        },
      ],
    },
  ];

  const renderPatientSidemenu = () => {
    return (
      <div className="bg-white xl:bg-[#F5F5F5] p-2">
        {PatientSideMenu.map((li) => (
          <div key={li.title} className="flex flex-col bg-white xl:p-3">
            <p className="text-base font-bold text-[#101010]/70 mt-2 mb-4">
              {li.title}
            </p>
            <div
              className={`${
                li.title === "Medical Record" ? "" : ""
              } flex flex-col gap-1`}
            >
              {li.content.map((l) => (
                <Link
                  key={l.title}
                  href={l.link}
                  className={`flex items-center gap-2 ${
                    pathname.startsWith(l.link)
                      ? "bg-[#D33B52]/5 !text-[#D33B52] font-semibold border-l-4 border-solid border-[#D33B52]"
                      : "bg-transparent hover:bg-[#00000020] !text-[#101010]/70 hover:text-[#101010]/70 focus:text-[#101010]/70 font-normal"
                  } text-sm px-[10px] py-3 duration-300`}
                  onClick={() => setOpenSidemenu(false)}
                >
                  {l.title}
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-full xl:max-w-[240px]">
      <button
        className="z-[998] bg-white relative shadow-md block xl:hidden py-0.5 px-3 mb-5"
        onClick={() => setOpenSidemenu(!openSidemenu)}
      >
        {!openSidemenu ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </button>

      <div className="hidden xl:block">{renderPatientSidemenu()}</div>

      <SofiaDrawers
        placement={"left"}
        open={openSidemenu}
        onClose={() => setOpenSidemenu(false)}
        width={280}
      >
        <div className="pt-16">{renderPatientSidemenu()}</div>
      </SofiaDrawers>
    </div>
  );
};

export default PatientSideMenu;
