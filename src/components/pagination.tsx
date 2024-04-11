import React from 'react';
import { PaginationProps } from '../types/types';

export function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps): JSX.Element {
    const renderPageNumbers = () => {
        const pages = [];

        pages.push(
            <li className={`page-item ${currentPage === 1 ? 'active' : ''}`} key="page_1">
                <button className="page-link" onClick={() => onPageChange(1)} disabled={currentPage === 1}>
                    1
                </button>
            </li>
        );

        if (currentPage > 3) {
            pages.push(<li className="page-item disabled" key="dots_left"><span className="page-link">...</span></li>);
        }

        const pageNumbers = [];
        for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
            pageNumbers.push(i);
        }

        pageNumbers.forEach((number) => {
            pages.push(
                <li className={`page-item ${currentPage === number ? 'active' : ''}`} key={`page_${number}`}>
                    <button className="page-link" onClick={() => onPageChange(number)}
                            disabled={currentPage === number}>
                        {number}
                    </button>
                </li>
            );
        });

        if (currentPage < totalPages - 2) {
            pages.push(<li className="page-item disabled" key="dots_right"><span className="page-link">...</span></li>);
        }

        if (totalPages > 1) {
            pages.push(
                <li className={`page-item ${currentPage === totalPages ? 'active' : ''}`} key={`page_${totalPages}`}>
                    <button className="page-link" onClick={() => onPageChange(totalPages)}
                            disabled={currentPage === totalPages}>
                        {totalPages}
                    </button>
                </li>
            );
        }

        return pages;
    };

    return (
        <nav aria-label="Page navigation" className="mt-3">
            <ul className="pagination">
                <li className="page-item">
                    <button className="page-link" onClick={() => onPageChange(currentPage - 1)}
                            disabled={currentPage <= 1}>
                        Назад
                    </button>
                </li>
                {renderPageNumbers()}
                <li className="page-item">
                    <button className="page-link" onClick={() => onPageChange(currentPage + 1)}
                            disabled={currentPage >= totalPages}>
                        Вперед
                    </button>
                </li>
            </ul>
        </nav>
    );
}
