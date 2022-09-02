
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
