import styles from './RaceTrack.module.css';

const CAR_WIDTH = 80;

function CarIcon({ color }) {
  return (
    <svg viewBox="0 0 100 40" width={CAR_WIDTH} height="32" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="14" rx="4" fill={color} />
      <rect x="25" y="10" width="50" height="14" rx="4" fill={color} />
      <circle cx="25" cy="34" r="6" fill="#222" />
      <circle cx="75" cy="34" r="6" fill="#222" />
      <circle cx="25" cy="34" r="3" fill="#555" />
      <circle cx="75" cy="34" r="3" fill="#555" />
    </svg>
  );
}

export default function RaceTrack({ car, status, duration }) {
  const isDriving = status === 'driving';
  const isIdle = status === 'idle';

  const carStyle = {
    left: isDriving ? `calc(100% - ${CAR_WIDTH}px)` : '0px',
    transition: isDriving ? `left ${duration}ms linear` : 'none',
    opacity: status === 'broken' ? 0.4 : 1,
  };

  return (
    <div className={styles.track}>
      <span className={styles.label}>START</span>

      <div className={styles.road}>
        <div className={styles.carWrapper} style={carStyle}>
          <CarIcon color={car.color} />
        </div>
        <div className={styles.dashes} />
      </div>

      <span className={styles.label}>FINISH</span>

      {status === 'broken' && (
        <span className={styles.broken}>💥</span>
      )}

      {(status === 'finished' && !isIdle) && (
        <span className={styles.done}>✓</span>
      )}
    </div>
  );
}
