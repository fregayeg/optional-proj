import { rest } from 'msw'
import WsConstants from "@app/tests/mock-server/data/wsConstants";
import { WsParam } from "@app/screen/item/api/itemsConstants";
import items from "./data/items";
import { API_BASE_URL } from "@app/constants/defaultConfig";
import { IApiItem } from "@app/screen/item/model/IApiItem";

const handlers = [

  rest.get(
    `${API_BASE_URL}/items/getAll`, (req, res, ctx) => {

      // 8 possible params, all are optional except 
      const paramStatus = req.url.searchParams.get(WsParam.STATUS_CODE);

      const paramIndexFrom = req.url.searchParams.get(WsParam.INDEX_FROM);
      // const paramIndexTo = req.url.searchParams.get(WsParam.INDEX_TO) ;
      // const paramAmountFrom = req.url.searchParams.get(WsParam.AMOUNT_FROM);
      // const paramAmountTo = req.url.searchParams.get(WsParam.AMOUNT_TO);
      // const paramDateFrom = req.url.searchParams.get(WsParam.DATE_FROM);
      // const paramDateTo = req.url.searchParams.get(WsParam.DATE_TO);

      let responseBody;

      console.log("item param received : ", paramStatus);

      // TODO - use filters 
      let fetchedList: Array<IApiItem> = items.filter(
        (item: IApiItem) => {

          let returnObject: boolean = true;

          if(paramStatus)
            returnObject = item.status === paramStatus;
          
          // if(paramIndexFrom) {
          //   const indexFrom = fromISO(paramIndexFrom);
          //   console.log("indexFrom log: ", indexFrom);
          // }
          
          return returnObject;
        });

      const { RESPONSE_ATTRIBUTE } = WsConstants["Item"];
      
      responseBody = {
        [RESPONSE_ATTRIBUTE.TOTAL_RESULTS]: items.length,
        [RESPONSE_ATTRIBUTE.ITEMS]: fetchedList
      }

      const response = ctx.json(responseBody);
      // console.log("items list response:  ", responseBody);

      ctx.status(200);
      ctx.delay(300);
      return res(response)
    }
  )
]

export { handlers }
