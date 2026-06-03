import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchCars,
  createCarThunk,
  updateCarThunk,
  deleteCarThunk,
  setCurrentPage,
  setSelectedCar,
  clearSelectedCar,
} from '../store/slices/garageSlice';
import { hideBanner } from '../store/slices/uiSlice';
import { useRace } from '../hooks/useRace';
import { generateRandomCars } from '../utils/generateCars';
import { deleteWinner } from '../api/winners';
import { CARS_PER_PAGE, RANDOM_CARS_COUNT } from '../constants/race';
import CarCard from '../components/garage/CarCard';
import RaceTrack from '../components/garage/RaceTrack';
import CarForm from '../components/garage/CarForm';
import RaceControls from '../components/garage/RaceControls';
import Pagination from '../components/garage/Pagination';
import WinnerBanner from '../components/shared/WinnerBanner';
import styles from './GaragePage.module.css';

export default function GaragePage() {
  const dispatch = useAppDispatch();

  const { cars, totalCount, currentPage, selectedCarId, isLoading } = useAppSelector(
    (s) => s.garage,
  );
  const { isRacing, isResetting, carStatuses } = useAppSelector((s) => s.race);
  const { showWinnerBanner, winnerName, winnerTime } = useAppSelector((s) => s.ui);
  const { durations, startCar, stopCar, startRace, resetRace } = useRace();

  const selectedCar = cars.find((c) => c.id === selectedCarId);

  useEffect(() => {
    void dispatch(fetchCars(currentPage));
  }, [dispatch, currentPage]);

  function handleCreate(name, color) {
    void dispatch(createCarThunk({ name, color })).then(() => {
      void dispatch(fetchCars(currentPage));
    });
  }

  function handleUpdate(name, color) {
    if (!selectedCarId) return;
    void dispatch(updateCarThunk({ id: selectedCarId, data: { name, color } })).then(() => {
      dispatch(clearSelectedCar());
      void dispatch(fetchCars(currentPage));
    });
  }

  async function handleDelete(id) {
    await dispatch(deleteCarThunk(id));

    try {
      await deleteWinner(id);
    } catch {
      // car might not have a winner entry, that's fine
    }

    if (cars.length === 1 && currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    } else {
      void dispatch(fetchCars(currentPage));
    }
  }

  async function handleGenerate() {
    const randomCars = generateRandomCars(RANDOM_CARS_COUNT);
    await Promise.all(randomCars.map((car) => dispatch(createCarThunk(car))));
    void dispatch(fetchCars(currentPage));
  }

  return (
    <div className={styles.page}>
      {showWinnerBanner && winnerName !== null && winnerTime !== null && (
        <WinnerBanner
          name={winnerName}
          time={winnerTime}
          onClose={() => { dispatch(hideBanner()); }}
        />
      )}

      <div className={styles.topBar}>
        <CarForm buttonLabel="Create" onSubmit={handleCreate} />
        <CarForm
          key={selectedCarId ?? 'none'}
          buttonLabel="Update"
          onSubmit={handleUpdate}
          disabled={!selectedCarId}
          initialName={selectedCar?.name}
          initialColor={selectedCar?.color}
        />
      </div>

      <RaceControls
        isRacing={isRacing}
        isResetting={isResetting}
        onRace={() => { void startRace(cars); }}
        onReset={() => { void resetRace(cars); }}
        onGenerate={() => { void handleGenerate(); }}
      />

      <h2 className={styles.title}>Garage ({totalCount})</h2>

      {isLoading && <p className={styles.message}>Loading...</p>}

      {!isLoading && cars.length === 0 && (
        <p className={styles.message}>No cars yet. Create one above!</p>
      )}

      <div className={styles.carList}>
        {cars.map((car) => (
          <div key={car.id} className={styles.carRow}>
            <CarCard
              car={car}
              status={carStatuses[car.id] ?? 'idle'}
              isRacing={isRacing}
              onSelect={() => { dispatch(setSelectedCar(car.id)); }}
              onDelete={() => { void handleDelete(car.id); }}
              onStart={() => { void startCar(car.id); }}
              onStop={() => { void stopCar(car.id); }}
            />
            <RaceTrack
              car={car}
              status={carStatuses[car.id] ?? 'idle'}
              duration={durations[car.id] ?? 0}
            />
          </div>
        ))}
      </div>

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={CARS_PER_PAGE}
        onPrev={() => { dispatch(setCurrentPage(currentPage - 1)); }}
        onNext={() => { dispatch(setCurrentPage(currentPage + 1)); }}
      />
    </div>
  );
}
