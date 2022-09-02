import { EPossibleDateTypes } from "../../../model";

export interface ISpecialFilter {
  buttonOn: boolean,
  datesInterval: {
    dateFrom: Date,
    dateTo: Date
  },
  dateTypeInUse: EPossibleDateTypes | null,
  direction: string,
  datePickerIsOn: boolean
}
