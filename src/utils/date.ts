import moment from "moment";
import {
  DEVICE_LOCALE,
  DATE_PATTERN
} from "@app/constants/defaultConfig";
/**
 * Format date with default locale and pattern
 *
 * @param date
 */
export function formatDate(date: string | Date): string {
  
  let result = "N/A";

  moment.locale(DEVICE_LOCALE);

  result = moment(date).format(DATE_PATTERN);


  return result;
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
 * Some string dates might have this -01:00, this could make
 * working with dates difficult, this function removes that expression
 * 
 * @param dateAsString
 */
export function removeUtcExpression(dateAsString: string){
  return dateAsString.substr( 0, dateAsString.indexOf(' '));
}