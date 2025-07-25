export function formatRelativeTime(
  date: Date | number,
  locales?: Intl.LocalesArgument,
  options?: Intl.RelativeTimeFormatOptions
): string {
  const time = typeof date === "number" ? date : date.getTime();
  const delta = Math.trunc((time - Date.now()) / 1000);
  const cutoffs = [
    60,
    3600,
    86400,
    7 * 86400,
    30 * 86400,
    365 * 86400,
    Number.POSITIVE_INFINITY,
  ];
  const units: Intl.RelativeTimeFormatUnit[] = [
    "second",
    "minute",
    "hour",
    "day",
    "week",
    "month",
    "year",
  ];
  const unitIndex = cutoffs.findIndex((cutoff) => cutoff > Math.abs(delta));
  const divider = unitIndex !== 0 ? cutoffs[unitIndex - 1] : 1;
  const rtf = new Intl.RelativeTimeFormat(locales, options);
  return rtf.format(Math.trunc(delta / divider), units[unitIndex]);
}
