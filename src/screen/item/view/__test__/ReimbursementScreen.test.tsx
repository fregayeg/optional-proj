import * as React from "react";
import {
  renderWithNavigation,
  renderWithProviders
} from "@app/utils/testUtils";
import ReimbursementsScreen from "@app/screens/ReimbursementsScreen/view";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import NotReimbursementsScreen from "@app/utils/test/FakeScreen";
import { RootTabParamList } from "@Root/types";

const BottomTab = createBottomTabNavigator<RootTabParamList>();

// FRE - TODO - tests on reimbursements screen
describe('Reimbursements list screen tests', () => {
 
  // scenario one : initialize screen
  it('Reimbursements list initialization', async() => {

    // FRE - TODO: Write a separate navigation types for tests
    // to avoid TS errors here
    const FakeBottomTabNavigator = () => (
        <>
          {/* 
          <BottomTab.Navigator initialRouteName={"!Reimbursements"}>
            <BottomTab.Screen name={"!Reimbursements"} component={NotReimbursementsScreen}/>
            <BottomTab.Screen name={"Reimbursements"} component={ReimbursementsScreen}/>
          </BottomTab.Navigator>
          */}
        </>);
    
    const renderedNavigator = renderWithNavigation(<FakeBottomTabNavigator />);
    
    renderWithProviders(renderedNavigator);
    
    // await waitFor(() => {
    //
    // });
  })
})
