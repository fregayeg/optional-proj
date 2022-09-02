/**
 * FRE - Takes Exchange object from api response, and transform it
 * @param exchange
 */
import {IApiExchange, IExchange} from "../api/apiExchanges";
import {Status as ExchangeStatuses} from "../api/exchangesConstants";
import {map} from "@app/utils/arrays";
import {
  ExchangesListFilter,
  ExchangeFilter
} from "../model";


/**
 * FRE - transforms an api exchange object 
 * 
 * @param exchange
 */
export const tranformExchange = (exchange: IApiExchange): IExchange => {
    
    return {
        id: exchange.id,
        title: exchange.title,
        creationDate: exchange.creationDate,
        senderName: exchange.source,
        statusCode: exchange.status,
        direction: exchange.sens
    }
}

/**
 * Revert filter 
 * @param code
 */
export function getStatusLabelByCode(code: string) {

    switch (code) {
        case "PN":
            return ExchangesListFilter.PENDING;
        case "IP":
            return ExchangesListFilter.IN_PROGRESS;
        case "SN":
            return ExchangesListFilter.SENT;
        default:
            return "unknown";
    }
}

/**
 * FRE - get valid & readable filters list
 */
export function getFilters(): Array<ExchangeFilter> {

    type WildFilter = [string, ExchangeFilter];

    /*
    FRE - when we read entries from Status object the result will be like:
    [    
         "PAID",
         {
             "code": "SN",
             "label": "Envoyé"
         },
         ...
    ]
     */
    const wildStatuses:Array<WildFilter> = Object.entries(ExchangeStatuses);

    // this is useful to custom the new form, currently we just 
    // want to select the item with index 1, which is an array
    const transformIntoFilter = (element: WildFilter) => element?.[1];

    // get result
    const result  = map(transformIntoFilter, wildStatuses);

    // add "ALL" filter at the beginning
    result.unshift({
        code: "ALL",
        label: "Tout"
    })

    // console.log("filters : ", result);

    return result;
}

