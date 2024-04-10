import React from 'react'
import { PaginationProps } from '../types/types';

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps): JSX.Element {
    const renderPageNumbers = () => {
        const pages = [];

        pages.push(
            <button key="page_1" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                1
            </button>
        );

        if (currentPage > 3) {
            pages.push(<span key="dots_left">...</span>);
        }

        const pageNumbers = [];
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pageNumbers.push(i);
        }

        pageNumbers.forEach((number) => {
            pages.push(
                <button key={`page_${number}`} onClick={() => onPageChange(number)} disabled={currentPage === number}>
                    {number}
                </button>
            );
        });

        if (currentPage < totalPages - 2) {
            pages.push(<span key="dots_right">...</span>);
        }

        if (totalPages > 1) {
            pages.push(
                <button key={`page_${totalPages}`} onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages}>
                    {totalPages}
                </button>
            );
        }

        return pages;
    };

    return (
        <div>
            <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage <= 1}>
                Previous
            </button>
            {renderPageNumbers()}
            <button onClick={() => onPageChange(currentPage + 1)} disabled={currentPage >= totalPages}>
                Next
            </button>
        </div>
    );
}
