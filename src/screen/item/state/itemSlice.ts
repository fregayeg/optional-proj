import { apiInstance } from "../api/apiItems";
import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import { RootState } from "@redux/store";
import * as JSUtils from "@app/utils/date";
import { ISpecialFilter } from "../model/ISpecialFilter";
import { SpecialFilterDates } from "../model/ISpecialFilterDate";
import { EPossibleDateTypes } from "@app/screens/exchanges/model";
import {
  ISpecialFilterSum,
  IReimbursementState
} from "../model";
import { logout } from "@app/screens/login/state/AuthSlice";

export const specialFilterDatesIntervalInitState: SpecialFilterDates = {
  dateFrom: JSUtils.removeDays(new Date(), 15) ,
  dateTo: new Date(),
};

export const specialFilterSumIntervalInitState: ISpecialFilterSum = {
  sumFrom: 0,
  sumTo: 500
};

export const specialFilerInitialState: ISpecialFilter = {
  buttonOn: false,
  datePickerOn: false,
  dateTypeInUse: null,
  datesInterval: specialFilterDatesIntervalInitState,
  sumInterval: {
    sumFrom: 0,
    sumTo: 500
  },
  // sumIntervalOnHold: false
};

// initial state
const initialState: IReimbursementState = {
  list: [],
  totalResults: 0,
  loadMoreLoading: false,
  count: 0,
  filter: "ALL",
  specialFilter: specialFilerInitialState,
  apiCallOnHold: false
};

export const itemSlice = createSlice({
  name: 'Item',
  initialState,
  reducers: {
    initialize: () => initialState,
    selectFilter: (state, action) => {
      state.filter = action.payload;
      state.count = 0;
    },
    loadMore: (state, action) => {
      // if the user sets the count, this will trigger fetch query
      state.count = action.payload;
      state.loadMoreLoading = true;
    },
    switchSpecialFilter: (state, action: PayloadAction<number>) => {
      const buttonOn: boolean = !!action.payload
      
      state.specialFilter = {
        ...state.specialFilter,
        // datePickeriOsOn: !action.payload,
        buttonOn
      };
      
    },
    initSpecialFilterZone: (state) => {
      state.specialFilter = {
        ...state.specialFilter,
        datesInterval: specialFilterDatesIntervalInitState,
        dateTypeInUse: null,
        sumInterval: specialFilerInitialState.sumInterval,
        datePickerOn: false
      }
    },
    // activate/deactivate special filter datepicker (ios)
    switchSpecialFilterDatePicker: (state, action: PayloadAction<number>) => {
      const datePickerOn: boolean = !!action.payload
      state.specialFilter = {
        ...state.specialFilter,
        datePickerOn
      };
    },
    // define date type (in order to prepare to modify)
    changeSpecialFilterDateType: (state, action) => {
      
      const newDateType: EPossibleDateTypes = action.payload;

      state.specialFilter = {
        ...state.specialFilter,
        dateTypeInUse: newDateType,
        datePickerOn: true,
      }
      state.apiCallOnHold = true
    },
    // modify special filter dateFrom or dateTo
    changeSpecialFilterDatesInterval: (state, action: PayloadAction<SpecialFilterDates>) => {
      const newDateInterval: SpecialFilterDates = action.payload;
      state.specialFilter = {
        ...state.specialFilter,
        datesInterval: newDateInterval
      }
      state.apiCallOnHold = false;
    },
    setSliderInterval: (state, action: PayloadAction<{ sumFrom: number, sumTo: number }>) => {
      state.specialFilter = {
        ...state.specialFilter,
        sumInterval: action.payload,
      }
      state.apiCallOnHold = false;
    },
    // FRE - actions to deal with RTKQ auto-fetch
    liberateApiCall: (state) => {
      state.apiCallOnHold = false
    },
    holdApiCall: (state) => {
      state.apiCallOnHold = true
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(logout,(state) => {
        state = initialState
        return state;
      })
      .addMatcher(
        apiInstance.endpoints.getReimbursements.matchFulfilled,
        (state, { payload }) => {

          const {count, loadMoreLoading} = state;

          if (loadMoreLoading && payload.totalResults > 5 && count >= 5)
            state.list = state.list.concat(payload.reimbursements);

          else
            state.list = payload.reimbursements;

          state.totalResults = payload.totalResults;

          state.loadMoreLoading = false;
        }
      )
  }
})

export const selectReimbursement = (state: RootState) => state.Item;

export const {
  selectFilter,
  loadMore,
  initialize,

  // special filter
  switchSpecialFilter,
  changeSpecialFilterDatesInterval,
  initSpecialFilterZone,
  changeSpecialFilterDateType,
  switchSpecialFilterDatePicker,
  setSliderInterval,
  
  // Bridges to RTKQ
  liberateApiCall,
  holdApiCall
} = itemSlice.actions;

export default itemSlice.reducer;
