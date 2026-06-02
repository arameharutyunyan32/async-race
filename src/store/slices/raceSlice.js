import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isRacing: false,
  isResetting: false,
  winnerId: null,
  carStatuses: {},
};

const raceSlice = createSlice({
  name: 'race',
  initialState,
  reducers: {
    startRace(state) {
      state.isRacing = true;
      state.winnerId = null;
    },
    resetRace(state) {
      state.isRacing = false;
      state.isResetting = false;
      state.winnerId = null;
      state.carStatuses = {};
    },
    setCarStatus(state, action) {
      state.carStatuses[action.payload.id] = action.payload.status;
    },
    setWinner(state, action) {
      state.winnerId ??= action.payload;
    },
    clearWinner(state) {
      state.winnerId = null;
    },
  },
});

export const { startRace, resetRace, setCarStatus, setWinner, clearWinner } = raceSlice.actions;
export default raceSlice.reducer;
