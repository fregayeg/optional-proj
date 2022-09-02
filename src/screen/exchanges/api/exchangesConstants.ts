export enum StatusCode {
    SN = "SN",
    PN = "PN",
    IP = "IP"
}

export const Status = {
    PENDING: {
        code: StatusCode.PN,
        label: "En attente"
    },
    IN_PROGRESS: {
        code: StatusCode.IP,
        label: "En cours"
    },
    SENT: {
        code: StatusCode.SN,
        label: "Envoyé"
    },
}
