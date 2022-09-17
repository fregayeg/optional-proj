// FRE - we import RTK Query methods from the React-specific entry point
// its because RTKQ can be used with other frameworks such Angular, Svelt etc..
import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

// FRE - a model to format for UI
import { CurrencyIsoCode } from "./itemsConstants";

export interface IItem {
    "id": number, // e.g: 152, 154..N
    "amount": number, // e.g: 100, 120
    "amountPaid": number, // e.g: 90, 100
    "beneficiaryFullName": string, // e.g: "John Doe"
    "uniqueDate": string, // e.g: 28/2/2020
    "status": string, // e.g: "IP", "PD"
    "currencyCode": string | CurrencyIsoCode, // EUR, USD
    "hasMissingDocs": boolean // true / false
}

// FRE - a model as in API response 
export interface IApiItem {
    "id": number, // e.g: 152, 154..N
    "amount": number, // e.g: 100, 120
    "amountPaid": number, // e.g: 90, 100
    "titular": string, // e.g: "John Doe"
    "creationDate": string, // e.g:  
    "paymentDate": string,
    "status":string
    "hasMissingDocs": boolean,
}


export interface IApiItemsDefinition {
    totalResults: number,
    Items: Array<IApiItem>
}

// FRE - the model of formatted data
export interface IItemsDefinition {
    totalResults: number,
    Items: Array<IItem>
}


// FRE - the api parameters model
export interface IApiItemsDefinitionParams {
    currentCount: number,
    status?: string,
    dateFrom?: string,
    dateTo?: string,
    amountFrom?: number,
    amountTo?: number
}

/******************************* RTKQ **********************************/
//
//
// // FRE - Define our single API slice object
// // its worth noting the API here and the injectEndpoints(), which let us split code based on modules
//     // check this: https://redux-toolkit.js.org/rtk-query/api/created-api/code-splitting#injectendpoints
export const apiInstance = createApi({
    reducerPath: "itemsApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "/"
    }),
    endpoints: (builder) => ({
        getItems: builder.query<IItemsDefinition,IApiItemsDefinitionParams>({
            query: (params: IApiItemsDefinitionParams) => {

                const {
                    currentCount,
                    status,
                    dateTo, 
                    dateFrom,
                    amountFrom, 
                    amountTo
                } = params;

                // FRE - URL object requires base URL 
                // for more information visit official docs:
                // https://developer.mozilla.org/en-US/docs/Web/API/URL/URL
                const url: URL = new URL('/items/getAll', API_EXTRANET_IGATN_URL);

                url.searchParams.append(WsParam.INDEX_FROM, String(currentCount));
                url.searchParams.append(WsParam.INDEX_TO, String(currentCount + 5 ));

                if(status && status !== "ALL") url.searchParams.append(WsParam.STATUS_CODE, status);
                if (dateFrom) url.searchParams.append(WsParam.DATE_FROM, dateFrom);
                if (dateTo) url.searchParams.append(WsParam.DATE_TO, dateTo);
                if (amountFrom) url.searchParams.append(WsParam.AMOUNT_FROM, String(amountFrom));
                if (amountTo) url.searchParams.append(WsParam.AMOUNT_TO, String(amountTo));

                // console.log("URL to send : ", String(url));

                return String(url);

            },
            // FRE - transformResponse can transform the response of the query before injecting it into store
            transformResponse(response: IApiItemsDefinition, meta, arg: IApiItemsDefinitionParams): Promise<IItemsDefinition> | IItemsDefinition {

                // get data 
                const {totalResults, Items} = response;

                // transform all elements in Items array
                const newItems: Array<IItem> = map(tranformItem, Items)

                // return a formatted object
                return {
                    totalResults,
                    Items: newItems
                }
            }
        })
    }),
})

// Export the auto-generated hook for the `getPosts` query endpoint
export const { useGetItemsQuery } = apiInstance


export default apiInstance;
