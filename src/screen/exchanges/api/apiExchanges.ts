// /**
//  * FRE - exchanges api endpoints manager
//  */
// import { api as ExtranetIgaTnAPi } from '../../login/api/apiAuth'
import { tranformExchange } from "../state/exchangeBusinessUtils";
// import { specialFilerInitialState } from "../state/exchangeSlice";
// import { map } from "@app/utils/arrays";
//
// // FRE - a model to format for UI
export interface IExchange {
    "id": number, // e.g: 89, 101..N
    "title": string, // e.g: "Relevé de prestations Assuré", "Adhésion - envoi identifiants"
    "direction": string, // e.g: "Envoyé" / "Reçu"
    "senderName": string, // e.g: "Extranet IGATN", "Mailbox" or else
    "creationDate": string, // e.g: "20/2/2022", "01/1/2022".. 
    "statusCode": string // e.g: "SN", "IP" and "PN"
}

// FRE - a model as in API response 
export interface IApiExchange {
    id: number,
    title: string,
    sens: string,
    source: string,
    creationDate: string,
    status: string
}
//
// // FRE - the main model of api response
// // TODO - FRE - consider reading "code" (http code) and "message"
// export interface IApiExchangesDefinition {
//     totalResults: number,
//     exchanges: Array<IApiExchange>,
// }
//
// // FRE - the model of formatted data
// export interface IExchangesDefinition {
//     totalResults: number,
//     exchanges: Array<IExchange>
// }
//
// // FRE - the main model of formatted data
// export interface IExchangesFormatted extends IExchangesDefinition{
//     count: number,
//     filter: string,
//     dateFrom: string,
//     dateTo: string,
//     direction: string
// }
//
// // FRE - the api parameters model
// export interface IApiExchangesParams {
//     currentCount: number,
//     statusCode?: string
//     dateFrom?: string,
//     dateTo?: string,
//     direction?: string
// }
//
//
// export const {useGetExchangesQuery, endpoints} = ExtranetIgaTnAPi.injectEndpoints({
//     endpoints: (builder) => ({
//         getExchanges: builder.query<IExchangesFormatted,IApiExchangesParams>({
//             query: ({currentCount, statusCode, dateFrom, dateTo, direction  }) => {
//
//                 // console.log("api params: ", dateFrom, dateTo,direction);
//
//                 // FRE - WARN: PLEASE USE URLSearchParams instead of URL 
//                 // IN TEST OR YOU'LL face an error
//                 const url: URL = new URL('/exchanges/getAll');
//
//                 // control on parameters
//                 url.searchParams.append("skip", String(currentCount));
//                 url.searchParams.append("take", String(5));
//
//                 if(statusCode && statusCode !== "ALL")
//                     url.searchParams.append("status", String(statusCode));
//                
//                 if(dateFrom) url.searchParams.append("from", String(dateFrom))
//                
//                 if(dateTo) url.searchParams.append("to", String(dateTo))
//                
//                 if(direction) url.searchParams.append("direction", String(direction))
//
//                  return String(url);
//             },
//             // FRE - transformResponse can transform the response of the query before injecting it into store
//             transformResponse(response: IApiExchangesDefinition, meta, arg: IApiExchangesParams): Promise<IExchangesFormatted> | IExchangesFormatted {
//
//                 // get data 
//                 const {totalResults, exchanges} = response;
//
//                 // transform all elements in exchanges array
//                 const newExchanges: Array<IExchange> = map(tranformExchange, exchanges)
//
//                 // return a formatted object
//                 return {
//                     totalResults,
//                     exchanges: newExchanges,
//                     count: arg.currentCount || 0,
//                     filter: arg.statusCode || "ALL",
//                     dateFrom: arg.dateFrom || specialFilerInitialState.datesInterval.dateFrom.toString(),
//                     dateTo: arg.dateTo || specialFilerInitialState.datesInterval.dateTo.toString(),
//                     direction: arg.direction || specialFilerInitialState.direction.toString()
//
//                 }
//             }
//         })
//     }),
// })
//
