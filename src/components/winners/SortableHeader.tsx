import type { SortField, SortOrder } from '../../types/api.types';
import styles from './SortableHeader.module.css';

interface Props {
  label: string;
  field: SortField;
  currentField: SortField;
  currentOrder: SortOrder;
  onSort: (field: SortField) => void;
}

export default function SortableHeader({ label, field, currentField, currentOrder, onSort }: Props) {
  const isActive = field === currentField;
  let arrow = '';
  if (isActive) arrow = currentOrder === 'ASC' ? ' ▲' : ' ▼';

  return (
    <th className={styles.header}>
      <button
        className={`${styles.btn} ${isActive ? styles.active : ''}`}
        type="button"
        onClick={() => { onSort(field); }}
      >
        {label}{arrow}
      </button>
    </th>
  );
}
