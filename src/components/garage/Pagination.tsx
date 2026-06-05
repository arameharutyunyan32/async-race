import styles from './Pagination.module.css';

interface Props {
  currentPage: number;
  totalCount: number;
  pageSize: number;
  onPrev: () => void;
  onNext: () => void;
}

export default function Pagination({ currentPage, totalCount, pageSize, onPrev, onNext }: Props) {
  const totalPages = Math.ceil(totalCount / pageSize);

  return (
    <div className={styles.pagination}>
      <button
        className={styles.button}
        type="button"
        onClick={onPrev}
        disabled={currentPage <= 1}
      >
        Prev
      </button>

      <span className={styles.info}>
        Page {currentPage} / {totalPages || 1}
      </span>

      <button
        className={styles.button}
        type="button"
        onClick={onNext}
        disabled={currentPage >= totalPages}
      >
        Next
      </button>
    </div>
  );
}
