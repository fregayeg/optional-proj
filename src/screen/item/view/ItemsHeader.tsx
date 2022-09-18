import * as React from "react";
import {
  TextInput,
  TouchableOpacity
} from "react-native";
import {
  useRootSelector,
  useRootDispatch
} from "@redux/hooks";
import SlidersIcon from "@app/components/icons/sliders/SlidersIcons";
import * as ItemState from "../state/itemSlice";
import theme from "@app/constants/theme";
import { styles } from "./styles";

function ItemsHeader() {
    
  /** Using Redux **/
  const {
    specialFilter,
  } = useRootSelector(ItemState.selectItem);

  const { buttonOn } = specialFilter;

  const dispatch = useRootDispatch();

  return (
    <>
      <TouchableOpacity
        style={{
          backgroundColor: buttonOn ? theme.colors.primaryLight : theme.colors.light,
          ...styles.specialFilterButton
        }}

        onPress={() => {
          dispatch(ItemState.switchSpecialFilter(specialFilter.buttonOn ? 0 : 1));
        }}
      >
        <SlidersIcon width={20} height={20} color={theme.colors.primary}/>
      </TouchableOpacity>
    </>
  )
}

export default ItemsHeader;
