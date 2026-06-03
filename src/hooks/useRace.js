import { useAppDispatch } from '../store/hooks';
import {
  startRace as startRaceAction,
  resetRace as resetRaceAction,
  setWinner,
} from '../store/slices/raceSlice';
import { showBanner, hideBanner } from '../store/slices/uiSlice';
import { getWinner, createWinner, updateWinner } from '../api/winners';
import { useCarEngine } from './useCarEngine';
import { formatTime } from '../utils/formatTime';

export function useRace() {
  const dispatch = useAppDispatch();
  const { durations, startCar, stopCar } = useCarEngine();

  async function saveWinner(car, duration) {
    const timeInSeconds = formatTime(duration);

    try {
      const existing = await getWinner(car.id);
      await updateWinner(car.id, {
        wins: existing.wins + 1,
        time: Math.min(existing.time, timeInSeconds),
      });
    } catch {
      await createWinner({ id: car.id, wins: 1, time: timeInSeconds });
    }
  }

  async function startRace(cars) {
    dispatch(startRaceAction());

    let winnerFound = false;

    await Promise.all(
      cars.map(async (car) => {
        const duration = await startCar(car.id);

        if (duration > 0 && !winnerFound) {
          winnerFound = true;
          dispatch(setWinner(car.id));
          dispatch(showBanner({ name: car.name, time: formatTime(duration) }));
          await saveWinner(car, duration);
        }
      }),
    );
  }

  async function resetRace(cars) {
    dispatch(hideBanner());
    await Promise.all(cars.map((car) => stopCar(car.id)));
    dispatch(resetRaceAction());
  }

  return { durations, startCar, stopCar, startRace, resetRace };
}
