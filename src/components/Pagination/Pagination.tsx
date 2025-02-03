import Link from "next/link"
import styles from './styles.module.scss';

interface PaginationProps {
  currentPage: number
  totalPages: number
}

export default function Pagination({ currentPage, totalPages }: PaginationProps) {
  return (
    <div className={styles.paginationContent}>
      {currentPage > 1 && (
        <Link href={`/page/${currentPage - 1}`} className={styles.pagination}>
          Previous
        </Link>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Link
          key={page}
          href={`/page/${page}`}
          className={`pagination__link ${currentPage === page ? "pagination__link--active" : ""}`}
        >
          {page}
        </Link>
      ))}
      {currentPage < totalPages && (
        <Link href={`/page/${currentPage + 1}`} className="pagination__link">
          Next
        </Link>
      )}
    </div>
  )
}
