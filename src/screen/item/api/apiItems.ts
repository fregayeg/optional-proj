import {
    createApi,
    fetchBaseQuery
} from '@reduxjs/toolkit/query/react';
import { map } from "@app/utils/arrays";
import { WsParam } from "./itemsConstants";
import { transformItem } from "../state/businessUtils";
import { IItemsDefinition } from "../model/api/IItemsDefinition";
import { IApiItemsDefinition } from "../model/api/IApiItemsDefinition";
import { IApiItemsDefinitionParams } from "../model/api/IApiItemsDefinitionParams";
import { IItem } from "../model/IItem";
import { API_BASE_URL } from "@app/constants/defaultConfig";

export const apiInstance = createApi( {
    reducerPath: "api",
    baseQuery: fetchBaseQuery( {
        baseUrl: API_BASE_URL
    } ),
    endpoints: ( builder ) => ({
        getItems: builder.query<IItemsDefinition, IApiItemsDefinitionParams>( {
            query: ( params: IApiItemsDefinitionParams ) => {

                const {
                    currentCount,
                    status,
                    dateTo,
                    dateFrom,
                    amountFrom,
                    amountTo
                } = params;

                // const url: URL = new URL( '/items/getAll', "/" );

                const searchParams = new URLSearchParams(); 
                
                searchParams.append( WsParam.INDEX_FROM, String( currentCount ) );
               searchParams.append( WsParam.INDEX_TO, String( currentCount + 5 ) );

                if (status && status !== "ALL") searchParams.append( WsParam.STATUS_CODE, status );
                if (dateFrom) searchParams.append( WsParam.DATE_FROM, dateFrom );
                if (dateTo) searchParams.append( WsParam.DATE_TO, dateTo );
                if (amountFrom) searchParams.append( WsParam.AMOUNT_FROM, String( amountFrom ) );
                if (amountTo) searchParams.append( WsParam.AMOUNT_TO, String( amountTo ) );

                return {
                    url: '/items/getAll',
                    params: searchParams,
                }

            },
            transformResponse( response: IApiItemsDefinition, meta, arg: IApiItemsDefinitionParams ): Promise<IItemsDefinition> | IItemsDefinition {

                console.log("response: ", response);
                
                const {totalResults, items} = response;

                const newItems: Array<IItem> = map( transformItem, items )

                return {
                    totalResults,
                    items: newItems
                }
            }
        } )
    }),
} )

export const { useGetItemsQuery } = apiInstance


export default apiInstance;
