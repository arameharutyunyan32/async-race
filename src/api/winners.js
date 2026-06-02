import { WINNERS_ENDPOINT, GARAGE_ENDPOINT } from '../constants/api';
import { WINNERS_PER_PAGE } from '../constants/race';

export async function getWinners(page, sortField, sortOrder) {
  const res = await fetch(
    `${WINNERS_ENDPOINT}?_page=${page}&_limit=${WINNERS_PER_PAGE}&_sort=${sortField}&_order=${sortOrder}`,
  );
  const totalCount = Number(res.headers.get('X-Total-Count') ?? 0);
  const winners = await res.json();

  const winnersWithCars = await Promise.all(
    winners.map(async (winner) => {
      const carRes = await fetch(`${GARAGE_ENDPOINT}/${winner.id}`);
      const car = await carRes.json();
      return { ...winner, car };
    }),
  );

  return { winners: winnersWithCars, totalCount };
}

export async function getWinner(id) {
  const res = await fetch(`${WINNERS_ENDPOINT}/${id}`);
  if (!res.ok) throw new Error('Winner not found');
  return res.json();
}

export async function createWinner(data) {
  const res = await fetch(WINNERS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function updateWinner(id, data) {
  const res = await fetch(`${WINNERS_ENDPOINT}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return res.json();
}

export async function deleteWinner(id) {
  await fetch(`${WINNERS_ENDPOINT}/${id}`, { method: 'DELETE' });
}
