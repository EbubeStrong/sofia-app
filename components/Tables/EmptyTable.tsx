import React from "react";

interface IEmptyTableProps {
  message?: string;
  description?: string;
  extra?: React.ReactNode;
  icon?: React.ReactNode;
}

const EmptyTable: React.FC<IEmptyTableProps> = ({
  message,
  description,
  extra,
  icon,
}) => {
  return (
    <section className="relative py-20 flex flex-col gap-3">
      {icon && (
        <div className="mx-auto text-center flex justify-center">{icon}</div>
      )}
      {(message || description) && (
        <div>
          {message && (
            <p className="text-sm md:text-xl text-sofia_dark font-bold font-libre_franklin leading-tight text-center">
              {message}
            </p>
          )}
          {description && (
            <p className="text-base text-sofia_dark/50 font-normal text-center">
              {description}
            </p>
          )}
        </div>
      )}

      {extra && extra}
    </section>
  );
};

export default EmptyTable;
