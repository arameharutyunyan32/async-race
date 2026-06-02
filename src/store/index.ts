import { configureStore } from '@reduxjs/toolkit';
import garageReducer from './slices/garageSlice';
import winnersReducer from './slices/winnersSlice';
import raceReducer from './slices/raceSlice';
import uiReducer from './slices/uiSlice';

export const store = configureStore({
  reducer: {
    garage: garageReducer,
    winners: winnersReducer,
    race: raceReducer,
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
