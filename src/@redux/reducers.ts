import { combineReducers } from '@reduxjs/toolkit';

import { item } from "@app/screen/item/state";
import { apiInstance } from "@app/screen/item/api/apiItems";

export default combineReducers({ item, [apiInstance.reducerPath]: apiInstance.reducer });
