import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Platform
} from "react-native";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import {
  useRootDispatch,
  useRootSelector
} from "@redux/hooks";
import * as ReimbursementState from '../../state/itemSlice';
import {
  EPossibleDateTypes,
  SpecialFilterDates
} from "../../model/ISpecialFilterDate";
import AmountSliderContainer from "./AmountSliderContainer";
import { EMPTY_DATE_MASK } from "../../api/itemsConstants";
import { formatDate } from "@app/utils/date";
import { useTranslation } from "react-i18next";
import { Os } from "@app/constants/Os";
import styles from "./styles";

/**
 * Special (advanced) filter zone for reimbursements screen
 * 
 * @constructor
 */
function ReimbursementsSpecialFilter() {

  const { t } = useTranslation('translation');
  
  /** Using Redux **/
  const { specialFilter } = useRootSelector(ReimbursementState.selectReimbursement);
  const {
    datePickerOn,
    datesInterval, 
    dateTypeInUse, 
  } = specialFilter;
  
  const dispatch = useRootDispatch();

  /** Datepicker Android imperative API effect **/
  React.useEffect(() => {
    
    // FRE - 
    // FIXME: currently android and ios share same change handler
    //  but its declared twice separately.
    //  TODO : make it unique and share it between both os impl.
    const onDatePickerChange = (event: unknown, selectedDate?: Date ): void => {

      if (selectedDate && dateTypeInUse) {

        let newDateContainer: SpecialFilterDates = {
          [dateTypeInUse]: selectedDate
        };

        const oldDate = datesInterval[dateTypeInUse];

        if (selectedDate !== oldDate) {
 
          dispatch(
            ReimbursementState.changeSpecialFilterDatesInterval({
              ...specialFilter.datesInterval,
              ...newDateContainer
            })
          );

          dispatch(
            ReimbursementState.switchSpecialFilterDatePicker(0)
          );

          dispatch(
            ReimbursementState.liberateApiCall()
          );
        }
      }
    }
    
    if (Platform.OS == Os.ANDROID) {
      if (
        datePickerOn
        && dateTypeInUse
        && datesInterval[dateTypeInUse] instanceof Date
      ) {

        dispatch(ReimbursementState.holdApiCall());
        
        DateTimePickerAndroid.open({
          value: datesInterval[dateTypeInUse] as Date,
          onChange: (e, d) => onDatePickerChange(e, d),
          mode: "date",
        });
      } else {
        DateTimePickerAndroid.dismiss("date");
        dispatch(ReimbursementState.liberateApiCall())
      }
    }

  },[
    datePickerOn
  ]);

  const NO_DATE_FROM = !dateTypeInUse || !datesInterval?.dateFrom;
  const NO_DATE_TO = !dateTypeInUse || !datesInterval?.dateTo;
  
  return (
    <View style={styles.container}>
      <View style={styles.headerSection}>
        <View style={styles.headerSectionTitleColumn}>
          <Text style={styles.headerSectionTitleColumnText}>{t('Commun.filter.title')}</Text>
        </View>
        <View style={styles.headerSectionInitializeColumn}>
          <TouchableOpacity onPress={() => {
            dispatch(ReimbursementState.initSpecialFilterZone());
          }}>
            <Text style={styles.headerSectionInitializeColumnText}>{t('Commun.filter.reset')}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.firstFilterSection}>
        <AmountSliderContainer />
      </View>
      <View style={styles.secondFilterSection}>
        <View style={styles.secondFilterOptionOne}>
          <View style={styles.secondFilterSecTextOne}>
            <Text style={styles.secondFilterOptionOneText}>{t('Commun.filter.From')}</Text>
          </View>
          <View
            style={styles.secondFilterOptionOneComp}>
            <TouchableOpacity
              style={styles.secondFilterOptionOneButton}
              onPress={() => {
                dispatch(ReimbursementState.changeSpecialFilterDateType(EPossibleDateTypes.DATE_FROM));
              }}
            >
              <Text style={styles.secondFilterDateFrom}>
                {NO_DATE_FROM ? EMPTY_DATE_MASK : formatDate(datesInterval.dateFrom)}
              </Text>
            </TouchableOpacity>
          </View>
          
        </View>
        <View style={styles.secondFilterOptionTwo}>
          <View style={styles.secondFilterSecTextTwo}>
            <Text style={styles.secondFilterOptionTwoText}>{t('Commun.filter.To')}</Text>
          </View>
          <View style={styles.secondFilterOptionTwoComp}>
            <TouchableOpacity
              style={styles.secondFilterOptionTwoButton}
              onPress={() => {
                dispatch(ReimbursementState.changeSpecialFilterDateType(EPossibleDateTypes.DATE_TO));
              }}>
              <Text style={styles.secondFilterDateTo}>
                {NO_DATE_TO ? EMPTY_DATE_MASK : formatDate(datesInterval.dateTo)}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}
export default React.memo(ReimbursementsSpecialFilter);
