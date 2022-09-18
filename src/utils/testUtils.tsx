/**
 * FRE - this is a redux test wrapper combined with React Native Testing library tools.
 * 
 * This example is recommended from redux official docs: 
 * https://redux.js.org/usage/writing-tests#components
 */
import React, {
  Reducer
} from 'react'
import {
  Middleware,
  configureStore,
  EnhancedStore,
  AnyAction,
  Store
} from '@reduxjs/toolkit'
// import { setupListeners } from "@reduxjs/toolkit/query";
import { Provider } from "react-redux";
import { cleanup } from "@testing-library/react-native";

function renderWithProvider(store: Store<any>) {
  return function Wrapper({ children }: any) {
    return <Provider store={store}>{children}</Provider>
  }
}

/**
 * FRE - Store test utils function, recommended by Redux team
 * 
 * @param api
 * @param extraReducers
 * @param options
 */
export function createApiStore<
    A extends {
      reducerPath: string
      reducer: Reducer<any, any>
      middleware: Middleware
      util: { resetApiState(): any }
    },
    R extends Record<string, Reducer<any, any>> = Record<never, never>
    >(
    api: A,
    extraReducers?: R,
    options: { withoutListeners?: boolean; withoutTestLifecycles?: boolean } = {}
) {
  const getStore = () =>
      configureStore({
        reducer: { api: api.reducer, ...extraReducers },
        middleware: (gdm) =>
            gdm({ serializableCheck: false, immutableCheck: false }).concat(
                api.middleware
            ),
      })

  type StoreType = EnhancedStore<
      {
        api: ReturnType<A['reducer']>
      } & {
    [K in keyof R]: ReturnType<R[K]>
  },
      AnyAction,
      ReturnType<typeof getStore> extends EnhancedStore<any, any, infer M>
          ? M
          : never
      >

  const initialStore = getStore() as StoreType
  const refObj = {
    api,
    store: initialStore,
    wrapper: renderWithProvider(initialStore),
  }
  // let cleanupListeners: () => void

  if (!options.withoutTestLifecycles) {
    beforeEach(() => {
      const store = getStore() as StoreType
      refObj.store = store
      refObj.wrapper = renderWithProvider(store)
      // if (!options.withoutListeners) {
      //   cleanupListeners = setupListeners(store.dispatch)
      // }
    })
    afterEach(() => {
      cleanup()
      // if (!options.withoutListeners) {
      //   cleanupListeners()
      // }
      refObj.store.dispatch(api.util.resetApiState())
    })
  }

  return refObj
}


export {
  renderWithProvider
}

