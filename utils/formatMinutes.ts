function formatMinutes(minutes: number): string {
  const hrs = Math.floor(minutes / 60);
  const mins = minutes % 60;

  if (hrs > 0 && mins > 0) return `${hrs}hr:${mins} mins`;
  if (hrs > 0) return `${hrs} hr`;
  return `${mins} mins`;
}

export default formatMinutes;
