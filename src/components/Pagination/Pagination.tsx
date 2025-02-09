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
  return (
    <div className={styles.paginationContent}>
      {currentPage > 1 && (
        <Button
          color="gray"
          variant="surface"
          onClick={() => goPage(Math.max(1, currentPage - 1))}
        >
          Previous
        </Button>
      )}
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          color={`${currentPage === page ? "indigo" : "gray"}`}
          variant={`${currentPage === page ? "solid" : "surface"}`}
          onClick={() => goPage(page)}
        >
          {page}
        </Button>
      ))}
      {currentPage < totalPages && (
        <Button
          color="gray"
          variant="surface"
          onClick={() => goPage(Math.min(totalPages, currentPage + 1))}
        >
          Next
        </Button>
      )}
    </div>
  );
}
