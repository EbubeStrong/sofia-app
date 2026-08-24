import { Skeleton } from "antd";

export const StatCardSkeleton = () => {
  return (
    <div className="relative p-4 rounded-lg border shadow-sm flex flex-col gap-2">
      {/* Title */}
      <Skeleton.Input active style={{ width: 120, height: 12 }} size="small" />

      {/* Amount */}
      <Skeleton.Input active style={{ width: 50, height: 16 }} size="small" />

      {/* Icon circle */}
      <div className="absolute top-0 right-0 m-4">
        <Skeleton.Avatar active size="large" />
      </div>
    </div>
  );
};
