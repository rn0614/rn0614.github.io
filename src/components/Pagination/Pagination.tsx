import styles from "./styles.module.scss";
import { Button, Select } from "@radix-ui/themes";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  goPage: (num: number) => void;
  limitPage: number;
  setLimitPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function Pagination({
  currentPage,
  totalPages,
  goPage,
  limitPage,
  setLimitPage,
}: PaginationProps) {
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= limitPage - 1) {
      // 페이지 수가 9 이하일 경우 단일 페이지 표시
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
    <div className={styles.paginationWrapper}>
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
      <Select.Root
        value={String(limitPage)}
        onValueChange={(value) => setLimitPage(+value)}
      >
        <Select.Trigger placeholder="page limit" />
        <Select.Content>
          <Select.Group>
            <Select.Label></Select.Label>
            <Select.Item value="10">10</Select.Item>
            <Select.Item value="40">40</Select.Item>
            <Select.Item value="100">100</Select.Item>
            <Select.Item value="1000">1000</Select.Item>
          </Select.Group>
        </Select.Content>
      </Select.Root>
    </div>
  );
}
