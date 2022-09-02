import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { store } from '@redux/store';
import { Provider as ReactReduxProvider } from 'react-redux';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ExchangesScreen } from "@app/screen/exchanges/view/ExchangesScreen";
import { LogBox } from "react-native";

LogBox.ignoreAllLogs();

/**
 * App view with view providers
 * 
 * @constructor
 */
function App() {
  
    return (
      <GestureHandlerRootView style={{flex: 1}}>
        <SafeAreaProvider>
          <ExchangesScreen/>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  
}

/**
 * logic providers
 * 
 * @param AppComponent
 * @constructor
 */
function WithAppProviders( AppComponent: React.FC ) {
    return ( props: object ): React.ReactElement => (
        <React.StrictMode>
            <ReactReduxProvider store={store}>
                <AppComponent {...props} />
            </ReactReduxProvider>
        </React.StrictMode>
    )
}

export default WithAppProviders(App);
