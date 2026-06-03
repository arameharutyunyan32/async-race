import SortableHeader from './SortableHeader';
import styles from './WinnersTable.module.css';

function CarIcon({ color }) {
  return (
    <svg viewBox="0 0 100 40" width="60" height="24" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="20" width="80" height="14" rx="4" fill={color} />
      <rect x="25" y="10" width="50" height="14" rx="4" fill={color} />
      <circle cx="25" cy="34" r="6" fill="#222" />
      <circle cx="75" cy="34" r="6" fill="#222" />
      <circle cx="25" cy="34" r="3" fill="#555" />
      <circle cx="75" cy="34" r="3" fill="#555" />
    </svg>
  );
}

export default function WinnersTable({ winners, currentPage, pageSize, sortField, sortOrder, onSort }) {
  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>№</th>
          <th className={styles.th}>Car</th>
          <th className={styles.th}>Name</th>
          <SortableHeader
            label="Wins"
            field="wins"
            currentField={sortField}
            currentOrder={sortOrder}
            onSort={onSort}
          />
          <SortableHeader
            label="Best time (s)"
            field="time"
            currentField={sortField}
            currentOrder={sortOrder}
            onSort={onSort}
          />
        </tr>
      </thead>
      <tbody>
        {winners.map((winner, index) => (
          <tr key={winner.id} className={styles.row}>
            <td className={styles.td}>{(currentPage - 1) * pageSize + index + 1}</td>
            <td className={styles.td}>
              <CarIcon color={winner.car.color} />
            </td>
            <td className={styles.td}>{winner.car.name}</td>
            <td className={styles.td}>{winner.wins}</td>
            <td className={styles.td}>{winner.time}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
