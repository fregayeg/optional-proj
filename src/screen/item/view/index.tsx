/**
 * Reimbursements List screen created by f.regayeg and m.a.znidi on 24.06.2022
 */
import * as React from "react";
import {
  View,
  Text,
  ScrollView,
  Pressable,
  TouchableOpacity,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useRootDispatch,
  useRootSelector
} from "@redux/hooks";
import { CardViewWithoutIcon } from "@app/components/CardViewWithoutIcon";
import { Badge } from "@app/components/Badge";
import {
  getAmountFormatted,
  getFilters,
  getStatusLabelByCode,
  getVarKeyByCode,
  manageSpecialFilterParams,
} from "../state/businessUtils";
import {
  IReimbursement,
  useGetReimbursementsQuery,
} from "../api/apiItems";
import { StatusCode } from "../api/itemsConstants";
import * as ReimbursementState from "../state/itemSlice";
import ReimbursementsSpecialFilter from "./special-filter/ReimbursementsSpecialFilter";
import {
  ErrorMsg,
  LoadingMsg
} from "./Indicators";
import ReimbursementsHeader from "./ReimbursementsHeader";
import SpecialFilterBottomSheet from "./SpecialFilterBottomSheet";
import { SpecialFilterDatePickerSpinner } from "./special-filter";
import { RootStackParamList } from "@Root/types";
import { useTranslation } from "react-i18next";
import { styles } from "./styles";
import { Os } from "@app/constants/Os";

// FRE: FIXME: why this screen has same route name as DetailRemboursementScreen component under /DetailRemboursementScreen ?
export default function ReimbursementsScreen({ navigation }: NativeStackScreenProps<RootStackParamList, 'ReimbursementsDetails'>) {

  /** using translation **/
  const { t } = useTranslation('translation');

  /** Using Redux **/
  const {
    list,
    filter,
    count,
    loadMoreLoading,
    totalResults,
    specialFilter,
    apiCallOnHold
  } = useRootSelector(ReimbursementState.selectReimbursement);

  const {
    datePickerOn,
    buttonOn
  } = specialFilter;

  const dispatch = useRootDispatch();
  
  /** React Component state **/
  const [listIsLoading, setListLoading] = React.useState<boolean>(false);

  /** using RTK Query **/
    // RTK query default parameters
  const defaultQueryParams = {
      status: filter,
      currentCount: count
    };
  
  // all query params 
  const queryParams = React.useMemo(() => {
    return manageSpecialFilterParams(defaultQueryParams, specialFilter)
  }, [
    specialFilter,
    filter,
    count
  ])
  
  // query hook
  const {
    isLoading,
    isError,
    isFetching,
  } = useGetReimbursementsQuery(queryParams, {
    skip: apiCallOnHold,
    refetchOnMountOrArgChange: !apiCallOnHold
  });

  /** using bottom-sheet (bs) **/
  const datePickerBottomSheetRef = React.useRef<BottomSheet>(null);

  const expandBs = React.useCallback(() => {
    datePickerBottomSheetRef?.current?.expand();
  },[]);

  const closeBs = React.useCallback(()=> {
    datePickerBottomSheetRef?.current?.close();
  },[]);

  /** Datepicker iOS effect **/
  // FRE - Exceptionally for iOS we use bottom-sheet
  React.useEffect(() => {
    if (Platform.OS == Os.IOS) {
      if (datePickerOn && buttonOn)
        expandBs();
    }
  }, [
    datePickerOn,
    buttonOn
  ])
  
  /** React Navigation effect **/
  useFocusEffect(
    React.useCallback(() => {
      return () => {
        dispatch(ReimbursementState.selectFilter(getFilters()[0].code)); // init button filter state
        dispatch(ReimbursementState.switchSpecialFilter(0)); // init special filter state
        dispatch(ReimbursementState.initSpecialFilterZone());
      }
    }, [])
  );
  
  /** Reimbursements List local loading effect **/
  React.useEffect(() => {

    // as default take rtkq flag
    let isListLoading = isFetching;
    
    // if the user intent is loadMore then do not show loader on list
    if(loadMoreLoading) isListLoading = false;
    
    setListLoading(isListLoading);

  },[
    isFetching
  ])
  
  // FRE - 
  // FIXME: We can simply use "id" as navigation parameter, I think no need to pass other sensitive data.
  //  When in another component than this one, if we need to get data from the API call return used here, 
  //  just recall the useQuery() hook or use the redux Item's selector. 
  const goToReimbursement = (item: IReimbursement) => {

    const {id, amount, amountPaid, beneficiaryFullName , status} = item;
    navigation.navigate("ReimbursementsDetails",
      {
        reimbursementsId: id,
        amount,
        amountPaid,
        titular: beneficiaryFullName,
        status
      }
    );
  }

  /********** Rendering *********/

  if (isError) return <ErrorMsg />

  if (isLoading ||  listIsLoading) return <LoadingMsg />;
  
  return (
    <>
      <KeyboardAvoidingView
        enabled={false}
        behavior={"height"}
        style={styles.container}>
        <View style={{flexDirection: "row"}}>
          <ReimbursementsHeader />
        </View>
        <ScrollView
          horizontal
          style={
            specialFilter.buttonOn ? {
              height: Dimensions.get("window").height / 8,
              ...styles.filter
            } : styles.filter
          }
        >
          {getFilters().map((mapFilter, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => {
                dispatch(ReimbursementState.selectFilter(mapFilter.code));
              }}
            >
              <Badge 
                text={t(`${getVarKeyByCode(mapFilter.code)}`)} 
                active={mapFilter.code === filter}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {
          specialFilter.buttonOn &&
            <ReimbursementsSpecialFilter />
        }
        {
          listIsLoading && <LoadingMsg/>
        }
        {
          !listIsLoading
          &&
          <FlatList
            style={styles.stackCards}
            data={list}
            renderItem={({item, index, separators}) => {

              const listSize: number = list.length;
              const isLatestIteration: boolean = listSize - 1 === index;
              const hasItemsLeft: boolean = listSize >=  5 && totalResults > listSize;

            return (
              <>
                <CardViewWithoutIcon
                  key={item.id}
                  Ndossier={"N°".concat(String(item.id))}
                  total={getAmountFormatted(item)}
                  name={item.beneficiaryFullName}
                  date={item.uniqueDate}
                  traducedState={Object.values(StatusCode).includes(item.status as StatusCode) ? t(`${getVarKeyByCode(item.status)}`) : t('Commun.unknown')}
                  state={getStatusLabelByCode(item.status)}
                  onPress={() => goToReimbursement(item)}
                />
                {
                  (isLatestIteration && hasItemsLeft) &&
                    <Pressable
                        onPress={() => {
                          dispatch(ReimbursementState.loadMore(list.length));
                        }}
                        style={({pressed}) => ({
                          opacity: pressed ? 0.5 : 1,

                          ...styles.showMore,
                        })}
                    >
                        <Text style={styles.showMoreText}>{t('Commun.showmore')}</Text>
                    </Pressable>

                  }
                </>
              )
            }
            }
            keyExtractor={(item) => item.id.toString()}
          />
        }
      </KeyboardAvoidingView>
      {
        Platform.OS == Os.IOS
        && specialFilter.buttonOn
        &&
          <SpecialFilterBottomSheet
              containerRef={datePickerBottomSheetRef}
              onCloseHandler={() => {
                dispatch(ReimbursementState.switchSpecialFilterDatePicker(0))
              }}
              customSnapPoints={[350]}
          >
              <SpecialFilterDatePickerSpinner
                  dispatch={dispatch}
                  specialFilter={specialFilter}
                  closeDatepickerBottomsheet={closeBs}
              />
          </SpecialFilterBottomSheet>
      }
    </>
  );
}
