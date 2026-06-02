import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getWinners } from '../../api/winners';

const initialState = {
  winners: [],
  totalCount: 0,
  currentPage: 1,
  sortField: 'wins',
  sortOrder: 'DESC',
  isLoading: false,
  error: null,
};

export const fetchWinners = createAsyncThunk(
  'winners/fetchWinners',
  async (_, { getState }) => {
    const state = getState();
    const { currentPage, sortField, sortOrder } = state.winners;
    return getWinners(currentPage, sortField, sortOrder);
  },
);

const winnersSlice = createSlice({
  name: 'winners',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSorting(state, action) {
      state.sortField = action.payload.sortField;
      state.sortOrder = action.payload.sortOrder;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWinners.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchWinners.fulfilled, (state, action) => {
        state.isLoading = false;
        state.winners = action.payload.winners;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchWinners.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch winners';
      });
  },
});

export const { setCurrentPage, setSorting } = winnersSlice.actions;
export default winnersSlice.reducer;
