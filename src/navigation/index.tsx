/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SecuredBottomTabNavigator } from "@app/navigation/BottomTabNav";

/**
 * FRE - App's navigation entry point
 * 
 * @constructor
 */
export default function Navigation() {
  return (
    <NavigationContainer>
      <SecuredBottomTabNavigator />
    </NavigationContainer>
  );
}


