import { StateTypes } from "../model/EStateTypes";

export enum CurrencySymbol {
    EUR = "€",
    USD = "$"
}

export enum CurrencyIsoCode {
    EUR = "EUR",
    USD = "USD"
}

export const Currency = {
    EURO: {
        isoCode: CurrencyIsoCode.EUR,
        symbole: CurrencySymbol.EUR
    },
    DOLLAR: {
        isoCode: CurrencyIsoCode.USD,
        symbole: CurrencySymbol.USD
    },
}

export enum StatusCode {
    PP = "PP",
    PD = "PD",
    NW = "NW"
}

export const Status = {
    PARTIALLY_PAID: {
        code: StatusCode.PP,
        label: StateTypes.PartiellementRembourse
    },
    NEW: {
        code: StatusCode.NW,
        label: StateTypes.Nouveau
    },
    PAID: {
        code: StatusCode.PD,
        label: StateTypes.Rembourse
    },
}

// FRE - dedicated to any api query related to term 'Item'
export const WsParam = {
    INDEX_FROM: "skip",
    INDEX_TO: "take",
    DATE_FROM: "dateFrom",
    DATE_TO: "dateTo",
    AMOUNT_FROM: "sumMin",
    AMOUNT_TO: "sumMax",
    STATUS_CODE: "status"
}

export const EMPTY_DATE_MASK = "--/--/----"
