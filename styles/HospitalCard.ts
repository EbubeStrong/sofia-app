import tw from "tailwind-styled-components";

export const DCard = tw.div`
    ${(p: Partial<{ $type: string }>) =>
       p.$type === "totalPatients" || p.$type === "totalPrescriptions" || p.$type === "pendingRequests"
        ? "bg-[#1D3354] divide-white/10"
        : "bg-white border border-solid border-dark/20"} 

    p-4 rounded-lg h-auto font-libre_franklin
`;

export const DTitle = tw.p`
    ${(p: Partial<{ $type: string }>) =>
      p.$type === "totalPatients" || p.$type === "totalPrescriptions" || p.$type === "pendingRequests"
        ? "text-white"
        : "text-[#101010]/70"}
    pb-2 text-sm font-normal font-libre_franklin
`;
