import React from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

interface PostPaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const PostPagination: React.FC<PostPaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  
  // Helper to generate page numbers with ellipses for better UX
  const getPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPagesToShow = 5; // Includes first, last, and pages around current
    const halfMax = Math.floor((maxPagesToShow - 2) / 2);

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      pageNumbers.push(1);
      if (currentPage > 3) {
        pageNumbers.push('...');
      }

      let start = Math.max(2, currentPage - halfMax);
      let end = Math.min(totalPages - 1, currentPage + halfMax);

      if (currentPage <= 2) {
        start = 2;
        end = maxPagesToShow - 1;
      }

      if (currentPage >= totalPages - 1) {
        start = totalPages - (maxPagesToShow - 2);
        end = totalPages - 1;
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (currentPage < totalPages - 2) {
        pageNumbers.push('...');
      }
      pageNumbers.push(totalPages);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  return ( 
    <div className="py-8">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => { e.preventDefault(); if (currentPage > 1) onPageChange(currentPage - 1); }}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>

          {pageNumbers.map((page, index) => (
            <PaginationItem key={`${page}-${index}`}>
              {typeof page === 'number' ? (
                <PaginationLink
                  href="#"
                  isActive={currentPage === page}
                  onClick={(e) => { e.preventDefault(); onPageChange(page); }}
                >
                  {page}
                </PaginationLink>
              ) : (
                <PaginationEllipsis />
              )}
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => { e.preventDefault(); if (currentPage < totalPages) onPageChange(currentPage + 1); }}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
}
 
export default PostPagination;