import { GARAGE_ENDPOINT } from '../constants/api';
import { CARS_PER_PAGE } from '../constants/race';

export async function getCars(page) {
  const res = await fetch(`${GARAGE_ENDPOINT}?_page=${page}&_limit=${CARS_PER_PAGE}`);
  const totalCount = Number(res.headers.get('X-Total-Count') ?? 0);
  const cars = await res.json();
  return { cars, totalCount };
}

export async function getCar(id) {
  const res = await fetch(`${GARAGE_ENDPOINT}/${id}`);
  return res.json();
}

export async function createCar(data) {
  const res = await fetch(GARAGE_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateCar(id, data) {
  const res = await fetch(`${GARAGE_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteCar(id) {
  await fetch(`${GARAGE_ENDPOINT}/${id}`, { method: 'DELETE' });
}
