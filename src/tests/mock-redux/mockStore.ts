/**
 * FRE - a fake store for tests, at the moment, it doesn't 
 * use redux-persist as it doesn't need it
 */
import {configureStore} from '@reduxjs/toolkit';
import reducers from "@redux/reducers";

export const mockStore = configureStore({
    reducer: reducers,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
        }),
    devTools: true
});

export type RootState = ReturnType<typeof mockStore.getState>;
