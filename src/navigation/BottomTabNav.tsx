import * as React from "react";
import { Dimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
    RootTabParamList,
    RootTabScreenProps
} from "@Root/types";
import {
    GridFillIcon,
    HeartFillIcon
} from "@app/components/icons";
import DashboardScreen from "@app/screen/dashboard/DashboardScreen";
import ItemsScreen from "@app/screen/item/view";
import theme from "@app/constants/theme";

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();

export function SecuredBottomTabNavigator() {
    
    return (
        <BottomTab.Navigator
            initialRouteName="Dashboard"
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarLabelPosition: "below-icon",
                tabBarStyle: {
                    paddingBottom: 8,
                    paddingTop: 5,
                    height: Dimensions.get( "screen" ).width < 600 ? 50 : 70,
                },
                tabBarItemStyle: {
                    margin: Dimensions.get( "screen" ).width < 600 ? 1 : 6,
                },
            }}
        >
            <BottomTab.Screen
                name="Dashboard"
                component={DashboardScreen}
                options={( {navigation}: RootTabScreenProps<"Dashboard"> ) => ({
                    headerShown: false,
                    tabBarIcon: ( {color} ) => (
                        <GridFillIcon
                            color={color}
                            style={{transform: [{scale: 1.2}]}}
                        />
                    ),
                })}
            />
            <BottomTab.Screen
                name="Items"
                // FRE - FIXME: please fix the next TS error.
                component={ItemsScreen}
                options={{
                    title: "Items",
                    tabBarIcon: ( {color} ) => (
                        <HeartFillIcon
                            color={color}
                            style={{transform: [{scale: 1.2}]}}
                        />
                    ),
                    headerStyle: {
                        backgroundColor: theme.colors.grayLighter,
                    },
                    headerShown: false
                }}
            />
        </BottomTab.Navigator>
    );
}
