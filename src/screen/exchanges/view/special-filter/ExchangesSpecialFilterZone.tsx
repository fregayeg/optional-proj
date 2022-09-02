import React from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Platform,
} from "react-native";
import {
    ArrowRightFromBracket,
    ArrowRightToBracket
} from "@app/components/icons";
import styles from "./styles";
import {
    useRootDispatch,
    useRootSelector
} from "@redux/hooks";
import * as ExchangeState from "../../state/exchangeSlice";
import { EPossibleDateTypes } from "../../model";
import theme from "@app/constants/theme";
import { Os } from "@app/constants/Os";
import { formatDate } from "@app/utils/date";
import { ExchangeSpecialFilterZoneProps } from "../../model/ui/ExchangeSpecialFilterZoneProps";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";

/**
 * FRE - Special Exchange filtering zone with extra options
 * https://tfs.igaeditions.com/tfs/DefaultCollection/EXTRANET%20MOBILE/_workitems/edit/58546
 *
 * @constructor
 */
function ExchangesSpecialFilterZone( componentProps: ExchangeSpecialFilterZoneProps ) {

    const {
        expandBottomSheet,
    } = componentProps;

    const {specialFilter} = useRootSelector( ExchangeState.selectExchange );
    const {
        buttonOn,
        datePickerIsOn,
        datesInterval,
        dateTypeInUse,
        direction
    } = specialFilter;


    const dispatch = useRootDispatch();

    // FRE - Exceptionally for iOS we use bottomsheet
    React.useEffect( () => {
        if (Platform.OS == Os.IOS) {
            if (datePickerIsOn && buttonOn)
                expandBottomSheet();
        }
    }, [
        datePickerIsOn,
        buttonOn,
        expandBottomSheet
    ] )

    const onDatePickerChange = React.useCallback( ( event: unknown, selectedDate?: Date ): void => {

        if (selectedDate && specialFilter.dateTypeInUse) {

            let newDate = {
                [specialFilter.dateTypeInUse]: selectedDate
            };

            dispatch(
                ExchangeState.switchSpecialFilterDatePicker( 0 )
            );

            dispatch(
                ExchangeState.changeSpecialFilterDatesInterval( {
                    ...specialFilter.datesInterval,
                    ...newDate
                } )
            );
        }
    }, [dateTypeInUse] );

    const showAndroidDatePicker = ( currentMode: string = "date" ) => {
        if (
            Platform.OS == Os.ANDROID
            && datePickerIsOn
            && datesInterval
            && dateTypeInUse
        ) {
            
            const dateToSet = datesInterval[dateTypeInUse];
            
            DateTimePickerAndroid.open( {
                value: dateToSet,
                onChange: ( e, d ) => onDatePickerChange( e, d ),
                mode: "date",
            });
        }
    };
    

    return (
        <View style={styles.container}>
            <View style={styles.headerSection}>
                <View style={styles.headerSectionTitleColumn}>
                    <Text style={styles.headerSectionTitleColumnText}>Filtres</Text>
                </View>
                <View style={styles.headerSectionInitializeColumn}>
                    <TouchableOpacity onPress={() => dispatch( ExchangeState.initSpecialFilterZone() )}>
                        <Text style={styles.headerSectionInitializeColumnText}>Réinitialiser</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.firstFilterSection}>
                <View style={styles.firstFilterSectionText}>
                    <Text style={styles.firstFilterSectionName}>Sens:</Text>
                </View>
                <View style={styles.firstFilterSectionOptions}>
                    <View style={styles.firstFilterSectionOptionColOne}>
                        <TouchableOpacity
                            style={styles.firstFilterOptionOne}
                            onPress={() => {
                                dispatch( ExchangeState.setSpecialFilterDateDirection( direction === "SN" ? "" : "SN" ) );
                            }}>
                            <Text style={styles.firstFilterOptionOneText}>Envoyé</Text>
                            <ArrowRightFromBracket color={theme.colors.grayDarker}/>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.firstFilterSecOptionColTwo}>
                        <TouchableOpacity
                            style={styles.firstFilterOptionTwo}
                            onPress={() => {
                                dispatch( ExchangeState.setSpecialFilterDateDirection( direction === "RC" ? "" : "RC" ) )
                            }}>
                            <Text style={styles.firstFilterOptionTwoText}>Reçu</Text>
                            <ArrowRightToBracket color={theme.colors.grayDarker}/>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.secondFilterSection}>
                <View style={styles.secondFilterOptionOne}>
                    <View style={styles.secondFilterTextOneContainer}>
                        <Text style={styles.secondFilterOptionOneText}>Depuis le :</Text>
                    </View>
                    <View style={styles.secondFilterOptionOneComp}>
                        <TouchableOpacity style={styles.secondFilterOptionOneButton} onPress={() => {
                            dispatch( ExchangeState.changeSpecialFilterDateType( EPossibleDateTypes.DATE_FROM ) );
                            dispatch( ExchangeState.switchSpecialFilterDatePicker( 1 ) )
                            if(Platform.OS == Os.ANDROID) showAndroidDatePicker("date");
                        }}>
                            <Text style={styles.secondFilterDateFrom}>
                                {formatDate( datesInterval.dateFrom )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.secondFilterOptionTwo}>
                    <View style={styles.secondFilterSecTextTwoContainer}>
                        <Text style={styles.secondFilterOptionTwoText}>Jusqu&#39;au :</Text>
                    </View>
                    <View style={styles.secondFilterOptionTwoComp}>
                        <TouchableOpacity style={styles.secondFilterOptionTwoButton} onPress={() => {
                            dispatch( ExchangeState.changeSpecialFilterDateType( EPossibleDateTypes.DATE_TO ) );
                            dispatch( ExchangeState.switchSpecialFilterDatePicker( 1 ) );
                            if(Platform.OS == Os.ANDROID) showAndroidDatePicker("date");
                        }}>
                            <Text style={styles.secondFilterDateTo}>
                                {formatDate( datesInterval.dateTo )}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

export default ExchangesSpecialFilterZone;
