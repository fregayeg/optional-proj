import {
  EPossibleDateTypes,
  SpecialFilterDates
} from "./ISpecialFilterDate";

export interface ISpecialFilter {
  buttonOn: boolean,
  datesInterval: SpecialFilterDates,
  sumInterval: {
    sumFrom: number,
    sumTo: number
  },
  dateTypeInUse: EPossibleDateTypes | null,
  datePickerOn: boolean
}
