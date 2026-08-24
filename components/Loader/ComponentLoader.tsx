import React from "react";
import Loader from ".";

interface ComponentLoaderProps {
  label: string;
  height?: number;
}

const ComponentLoader: React.FC<ComponentLoaderProps> = ({
  label,
  height = 600,
}) => {
  return (
    <div className="flex justify-center items-center" style={{ height }}>
      <div className="mx-auto text-center">
        <Loader />
        <p className="text-center text-base text-[#101010]/70">{label}</p>
      </div>
    </div>
  );
};

export default ComponentLoader;
