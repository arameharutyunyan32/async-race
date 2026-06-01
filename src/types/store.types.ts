import type { Car, WinnerWithCar, SortField, SortOrder } from './api.types';

export interface GarageState {
  cars: Car[];
  totalCount: number;
  currentPage: number;
  selectedCarId: number | null;
  isLoading: boolean;
  error: string | null;
}

export interface WinnersState {
  winners: WinnerWithCar[];
  totalCount: number;
  currentPage: number;
  sortField: SortField;
  sortOrder: SortOrder;
  isLoading: boolean;
  error: string | null;
}

export type CarRaceStatus = 'idle' | 'starting' | 'driving' | 'finished' | 'broken';

export interface RaceState {
  isRacing: boolean;
  isResetting: boolean;
  winnerId: number | null;
  carStatuses: Record<number, CarRaceStatus>;
}

export interface UIState {
  showWinnerBanner: boolean;
  winnerName: string | null;
  winnerTime: number | null;
}
