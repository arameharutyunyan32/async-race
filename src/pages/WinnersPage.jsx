import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchWinners, setCurrentPage, setSorting } from '../store/slices/winnersSlice';
import { WINNERS_PER_PAGE } from '../constants/race';
import WinnersTable from '../components/winners/WinnersTable';
import Pagination from '../components/garage/Pagination';
import styles from './WinnersPage.module.css';

export default function WinnersPage() {
  const dispatch = useAppDispatch();
  const { winners, totalCount, currentPage, sortField, sortOrder, isLoading } = useAppSelector(
    (s) => s.winners,
  );

  useEffect(() => {
    void dispatch(fetchWinners());
  }, [dispatch, currentPage, sortField, sortOrder]);

  function handleSort(field) {
    if (field === sortField) {
      dispatch(setSorting({ sortField: field, sortOrder: sortOrder === 'ASC' ? 'DESC' : 'ASC' }));
    } else {
      dispatch(setSorting({ sortField: field, sortOrder: 'DESC' }));
    }
  }

  return (
    <div className={styles.page}>
      <h2 className={styles.title}>Winners ({totalCount})</h2>

      {isLoading && <p className={styles.message}>Loading...</p>}

      {!isLoading && winners.length === 0 && (
        <p className={styles.message}>No winners yet. Start a race!</p>
      )}

      {winners.length > 0 && (
        <WinnersTable
          winners={winners}
          currentPage={currentPage}
          pageSize={WINNERS_PER_PAGE}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
        />
      )}

      <Pagination
        currentPage={currentPage}
        totalCount={totalCount}
        pageSize={WINNERS_PER_PAGE}
        onPrev={() => { dispatch(setCurrentPage(currentPage - 1)); }}
        onNext={() => { dispatch(setCurrentPage(currentPage + 1)); }}
      />
    </div>
  );
}
