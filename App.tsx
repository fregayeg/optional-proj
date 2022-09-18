import React from 'react';
import { LogBox } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider as ReactReduxProvider } from 'react-redux';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useCachedResources from "@app/hooks/useCachedResources";
import AppNavigation from "@app/navigation";
import { store } from '@redux/store';
import "react-native-url-polyfill/auto";
import server from "@app/tests/mock-server";

server.listen({onUnhandledRequest:"bypass"});

LogBox.ignoreAllLogs();

/**
 * App view with view providers
 *
 * @constructor
 */
function App() {

    const isLoadingComplete = useCachedResources();

    if (!isLoadingComplete) {
        return null;
    } else {
        return (
            <GestureHandlerRootView style={{flex: 1}}>
                <SafeAreaProvider>
                    <AppNavigation/>
                </SafeAreaProvider>
            </GestureHandlerRootView>
        );
    }

}

/**
 * logic providers
 *
 * @param AppComponent
 * @constructor
 */
function WithAppProviders( AppComponent: React.FC ) {
    return ( props: object ): React.ReactElement => (
        // <React.StrictMode>
            <ReactReduxProvider store={store}>
                <AppComponent {...props} />
            </ReactReduxProvider>
        // </React.StrictMode>
    )
}

export default WithAppProviders( App );
