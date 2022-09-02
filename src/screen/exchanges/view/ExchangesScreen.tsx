
import React from "react";
import {
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
  View,
  Platform
} from "react-native";
import * as ExchangeState from "../state/exchangeSlice";
import { useRootDispatch, useRootSelector } from "@redux/hooks";
import SlidersIcon from "@app/components/icons/sliders/SlidersIcon";
import { Os } from "@app/constants/Os";
import BottomSheet from "@gorhom/bottom-sheet";
import ExchangesSpecialFilterZone from "./special-filter/ExchangesSpecialFilterZone";
import ExchangeSpecialBottomSheet from "./special-filter/SpecialFilterBottomSheet";
import ExchangeSpecialFilterDatePickerIosSpinner from "./special-filter/date-picker-ios/ExchangeSpecialFilterDatePickerIosSpinner";
import theme from "@app/constants/theme";
import styles from "./styles";

export function ExchangesScreen() {

  // using redux reducer (Same as react useReducer() approach)
  const {
      specialFilter // special button state
  } =  useRootSelector(ExchangeState.selectExchange);

  const { datesInterval, dateTypeInUse } = specialFilter;
  const dispatch = useRootDispatch();
  
  // FRE - special filter datepicker change handler for ios and android both

  // ref
  const bottomSheetRef = React.useRef<BottomSheet>(null);

  // bottom-sheet (bs) behaviors
  const expandBs = React.useCallback(() => {
    bottomSheetRef?.current?.expand();
  },[]);

  const closeBs = React.useCallback(()=> {
    bottomSheetRef?.current?.close();
  },[]);
  
  // render screen
  return (
    <>
    <KeyboardAvoidingView
      enabled={false}
      behavior={"height"}
      style={styles.exchangeContainer}
    >
      <View style={{ flexDirection: "row" }}>
        <TextInput
          style={{
            flex: 0.95,
            ...styles.recherche
          }}
          placeholder={"Recherche..."}
        />
        <TouchableOpacity
          style={{
            backgroundColor: specialFilter.buttonOn
              ?
              theme.colors.primaryLight
              :
              theme.colors.light,
            ...styles.specialFilterButton
          }}
          onPress={() => dispatch(ExchangeState.switchSpecialFilter(specialFilter.buttonOn ? 0 : 1))}
        >
          <SlidersIcon width={20} height={20} color={theme.colors.primary}/>
        </TouchableOpacity>
      </View>
      {
          specialFilter.buttonOn &&
          <ExchangesSpecialFilterZone
              expandBottomSheet={expandBs}
              closeBottomSheet={closeBs}
          />
      }
      
    </KeyboardAvoidingView>
    {
      Platform.OS == Os.IOS
      && specialFilter.buttonOn
      &&
      <ExchangeSpecialBottomSheet
        containerRef={bottomSheetRef}
        onCloseHandler={() => dispatch(ExchangeState.switchSpecialFilterDatePicker(0))}
        customSnapPoints={[350]}
      >
        <ExchangeSpecialFilterDatePickerIosSpinner
          dispatch={dispatch}
          specialFilter={specialFilter}
          closeDatepickerBottomsheet={closeBs}
        />
      </ExchangeSpecialBottomSheet>
    }
    </>
  );
}
