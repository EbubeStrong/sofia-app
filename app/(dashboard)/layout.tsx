import { Suspense } from "react";
import { cookies } from "next/headers";

import SideNavigation from "@/components/Dashboard/SideNavigation";
import TopNavigation from "@/components/Dashboard/TopNavigation";
import { STORAGE_KEYS } from "@/utils/roles-enum";

export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = cookies();

  const role = cookieStore.get(STORAGE_KEYS.ROLE)?.value as string;

  return (
    <Suspense>
      <TopNavigation />
      <SideNavigation currentRole={role} />
      <section className="pt-[104px] md:pt-[104px] lg:pt-[104px] xl:pt-[104px] ml-0 xl:ml-[260px] bg-[#F9F9F9] p-4 md:p-6 md:pb-8 min-h-screen h-auto">
        {children}
      </section>
    </Suspense>
  );
}
