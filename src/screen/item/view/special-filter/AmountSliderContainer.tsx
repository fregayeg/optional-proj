import React from "react";
import {
  Text,
  View,
  Dimensions
} from "react-native";
import MultiSlider from "@ptomasroos/react-native-multi-slider";
import {
  useRootDispatch,
  useRootSelector
} from "@redux/hooks";
import * as ReimbursementState from "../../state/itemSlice";
import { specialFilerInitialState } from "../../state/itemSlice";
import { formatAmountSliderCaption } from "../../state/businessUtils";
import styles from "./styles";

const AmountSliderContainer = () => {
  
  /** using Redux **/
  const { specialFilter } = useRootSelector(ReimbursementState.selectReimbursement);
  
  const { sumInterval } = specialFilter;
  
  const dispatch = useRootDispatch();
  
  /** using react state management **/
    // FRE - values array contains sumInterval data as follows: 
    // [ minimum_amount , maximum_amount]. e.g: [ 10 , 156]
  const [valuesArray, setNewValues] = React.useState<number[]>(Object.values(sumInterval));

  // FRE - this is a precaution effect
  React.useEffect(() => {

    // get actual value from store
    const reduxActualValue = Object.values(sumInterval);

    // test if the actual value is different from the one in the component? 
    if (reduxActualValue !== valuesArray)
      // set the value in the component following the store
      setNewValues(reduxActualValue);
    
  }, [sumInterval])
  
  // styles as props to Multislider
  const sliderOtherStyles = {
    trackStyle: styles.trackStyle,
    markerStyle: styles.markerStyle,
    selectedStyle: {
      backgroundColor: '#0079B1'
    },
    unselectedStyle: {
      backgroundColor: '#d3d3d3'
    }
  }
  
  return (
    <View >
      <View >
        <Text>{t('Item.filter.slider_caption')}</Text>
        <Text>{React.useMemo(() => formatAmountSliderCaption(valuesArray),[sumInterval,valuesArray])}</Text>
      </View>
      <MultiSlider
        
        containerStyle={{
          alignSelf: "center"
        }}
        values={Object.values(specialFilter.sumInterval)}
        onValuesChange={(newValues) => {
          dispatch(ReimbursementState.holdApiCall());
          setNewValues(newValues);
        }}
        onValuesChangeFinish={(valuesArray) => {
          dispatch(
            ReimbursementState.setSliderInterval({
              sumFrom: valuesArray[0],
              sumTo: valuesArray[1]
            })
          )
        }}
        sliderLength={Dimensions.get("window").width * 80 / 100}
        allowOverlap={true}
        max={specialFilerInitialState.sumInterval.sumTo}
        min={specialFilerInitialState.sumInterval.sumFrom}
        {...sliderOtherStyles}
      />
    </View>
  );
};

export default AmountSliderContainer;
