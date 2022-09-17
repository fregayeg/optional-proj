import { configureStore } from '@reduxjs/toolkit';
import reducers from "./reducers";

export const store = configureStore( {
    reducer: reducers,
    middleware: ( getDefaultMiddleware ) =>
        getDefaultMiddleware( {
            serializableCheck: {
                ignoredPaths: [
                    "item.specialFilter.datesInterval",
                ],
                ignoredActions: [
                    // FIXME: FRE - I used this in order to let Date objects get inserted into the store.
                    // While Date objects aren't serializable, I'll have to find a way to make dates as strings
                    // when in the store and as date objects when dealing with React.
                    // for more information visit the following link :
                    // https://redux.js.org/faq/organizing-state#can-i-put-functions-promises-or-other-non-serializable-items-in-my-store-state
                    "exchange/changeSpecialFilterDatesInterval",
                ],
            },
        } ),
    devTools: true
} );

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
