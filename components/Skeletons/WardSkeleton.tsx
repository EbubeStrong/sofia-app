import { Skeleton } from "antd";

const WardCardSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white border border-solid border-[#101010]/10 rounded-lg">
      <div className="flex justify-between w-full">
        {/* Left section */}
        <div className="flex flex-col gap-1">
          {/* Title */}
          <Skeleton.Input active style={{ width: 160, height: 20 }} />

          {/* Subtitle */}
          <Skeleton.Input active style={{ width: 200, height: 12 }} />

          {/* Details */}
          <div className="mt-3 flex flex-col gap-1">
            <Skeleton.Input active style={{ width: 140, height: 12 }} />
            {/* <Skeleton.Input active style={{ width: 120, height: 14 }} />
            <Skeleton.Input active style={{ width: 80, height: 14 }} /> */}
            <Skeleton.Input active style={{ width: 220, height: 12 }} />
          </div>
        </div>

        {/* Right section */}
        <div className="flex flex-col items-end gap-1">
          <Skeleton.Button
            active
            style={{ width: 60, height: 26, borderRadius: 50 }}
          />
          <Skeleton.Input active style={{ width: 50, height: 12 }} />
        </div>
      </div>
    </div>
  );
};

export default WardCardSkeleton;
