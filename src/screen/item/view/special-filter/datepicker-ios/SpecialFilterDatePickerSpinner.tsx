import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import {
    useRootSelector,
    useRootDispatch
} from "@redux/hooks";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ReimbursementState from "../../../state/itemSlice";
import { ISpecialFilterSpinner, SpecialFilterDates } from "../../../model";
import styles from "./styles";

/**
 * FRE - Item datepicker view for ios only
 * 
 * @param props
 * @constructor
 */
function ReimbursementSpecialFilterDatePickerView(props: ISpecialFilterSpinner) {
    
    const { closeDatepickerBottomsheet } = props;
    
    const { specialFilter } = useRootSelector(ReimbursementState.selectReimbursement);

    const {
        buttonOn,
        datesInterval,
        dateTypeInUse,
    } = specialFilter;
    
    const dispatch = useRootDispatch();
    
    const dateRef = React.useRef<Date | null>(null);
    
    React.useEffect(() => {
        if(dateTypeInUse)
            dateRef.current = datesInterval[dateTypeInUse]; 

    },[dateTypeInUse])
    
    const handleChangeOnHold = React.useCallback(( e: DateTimePickerEvent | null, selectedDate: Date | undefined) => {
        
        dispatch(
          ReimbursementState.holdApiCall()
        );
        
        if (selectedDate) dateRef.current = selectedDate
    },[])

    const setDateInUse = React.useCallback((): void => {

        if (dateRef?.current && dateTypeInUse) {

            let newDateContainer: SpecialFilterDates = {
                [dateTypeInUse]: dateRef.current
            };

            const oldDate = datesInterval[dateTypeInUse];

            if (dateRef.current !== oldDate) {

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
    },[dateTypeInUse]);
    
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <View style={styles.headerColOne}>
                        <TouchableOpacity onPress={() => {
                            closeDatepickerBottomsheet();
                        }}>
                        <Text style={styles.headerOptionOneText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.headerColTwo}>
                        <TouchableOpacity onPress={() => {
                            setDateInUse();
                            closeDatepickerBottomsheet();
                        }}>
                            <Text style={styles.headerOptionOneText}>Set</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.divider}/>
                <View style={styles.datePickerSection}>
                    {
                        buttonOn
                        && datesInterval
                        && dateTypeInUse
                        &&
                        <DateTimePicker
                            style={{height: "100%", width: "100%"}}
                            testID="datePickerIos"
                            value={datesInterval[dateTypeInUse] as Date}
                            mode={"date"}
                            display="spinner"
                            onChange={(e, d) => handleChangeOnHold(e, d)}
                            
                        />
                    }
                </View>
            </View>
        );
    
}

export default ReimbursementSpecialFilterDatePickerView;
