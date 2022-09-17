// FRE - model for state
import { IReimbursement } from "../api/apiItems";
import { ISpecialFilter } from "./ISpecialFilter";

export interface IReimbursementState {
  list: Array<IReimbursement>,
  totalResults: number,
  count: number,
  filter: string,
  specialFilter: ISpecialFilter,
  loadMoreLoading: boolean,
  apiCallOnHold: boolean
}
