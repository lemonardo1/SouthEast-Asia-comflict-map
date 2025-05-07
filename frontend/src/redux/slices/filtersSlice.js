import { createSlice } from '@reduxjs/toolkit';
import { subMonths } from 'date-fns';

const initialState = {
  dateRange: {
    start: subMonths(new Date(), 1).toISOString(), // Default to 1 month ago
    end: new Date().toISOString(),
  },
  eventTypes: [], // Empty array means all types
  regions: [], // Empty array means all regions
  searchQuery: '',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setDateRange: (state, action) => {
      state.dateRange = action.payload;
    },
    setEventTypes: (state, action) => {
      state.eventTypes = action.payload;
    },
    setRegions: (state, action) => {
      state.regions = action.payload;
    },
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setDateRange,
  setEventTypes,
  setRegions,
  setSearchQuery,
  resetFilters,
} = filtersSlice.actions;

export default filtersSlice.reducer;
