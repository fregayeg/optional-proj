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
