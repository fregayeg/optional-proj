import { BasicReactComponentProps } from "@Root/type";
import { ISpecialFilter as ExchangeSpecialFilter } from "../../model";

export interface ISpecialFilterSpinner extends BasicReactComponentProps {
    onChangeDateInUse?: Function | any,
    dispatch: Function,
    specialFilter: ExchangeSpecialFilter ,
    closeDatepickerBottomsheet: Function
}
