import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { UIState } from '../../types/store.types';

const initialState: UIState = {
  showWinnerBanner: false,
  winnerName: null,
  winnerTime: null,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    showBanner(state, action: PayloadAction<{ name: string; time: number }>) {
      state.showWinnerBanner = true;
      state.winnerName = action.payload.name;
      state.winnerTime = action.payload.time;
    },
    hideBanner(state) {
      state.showWinnerBanner = false;
      state.winnerName = null;
      state.winnerTime = null;
    },
  },
});

export const { showBanner, hideBanner } = uiSlice.actions;
export default uiSlice.reducer;
