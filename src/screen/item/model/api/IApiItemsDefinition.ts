import { IApiItem } from "../IApiItem";

export interface IApiItemsDefinition {
    totalResults: number,
    items: Array<IApiItem>
}
