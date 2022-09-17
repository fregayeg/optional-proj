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
import * as ReimbursementState from "../state/itemSlice";
import { useTranslation } from "react-i18next";
import theme from "@app/constants/theme";
import { styles } from "./styles";

function ReimbursementsHeader() {

  /** using translation **/
  const { t } = useTranslation('translation');

  /** Using Redux **/
  const {
    specialFilter,
  } = useRootSelector(ReimbursementState.selectReimbursement);

  const { buttonOn } = specialFilter;

  const dispatch = useRootDispatch();

  return (
    <>
      <TextInput style={{flex: 0.95, ...styles.recherche}} placeholder={t('Commun.search')}/>
      <TouchableOpacity
        style={{
          backgroundColor: buttonOn ? theme.colors.primaryLight : theme.colors.light,
          ...styles.specialFilterButton
        }}

        onPress={() => {
          dispatch(ReimbursementState.switchSpecialFilter(specialFilter.buttonOn ? 0 : 1));
        }}
      >
        <SlidersIcon width={20} height={20} color={theme.colors.primary}/>
      </TouchableOpacity>
    </>
  )
}

export default ReimbursementsHeader;
