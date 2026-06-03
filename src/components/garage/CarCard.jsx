import styles from './CarCard.module.css';

function CarIcon({ color }) {
  return (
    <svg viewBox="0 0 100 40" width="80" height="32" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="14" rx="4" fill={color} />
      <rect x="25" y="10" width="50" height="14" rx="4" fill={color} />
      <circle cx="25" cy="34" r="6" fill="#222" />
      <circle cx="75" cy="34" r="6" fill="#222" />
      <circle cx="25" cy="34" r="3" fill="#555" />
      <circle cx="75" cy="34" r="3" fill="#555" />
    </svg>
  );
}

export default function CarCard({ car, status, isRacing, onSelect, onDelete, onStart, onStop }) {
  const isIdle = status === 'idle' || status === 'finished' || status === 'broken';
  const isDriving = status === 'starting' || status === 'driving';

  return (
    <div className={styles.card}>
      <div className={styles.controls}>
        <button
          className={styles.selectBtn}
          type="button"
          onClick={onSelect}
          disabled={isRacing}
        >
          Select
        </button>
        <button
          className={styles.deleteBtn}
          type="button"
          onClick={onDelete}
          disabled={isRacing}
        >
          Remove
        </button>
      </div>

      <div className={styles.engineControls}>
        <button
          className={styles.startBtn}
          type="button"
          onClick={onStart}
          disabled={isDriving}
        >
          A
        </button>
        <button
          className={styles.stopBtn}
          type="button"
          onClick={onStop}
          disabled={isIdle}
        >
          B
        </button>
      </div>

      <CarIcon color={car.color} />

      <span className={styles.name}>{car.name}</span>
    </div>
  );
}
