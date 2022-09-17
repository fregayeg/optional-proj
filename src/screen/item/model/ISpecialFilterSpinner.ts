import { BasicReactComponentProps } from "@Root/type";
import { ISpecialFilter as ReimbursementSpecialFilter } from "@app/screens/ReimbursementsScreen/model/ISpecialFilter";

export interface ISpecialFilterSpinner extends BasicReactComponentProps {
  onChangeDateInUse?: Function | any,
  dispatch: Function,
  specialFilter: ReimbursementSpecialFilter,
  closeDatepickerBottomsheet: Function
}
