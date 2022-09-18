// FRE - model for state
import { ISpecialFilter } from "./ISpecialFilter";
import { IItem } from "./IItem";

export interface IItemState {
  list: Array<IItem>,
  totalResults: number,
  count: number,
  filter: string,
  specialFilter: ISpecialFilter,
  loadMoreLoading: boolean,
  apiCallOnHold: boolean
}
