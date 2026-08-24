import ConfigTopMenu from "@/components/ConfigTopMenu";

export default function ConfigurationLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="flex flex-col gap-6">
      <section>
        <h1 className="text-2xl font-libre_franklin font-bold text-[#101010] leading-normal">
          Workspace Configuration
        </h1>
        <p className="text-base text-[#101010]/70 font-normal font-libre_franklin">
          Configure hospital structure, departments, wards, rooms, and beds
        </p>
      </section>

      <ConfigTopMenu />

      <div>{children}</div>
    </main>
  );
}
