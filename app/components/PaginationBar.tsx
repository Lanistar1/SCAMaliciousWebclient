import React from 'react';
import Image from 'next/image';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ currentPage, totalPages, onPageChange }: PaginationProps) => {
  const getPageNumbers = () => {
    const pages = [];

    if (totalPages <= 6) {
      // If total pages are less than or equal to 6, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Always show the first page
      pages.push(1);

      if (currentPage > 3) {
        // Show ellipsis if the current page is more than 3 away from the first page
        pages.push('...');
      }

      // Determine the range of page numbers to display around the current page
      const startPage = Math.max(2, currentPage - 1);
      const endPage = Math.min(totalPages - 1, currentPage + 1);

      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        // Show ellipsis if the current page is more than 2 away from the last page
        pages.push('...');
      }

      // Always show the last page
      pages.push(totalPages);
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <section className='flex justify-end my-4'>
      <div className="flex items-center justify-center space-x-2">
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="flex justify-center items-center rounded-[5px] bg-white w-[40px] h-[36px]"
        >
          <Image src={'/assets/icons/icon-arrow-left.png'} alt='arrow-left' width={18} height={18} />
        </button>

        {pageNumbers.map((number, index) => (
          typeof number === 'number' ? (
            <button
              key={index}
              onClick={() => onPageChange(number)}
              className={`px-3 py-1 rounded-md text-[15px] ${
                currentPage === number
                  ? 'bg-[#A52A2A] text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {number}
            </button>
          ) : (
            <span key={index} className="px-3 py-1">...</span>
          )
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="flex justify-center items-center rounded-[5px] bg-[#A52A2A] w-[40px] h-[36px] disabled:opacity-50"
        >
          <Image src={'/assets/icons/icon-plus.png'} alt='arrow-right' width={18} height={18} />
        </button>
      </div>
    </section>
  );
};

export default Pagination;
