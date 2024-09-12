"use client";
import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface PaginationComponentProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  const generatePageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxPagesToShow = 1;

    if (totalPages <= 6) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    if (currentPage > maxPagesToShow + 1) {
      pages.push(1, "...");
    } else {
      for (let i = 1; i <= Math.min(currentPage - 1, maxPagesToShow); i++) {
        pages.push(i);
      }
    }

    pages.push(currentPage);

    if (currentPage < totalPages - maxPagesToShow - 1) {
      pages.push("...", totalPages);
    } else {
      for (
        let i = Math.max(currentPage + 1, totalPages - maxPagesToShow + 1);
        i <= totalPages;
        i++
      ) {
        pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = generatePageNumbers();

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            onClick={() => onPageChange(currentPage - 1)}
            className={currentPage <= 1 ? "opacity-50 cursor-not-allowed" : ""}
            aria-disabled={currentPage <= 2}
          />
        </PaginationItem>
        {pageNumbers.map((pageNum, index) => (
          <PaginationItem key={index}>
            {typeof pageNum === "number" ? (
              <PaginationLink
                onClick={() => onPageChange(pageNum)}
                className={
                  pageNum === currentPage ? "bg-orange-400 text-white" : ""
                }
              >
                {pageNum}
              </PaginationLink>
            ) : (
              <span className="px-3">...</span>
            )}
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationNext
            onClick={() => onPageChange(currentPage + 1)}
            className={
              currentPage >= totalPages ? "opacity-50 cursor-not-allowed" : ""
            }
            aria-disabled={currentPage >= totalPages}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};

export default PaginationComponent;
