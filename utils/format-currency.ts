export const formatToCurrency = (amount: number, currency: string): string => {
  return amount.toLocaleString("en-NG", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: 0,
  });
};
