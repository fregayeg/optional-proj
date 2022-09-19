import * as React from "react";
import apiInstance from "../../api/apiItems";
import {
  screen,
  render,
  fireEvent,
  waitForElementToBeRemoved,
  act,
  waitFor,
} from "@testing-library/react-native";
import { NavigationContainer } from "@react-navigation/native";
import itemSliceReducer from "@app/screen/item/state/itemSlice";
import { SecuredBottomTabNavigator } from "@app/navigation/BottomTabNav";
import { createApiStore } from "@app/utils/testUtils";

// FRE - mock reanimated as suggested by react-navigation docs
// fore more information visit: https://reactnavigation.org/docs/testing/
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

const reduxRef = createApiStore(apiInstance, {item: itemSliceReducer})

describe('list screen tests', () => {

  // scenario one : initialize screen
  it('list initialization', async () => {

    // wrap into bottom tab navigator and navigation container
    const ComponentToRender = (
        <NavigationContainer>
          <SecuredBottomTabNavigator/>
        </NavigationContainer>
    );
    
    // wrap inside react-redux provider
    const view = render(ComponentToRender, {wrapper: reduxRef.wrapper});
    
    // get 1st screen (NOT items screen)
    const screenDashboardText = await screen.getByText(/Dashborad/, {exact: false});
    expect(screenDashboardText).not.toBeFalsy();

    // go to items screen!
    const toClick = await screen.getByText('Items');
    fireEvent(toClick, 'press'); // I got act() error here
    
    // locate "loading..." text and wait for it to disappear

    await act(async () => {
     await screen.getByText( 'Loading ...' );
    })

    const loadingText = await screen.queryByText( 'Loading ...' );
    expect(loadingText).toBeFalsy();
    
    const specialFilterLabelText = screen.queryByText( 'Hello',{exact:false} );
    expect(specialFilterLabelText).toBeTruthy();

    // await act( async () => {
    //   const buttonSpecialFilterZone = await screen.queryByText( "Hello-Test" );
    //   expect( buttonSpecialFilterZone ).toBeTruthy();
    // });
    
    // expect special-filter button (inside ItemHeader sub-component)
    // to be ready for use
    // const buttonSpecialFilterZone = await screen.queryByTestId("special-button");
    // expect(buttonSpecialFilterZone).toBeTruthy();
    
    // expect filters zone to be hidden
    // const specialFilterZone = screen.queryByText("Filters");
    // expect(specialFilterZone).toBeFalsy();
    
  });
});
