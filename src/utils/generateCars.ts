import { CAR_BRANDS, CAR_MODELS } from '../constants/carNames';
import type { Car } from '../types/api.types';

export function generateRandomColor(): string {
  const hex = Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
  return `#${hex}`;
}

export function generateRandomCarName(): string {
  const brand = CAR_BRANDS[Math.floor(Math.random() * CAR_BRANDS.length)];
  const model = CAR_MODELS[Math.floor(Math.random() * CAR_MODELS.length)];
  return `${brand} ${model}`;
}

export function generateRandomCars(count: number): Omit<Car, 'id'>[] {
  return Array.from({ length: count }, () => ({
    name: generateRandomCarName(),
    color: generateRandomColor(),
  }));
}
