import { IApiItem } from "../IApiItem";

export interface IApiItemsDefinition {
    totalResults: number,
    Items: Array<IApiItem>
}
