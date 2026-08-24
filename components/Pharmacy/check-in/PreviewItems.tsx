export const PreviewItem = ({
  label,
  value,
}: {
  label: string;
  value?: React.ReactNode;
}) => {
  if (!value) return null;

  return (
    <div className="space-y-1">
      <p className="text-sm text-gray-500">{label}</p>
      <p className="text-base font-medium text-gray-900">
        {value}
      </p>
    </div>
  );
};

export const renderList = (items?: string[]) =>
  items && items.length ? items.join(", ") : "—";

