import {IExchange} from "../../api/apiExchanges";
import {ISpecialFilter} from "./specialFilter/ISpecialFilter";

export interface IExchangeState {
  list: Array<IExchange>,
  totalResults: number,
  loadMore: boolean,
  count: number,
  filter: string,
  specialFilter: ISpecialFilter
}
