function getOrdinal(day: number) {
  if (day > 3 && day < 21) return "th";

  switch (day % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}

export function formatLocalDateOnly(
  value?: string | null,
  locale?: string
): string {
  if (!value) return "-";

  const date = new Date(value);

  if (isNaN(date.getTime())) return "-";

  const day = date.getDate();

  const parts = date.toLocaleDateString(locale, {
    month: "short",
    year: "numeric",
    day: "numeric",
  });

  
  return parts.replace(
    String(day),
    `${day}${getOrdinal(day)}`
  );
}
