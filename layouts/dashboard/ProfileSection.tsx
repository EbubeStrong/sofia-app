import React from "react";

const ProfileSection = () => {
  const profile = [
    { title: "First Name", value: "David", id: 1 },
    { title: "Last Name", value: "Udemezue", id: 2 },
    { title: "Business Name", value: "Stanford Academics", id: 3 },
    { title: "Email", value: "sleemkeen99@gmail.com", id: 4 },
    { title: "Business Name", value: "Standord Academics", id: 5 },
    {
      title: "Business address",
      value: "SaintJohn's Hospital road Maryland",
      id: 6,
    },
    { title: "Country", value: "Nigeria", id: 7 },
    { title: "Date Joined", value: "2 Nov 2023", id: 8 },
    { title: "Company Size", value: "23", id: 9 },
    { title: "Users", value: "24", id: 10 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2">
      {profile.map((item, index) => (
        <div
          key={item.id}
          className={
            index === 9
              ? "py-3 md:border-none border-t border-solid border-[#101010]/10"
              : index === 8
              ? "py-3 border-none"
              : "py-3 border-b border-solid border-[#101010]/10"
          }
        >
          <p className="text-sm text-sofia_dark/80 font-medium font-libre_franklin mb-1">
            {item.title}
          </p>
          <p className="text-lg text-sofia_dark font-libre_franklin font-medium">
            {item.value}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ProfileSection;
