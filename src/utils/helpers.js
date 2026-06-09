export const formatCurrency = (value) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

export const getTodayString = () => {
  const d = new Date();
  // Adjust for local timezone offset to avoid previous day being selected
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

export const get30DaysAgoString = () => {
  const d = new Date();
  d.setDate(d.getDate() - 30);
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset());
  return d.toISOString().split('T')[0];
};

export const getSeedFromDate = (dateStr) => {
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  return 0.8 + (Math.abs(hash) % 40) / 100; // Returns between 0.8 and 1.2
};
