import { CurrencyIsoCode } from "../api/itemsConstants";

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
