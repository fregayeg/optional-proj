import moment from "moment";
import { DATE_PATTERN } from "@app/constants/defaultConfig";
/**
 * Format date with default locale and pattern
 *
 * @param date
 * @param pattern
 */
export function formatDate(date: string | Date | null, pattern?: string): string {

  if(date ) {
    const patternToUse = pattern ?? DATE_PATTERN;

    const result = moment(date).format(patternToUse);

    return result;
  }

  return "N/A"
}


/**
 * Add a number of days to a specific date
 * 
 * @param date
 * @param daysToAdd
 */
export function addDays (date: Date, daysToAdd: number): Date {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() + daysToAdd);
  return clone;
}

/**
 * Remove days from a date object
 *
 *  @param date
 * @param daysToRemove
 */
export function removeDays (date: Date, daysToRemove: number): Date {
  const clone = new Date(date.getTime());
  clone.setDate(clone.getDate() - daysToRemove);
  return clone;
}
