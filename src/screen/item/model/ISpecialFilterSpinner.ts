import { BasicReactComponentProps } from "@Root/type";
import { ISpecialFilter } from "./ISpecialFilter";

export interface ISpecialFilterSpinner extends BasicReactComponentProps {
  onChangeDateInUse?: Function | any,
  dispatch: Function,
  specialFilter: ISpecialFilter,
  closeDatepickerBottomsheet: Function
}
