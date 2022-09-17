import { rest } from 'msw'
// import exchangesList from "./data/exchanges";
import WsConstants from "@app/tests/mock-server/data/wsConstants";
import {  } from "@app/"

const handlers = [
    // get exchanges
    rest.get(
        `/exchanges/getAll`, (req, res, ctx) => {

            let responseBody;
            
            // console.log("req params ", req.url.searchParams);
            const status = req.url.searchParams.get("status");
            
            if (status) {
                console.log("status received in server: ", status);
                let filteredList: Array<IApiExchange> = exchangesList.filter(exchange => exchange.status === status);
               
                const count: number = filteredList.length;

                if(filteredList.length > 5)
                    filteredList = filteredList.slice(0,1);
                
                responseBody = {
                    "totalResults": count,
                    "exchanges": filteredList
                }
            } else {
                responseBody = {
                    "totalResults": exchangesList.length,
                    "exchanges": exchangesList.slice(0, 4) // take 5
                };
            }

            const response = ctx.json(responseBody);
            // console.log("response:  ", responseBody);

            ctx.status(200);
            ctx.delay(300);
            return res(response)
        }),
  rest.get(
    `/items/getALl`, (req, res, ctx) => {

      // 8 possible params, all are optional except 
      const paramStatus = req.url.searchParams.get(ReimbursementWsParams.STATUS_CODE);

      const paramIndexFrom = req.url.searchParams.get(ReimbursementWsParams.INDEX_FROM);
      // const paramIndexTo = req.url.searchParams.get(ReimbursementWsParams.INDEX_TO) ;
      // const paramAmountFrom = req.url.searchParams.get(ReimbursementWsParams.AMOUNT_FROM);
      // const paramAmountTo = req.url.searchParams.get(ReimbursementWsParams.AMOUNT_TO);
      // const paramDateFrom = req.url.searchParams.get(ReimbursementWsParams.DATE_FROM);
      // const paramDateTo = req.url.searchParams.get(ReimbursementWsParams.DATE_TO);

      let responseBody;

      // if (status) {
      // console.log("Reimbursmeent <parameter> received in mock server: ", ...);

      // TODO
      let fetchedList: Array<IApiReimbursement> = reimbursements.filter(
        (Item: IApiReimbursement) => {
          
          // let returnObject: boolean = false;
          //
          // if(paramStatus)
          //   returnObject = Item.status === paramStatus;
          //
          // if(paramIndexFrom) {
          //  
          //   const indexFrom = DateTime.fromISO(paramIndexFrom);
          //   console.log("indexFrom log: ", indexFrom);
          // }
        });

      const { RESPONSE_ATTRIBUTE } = WsConstants["Item"];
      
      responseBody = {
        [RESPONSE_ATTRIBUTE.TOTAL_RESULTS]: reimbursements.length,
        [RESPONSE_ATTRIBUTE.REIMBURSEMENTS]: fetchedList
      }

      const response = ctx.json(responseBody);
      console.log("reimbursements list response:  ", responseBody);

      ctx.status(200);
      ctx.delay(300);
      return res(response)
    }
  )
]

export { handlers }
