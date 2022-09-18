import { configureStore } from '@reduxjs/toolkit';
import reducers from "./reducers";
import apiInstance from "../screen/item/api/apiItems";

export const store = configureStore( {
    reducer: reducers,
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: {
                ignoredPaths: ["item.specialFilter.datesInterval"],
                ignoredActions: ["item/changeSpecialFilterDatesInterval"]
            },
        } ).concat(apiInstance.middleware),
    devTools: true
} );

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
