import styles from './RaceControls.module.css';

export default function RaceControls({ isRacing, isResetting, onRace, onReset, onGenerate }) {
  return (
    <div className={styles.controls}>
      <button
        className={styles.raceBtn}
        type="button"
        onClick={onRace}
        disabled={isRacing || isResetting}
      >
        Race
      </button>

      <button
        className={styles.resetBtn}
        type="button"
        onClick={onReset}
        disabled={isResetting || !isRacing}
      >
        Reset
      </button>

      <button
        className={styles.generateBtn}
        type="button"
        onClick={onGenerate}
        disabled={isRacing}
      >
        Generate cars
      </button>
    </div>
  );
}
