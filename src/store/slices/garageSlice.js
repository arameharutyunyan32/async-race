import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getCars, createCar, updateCar, deleteCar } from '../../api/garage';

const initialState = {
  cars: [],
  totalCount: 0,
  currentPage: 1,
  selectedCarId: null,
  isLoading: false,
  error: null,
};

export const fetchCars = createAsyncThunk('garage/fetchCars', (page) => getCars(page));

export const createCarThunk = createAsyncThunk(
  'garage/createCar',
  (data) => createCar(data),
);

export const updateCarThunk = createAsyncThunk(
  'garage/updateCar',
  ({ id, data }) => updateCar(id, data),
);

export const deleteCarThunk = createAsyncThunk('garage/deleteCar', async (id) => {
  await deleteCar(id);
  return id;
});

const garageSlice = createSlice({
  name: 'garage',
  initialState,
  reducers: {
    setCurrentPage(state, action) {
      state.currentPage = action.payload;
    },
    setSelectedCar(state, action) {
      state.selectedCarId = action.payload;
    },
    clearSelectedCar(state) {
      state.selectedCarId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCars.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchCars.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cars = action.payload.cars;
        state.totalCount = action.payload.totalCount;
      })
      .addCase(fetchCars.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message ?? 'Failed to fetch cars';
      })
      .addCase(createCarThunk.fulfilled, (state, action) => {
        state.cars.push(action.payload);
        state.totalCount += 1;
      })
      .addCase(updateCarThunk.fulfilled, (state, action) => {
        const idx = state.cars.findIndex((c) => c.id === action.payload.id);
        if (idx !== -1) state.cars[idx] = action.payload;
      })
      .addCase(deleteCarThunk.fulfilled, (state, action) => {
        state.cars = state.cars.filter((c) => c.id !== action.payload);
        state.totalCount -= 1;
      });
  },
});

export const { setCurrentPage, setSelectedCar, clearSelectedCar } = garageSlice.actions;
export default garageSlice.reducer;
