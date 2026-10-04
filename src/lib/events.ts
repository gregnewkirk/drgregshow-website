// Dates can be a precise Pacific day (YYYY-MM-DD) or an announced month (YYYY-MM).
// A month-only event remains upcoming until that entire month has ended.
export function eventDateHasPassed(date: string, today: string): boolean {
  return Boolean(date) && date < (date.length === 7 ? today.slice(0, 7) : today);
}
