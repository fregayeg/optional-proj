export type SpecialFilterDates = {
  // dateFrom: Date | null,
  // dateTo: Date | null,
  [x: string ]: Date | null;
}

export enum EPossibleDateTypes {
  DATE_FROM = "dateFrom",
  DATE_TO = "dateTo",
}
