/**
 * items List screen
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
import BottomSheet from "@gorhom/bottom-sheet";
import {
  useRootDispatch,
  useRootSelector
} from "@redux/hooks";
import { CardViewWithoutIcon, Badge } from "@app/components";
import {
  getAmountFormatted,
  getFilters,
  getStatusLabelByCode,
  getVarKeyByCode,
  manageSpecialFilterParams,
} from "../state/businessUtils";
import { StatusCode } from "../api/itemsConstants";
import * as ItemState from "../state/itemSlice";
import {
  ErrorMsg,
  LoadingMsg
} from "./Indicators";
import ItemsHeader from "./ItemsHeader";
import ItemsSpecialFilter from "./special-filter/ItemsSpecialFilter";
import SpecialFilterBottomSheet from "./SpecialFilterBottomSheet";
import { SpecialFilterDatePickerSpinner } from "./special-filter";
import { RootTabScreenProps } from "@Root/types";
import { styles } from "./styles";
import { Os } from "@app/constants/Os";
import { useGetItemsQuery } from "../api/apiItems";

export default function ItemsScreen( { navigation }: RootTabScreenProps<"Items">) {

  /** Using Redux **/
  const {
    list,
    filter,
    count,
    loadMoreLoading,
    totalResults,
    specialFilter,
    apiCallOnHold
  } = useRootSelector(ItemState.selectItem);

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
    error,
    isLoading,
    isError,
    isFetching,
  } = useGetItemsQuery(queryParams, {
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
        dispatch(ItemState.selectFilter(getFilters()[0].code)); // init button filter state
        dispatch(ItemState.switchSpecialFilter(0)); // init special filter state
        dispatch(ItemState.initSpecialFilterZone());
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
          <ItemsHeader />
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
                dispatch(ItemState.selectFilter(mapFilter.code));
              }}
            >
              <Badge 
                text={getVarKeyByCode(mapFilter.code)} 
                active={mapFilter.code === filter}
              />
            </TouchableOpacity>
          ))}
        </ScrollView>
        {
          specialFilter.buttonOn &&
            <ItemsSpecialFilter testID={"specialFilter"}/>
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
                  traducedState={Object.values(StatusCode).includes(item.status as StatusCode) ? getVarKeyByCode(item.status) : "Unknown"}
                  state={getStatusLabelByCode(item.status)}
                  onPress={() => {return;}}
                />
                {
                  (isLatestIteration && hasItemsLeft) &&
                    <Pressable
                        onPress={() => {
                          dispatch(ItemState.loadMore(list.length));
                        }}
                        style={({pressed}) => ({
                          opacity: pressed ? 0.5 : 1,

                          ...styles.showMore,
                        })}
                    >
                        <Text style={styles.showMoreText}>{"Show more"}</Text>
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
                dispatch(ItemState.switchSpecialFilterDatePicker(0))
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
