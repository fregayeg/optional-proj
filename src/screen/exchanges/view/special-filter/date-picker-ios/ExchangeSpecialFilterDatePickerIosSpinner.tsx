import React from "react";
import {
    View,
    Text,
    TouchableOpacity
} from "react-native";
import DateTimePicker, { DateTimePickerEvent } from "@react-native-community/datetimepicker";
import * as ExchangeState from "../../../state/exchangeSlice";
import {
    useRootSelector,
    useRootDispatch
} from "@redux/hooks";
import { ISpecialFilterSpinner } from "../../../model/ui/ISpecialFilterSpinner";
import styles from "./styles";

function ExchangeSpecialFilterDatePickerView(props: ISpecialFilterSpinner) {
    
    const { closeDatepickerBottomsheet } = props;
    
    const { specialFilter } = useRootSelector(ExchangeState.selectExchange);
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
    
    const handleChangeOnHold =(e: DateTimePickerEvent | null, newDate: Date | undefined) => {
        if (newDate) dateRef.current = newDate
    }

    const setDateInUse = React.useCallback((): void => {

        if (dateRef && specialFilter.dateTypeInUse) {

            let newDate = {
                [specialFilter.dateTypeInUse]: dateRef.current
            };

            dispatch(
                ExchangeState.switchSpecialFilterDatePicker(0)
            );

            dispatch(
                ExchangeState.changeSpecialFilterDatesInterval({
                    ...specialFilter.datesInterval,
                    ...newDate
                })
            );
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
                            value={datesInterval[dateTypeInUse]}
                            mode={"date"}
                            display="spinner"
                            onChange={(e, d) => handleChangeOnHold(e, d)}
                            
                        />
                    }
                </View>
            </View>
        );
    
}

export default ExchangeSpecialFilterDatePickerView;
