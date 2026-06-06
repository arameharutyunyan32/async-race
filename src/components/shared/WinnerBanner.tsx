import styles from './WinnerBanner.module.css';

interface Props {
  name: string;
  time: number;
  onClose: () => void;
}

export default function WinnerBanner({ name, time, onClose }: Props) {
  return (
    <div className={styles.overlay}>
      <div className={styles.banner}>
        <h2 className={styles.title}>🏆 Winner!</h2>
        <p className={styles.text}>
          <strong>{name}</strong> finished first!
        </p>
        <p className={styles.time}>Time: {time}s</p>
        <button className={styles.closeBtn} type="button" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
