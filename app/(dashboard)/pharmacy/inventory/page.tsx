// import PharmacyInventory from "@/layouts/pharmacy/inventory";
// // import PharmacyInventoryModule from "@/layouts/pharmacy/inventory";
// import React from "react";

// type Props = {
//   searchParams: {
//     page_number?: string;
//     page_size?: string;
//     q?: string;
//     search?: string;
//     priority?: string;
//     visitStatus?: string;
//     eventType?: string;
//     date?: string;
//   };
// };

// const PharmacyInventoryModule: React.FC<Props> = async () => {

//   return (
//     <PharmacyInventory />
//     // <PharmacyInventoryModule />
//   )
// }
// export default PharmacyInventoryModule;


import { redirect } from "next/navigation";

export default function InventoryIndexPage() {
  redirect("/pharmacy/inventory/dashboard");
}
