import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import filtersReducer from './slices/filtersSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    events: eventsReducer,
    filters: filtersReducer,
    ui: uiReducer,
  },
});
