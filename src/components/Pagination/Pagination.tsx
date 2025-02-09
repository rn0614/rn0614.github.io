import styles from "./styles.module.scss";
import { Button } from "@radix-ui/themes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goPage: (num: number) => void;
}

export default function Pagination({
  currentPage,
  totalPages,
  goPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 9) {
      // 페이지 수가 9 이하일 경우 모든 페이지 표시
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // 항상 처음 페이지 표시
      pages.push(1);

      // 앞쪽 생략(...) 처리
      if (currentPage > 4) {
        pages.push("...");
      }

      // 현재 페이지 주변 표시 (최소 -2 ~ +2)
      const start = Math.max(2, currentPage - 2); // 최소 2부터 시작
      const end = Math.min(totalPages - 1, currentPage + 2); // 마지막 페이지 전까지만

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      // 뒤쪽 생략(...) 처리
      if (currentPage < totalPages - 3) {
        pages.push("...");
      }

      // 항상 마지막 페이지 표시
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className={styles.paginationContent}>
      {currentPage > 1 && (
        <Button
          color="gray"
          variant="surface"
          onClick={() => goPage(currentPage - 1)}
        >
          Prev
        </Button>
      )}
      {pageNumbers.map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            color={`${currentPage === page ? "indigo" : "gray"}`}
            variant={`${currentPage === page ? "solid" : "surface"}`}
            onClick={() => goPage(page)}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className={styles.ellipsis}>
            {page}
          </span>
        )
      )}
      {currentPage < totalPages && (
        <Button
          color="gray"
          variant="surface"
          onClick={() => goPage(currentPage + 1)}
        >
          Next
        </Button>
      )}
    </div>
  );
}
