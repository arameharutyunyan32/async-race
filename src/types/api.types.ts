export interface Car {
  id: number;
  name: string;
  color: string;
}

export interface Winner {
  id: number;
  wins: number;
  time: number;
}

export interface WinnerWithCar extends Winner {
  car: Car;
}

export type EngineStatus = 'started' | 'stopped' | 'drive' | 'broken';

export interface EngineResponse {
  velocity: number;
  distance: number;
}

export interface DriveResponse {
  success: boolean;
}

export type SortField = 'wins' | 'time';
export type SortOrder = 'ASC' | 'DESC';
