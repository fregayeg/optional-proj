import { RootState } from "@redux/store";
import {
  createSlice,
  PayloadAction
} from "@reduxjs/toolkit";
import * as JSUtils from "@app/utils/date";
import {
  IExchangeState,
  ISpecialFilter,
  EPossibleDateTypes,
  SpecialFilterDates,
} from "../model";

export const specialFilterInitDates = {
  dateFrom: new Date(),
  dateTo: JSUtils.addDays(new Date(), 15),
};

export const specialFilerInitialState :ISpecialFilter = {
  buttonOn: false,
  datesInterval: specialFilterInitDates,
  datePickerIsOn: false,
  dateTypeInUse: null,
  direction: ""
};

const initialState: IExchangeState = {
  list: [],
  totalResults: 0,
  loadMore: false,
  count: 0,
  filter: "ALL",
  specialFilter: specialFilerInitialState
};

export const exchangeSlice = createSlice({
  name: 'exchange',
  initialState,
  reducers: {
    initialize: () => initialState,
    selectFilter: (state, action:PayloadAction<string>) => {
      state.filter = action.payload;
      state.count = 0;
    },
    loadMore: (state, action: PayloadAction<number>) => {
      // if the user sets the count, this will trigger fetch query
      state.count = action.payload
    },
    // activate/deactivate special filter
    switchSpecialFilter: (state, action: PayloadAction<number>) => {
      const buttonOn: boolean = !!action.payload
      
      state.specialFilter = {
        ...state.specialFilter,
        buttonOn
      };
    },
    // activate/deactivate special filter datepicker (ios)
    switchSpecialFilterDatePicker: (state, action: PayloadAction<number>) => {
      const datePickerIsOn: boolean = !!action.payload
      state.specialFilter = {
        ...state.specialFilter,
        datePickerIsOn: datePickerIsOn
      };
    },
    // define date type (in order to prepare to modify)
    changeSpecialFilterDateType: (state, action) => {
      const newDateType: EPossibleDateTypes = action.payload;
      
      state.specialFilter = {
        ...state.specialFilter,
        dateTypeInUse: newDateType
      }
    },
    // modify special filter dateFrom or dateTo
    changeSpecialFilterDatesInterval: (state, action: PayloadAction<SpecialFilterDates>) => {
      const newDateInterval: SpecialFilterDates = action.payload;
      state.specialFilter = {
        ...state.specialFilter,
        datesInterval: newDateInterval
      }
    },
    // set special filter direction
    setSpecialFilterDateDirection: (state, action: PayloadAction<string>) => {
      
      const direction: string = action.payload;
      
      state.specialFilter = {
        ...state.specialFilter,
        direction
      }
    },

    // init the whole special filter zone
    initSpecialFilterZone: (state) => {
      state.specialFilter = {
        ...specialFilerInitialState,
        datePickerIsOn: false,
        buttonOn: true
      }
    }
  },
  // extraReducers: (builder) => { // extra reducers are made to solve actions
  //   builder
  //     .addMatcher(
  //       ExchangeEndpoints.getExchanges.matchFulfilled,
  //       (state, { payload }) => {
  //
  //         // control on loadMore & selectFilter actions
  //         if (payload?.count > 0)
  //           state.list = state.list.concat(payload.exchanges);
  //         else
  //           state.list = payload.exchanges;
  //
  //         // setting totalResults anyway
  //         state.totalResults = payload.totalResults;
  //
  //       }
  //     )
  // }
})

export const selectExchange = (state: RootState) => state.exchange;

export const {
  switchSpecialFilter,
  switchSpecialFilterDatePicker,
  changeSpecialFilterDatesInterval,
  changeSpecialFilterDateType,
  setSpecialFilterDateDirection,
  initSpecialFilterZone,
} = exchangeSlice.actions;

export default exchangeSlice.reducer;


