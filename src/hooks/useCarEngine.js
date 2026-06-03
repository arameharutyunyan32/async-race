import { useState } from 'react';
import { startEngine, stopEngine, driveEngine } from '../api/engine';
import { setCarStatus } from '../store/slices/raceSlice';
import { useAppDispatch } from '../store/hooks';

export function useCarEngine() {
  const dispatch = useAppDispatch();
  const [durations, setDurations] = useState({});

  async function startCar(id) {
    dispatch(setCarStatus({ id, status: 'starting' }));

    const { velocity, distance } = await startEngine(id);
    const duration = distance / velocity;

    setDurations((prev) => ({ ...prev, [id]: duration }));
    dispatch(setCarStatus({ id, status: 'driving' }));

    const result = await driveEngine(id);

    if (!result.success) {
      dispatch(setCarStatus({ id, status: 'broken' }));
      return 0;
    }

    dispatch(setCarStatus({ id, status: 'finished' }));
    return duration;
  }

  async function stopCar(id) {
    await stopEngine(id);
    dispatch(setCarStatus({ id, status: 'idle' }));
    setDurations((prev) => ({ ...prev, [id]: 0 }));
  }

  return { durations, startCar, stopCar };
}
