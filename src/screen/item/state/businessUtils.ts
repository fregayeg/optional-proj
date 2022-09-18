import { StateTypes as ItemStatus } from "../model/EStateTypes";
import {
    Currency,
    Status,
    StatusCode
} from "../api/itemsConstants";
import { map } from "@app/utils/arrays";
import { formatDate } from "@app/utils/date";
import { IApiItemsDefinitionParams } from "../model/api/IApiItemsDefinitionParams";
import { IApiItem } from "../model/IApiItem";
import { IItem } from "../model/IItem";
import {
    ISpecialFilter,
    EPossibleDateTypes
} from "../model";

// FRE - valid filter model
export type ItemFilter = {
    code: string,
    label: string
}

/**
 * FRE - determine status label by code
 * @param code
 */
export function getStatusLabelByCode(code: string): ItemStatus | string {

    switch (code) {
        case StatusCode.NW: {
            return ItemStatus.Nouveau
        }
        case StatusCode.PP: {
            return ItemStatus.PartiellementRembourse
        }
        case StatusCode.PD: {
            return ItemStatus.Rembourse
        }
        default:
            return "Tout"
    }
}

/**
 * MME - determine Key of i18n dictionary by code
 * @param code
 */
export function getVarKeyByCode(code: string): ItemStatus | string {

  switch (code) {
    case StatusCode.NW: {
      return "New"
    }
    case StatusCode.PP: {
      return "Partially paid"
    }
    case StatusCode.PD: {
      return "Paid"
    }
    default:
      return "All"
  }
}

/**
 * FRE - get valid & readable filters list
 */
export function getFilters(): Array<ItemFilter> {
    
    type WildFilter = [string, ItemFilter]; 
    
    /*
    FRE - when we read entries from Status object the result will be like:
    [    
         "PAID",
         {
             "code": "PD",
             "label": "Paid"
         },
         ...
    ]
     */
    const wildStatuses:Array<WildFilter> = Object.entries(Status);

    // this is useful to custom the new form, currently we just 
    // want to select the item with index 1, which is an array
    const transformIntoFilter = (element: WildFilter) => element?.[1];
    
    // get result
    const result  = map(transformIntoFilter, wildStatuses);
    
    // add "ALL" filter at the beginning
    result.unshift({
        code: "ALL",
        label: "All"
    })
    
    return result;
}

/**
 * FRE - currently, there is no treatments on currencies, so 
 * we pass 'EURO' directly
 * 
 * @param code
 */
export function getCurrencySymbolByCode(code: string) {
    return Currency.EURO;
}

/**
 * FRE - revert amount concatenated with currency symbol
 * @param item
 */
export function getAmountFormatted(item: IItem) {
    
    const itemAmount = String(item.amount);
    const currencySymbol = getCurrencySymbolByCode(item.currencyCode).symbole;
    
    return "".concat(itemAmount, currencySymbol);
}


/**
 * FRE - takes Item object from api response, and transform it
 * 
 * @param Item
 */
export const transformItem = ( Item:IApiItem): IItem => {

    // control on date
    const {creationDate,paymentDate,} = Item;

    const targetDate = paymentDate ? paymentDate : creationDate;

    const formattedTargetDate = targetDate.split(' ')[0];
    
    return {
        id: Item.id,
        uniqueDate: formattedTargetDate,
        amount: Item.amount,
        amountPaid: Item.amountPaid,
        beneficiaryFullName: Item.titular,
        status: Item.status,
        hasMissingDocs: Item.hasMissingDocs,
        // currently there is no control on currency
        currencyCode: Currency.EURO.isoCode
    }
}

/**
 * FRE - validate special filter parameters for query
 * 
 * @param queryParams
 * @param specialFilters
 */
export function manageSpecialFilterParams(queryParams: IApiItemsDefinitionParams, specialFilters: ISpecialFilter) {

    const {
        datesInterval,
        dateTypeInUse,
        sumInterval
    } = specialFilters;
    
    // dates
    if (dateTypeInUse) {
        
        const targetDate = datesInterval[dateTypeInUse];
        const datePattern = "yyyy-MM-DD";
        const dateFormatted = formatDate(targetDate, datePattern);

        if (EPossibleDateTypes.DATE_FROM === dateTypeInUse) {
            queryParams.dateFrom = dateFormatted
            queryParams.dateTo = formatDate(datesInterval.dateTo, datePattern);
        }

        if (EPossibleDateTypes.DATE_TO === dateTypeInUse) {
            queryParams.dateTo = dateFormatted;
            queryParams.dateFrom = formatDate(datesInterval.dateFrom, datePattern);
        }
    }
    
    // amounts interval
    if(sumInterval){
        queryParams.amountFrom = sumInterval.sumFrom;
        queryParams.amountTo = sumInterval.sumTo;
        // console.log("sumInterval: ",  sumInterval);
        // console.log("type of amount: ", sumInterval["sumFrom"]);
    }
    return queryParams;
}

/**
 * FRE - useful function to format range slider values for UI
 * @param sumInterval
 */
export function formatAmountSliderCaption (sumInterval: number[]){
    return Object.values(sumInterval).join(' - ');
}
