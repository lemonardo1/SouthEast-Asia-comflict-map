import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  sidebarOpen: false,
  timelineVisible: true,
  currentMapCenter: [33.7, 76.0], // Default center on Kashmir region
  currentZoom: 7,
  activeBaseMap: 'standard', // 'standard', 'satellite', 'terrain'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSidebarOpen: (state, action) => {
      state.sidebarOpen = action.payload;
    },
    toggleTimeline: (state) => {
      state.timelineVisible = !state.timelineVisible;
    },
    setTimelineVisible: (state, action) => {
      state.timelineVisible = action.payload;
    },
    setMapCenter: (state, action) => {
      state.currentMapCenter = action.payload;
    },
    setZoom: (state, action) => {
      state.currentZoom = action.payload;
    },
    setActiveBaseMap: (state, action) => {
      state.activeBaseMap = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleTimeline,
  setTimelineVisible,
  setMapCenter,
  setZoom,
  setActiveBaseMap,
} = uiSlice.actions;

export default uiSlice.reducer;
