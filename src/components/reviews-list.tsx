import React, { useEffect, useState } from 'react';
import { getReviews } from "../api/api";
import { Review } from "../types/types";
import { Pagination } from "./pagination";

export function ReviewsList({ movieId }: { movieId: string }): JSX.Element {
    const [reviewsList, setReviewsList] = useState<Review[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => {
        const fetchReviewsList = async () => {
            try {
                setLoading(true);
                const response = await getReviews(currentPage.toString(), limit.toString(), movieId);
                setReviewsList(response.data.docs);
                setTotalPages(response.data.pages);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchReviewsList();
    }, [movieId, currentPage, limit]);

    const onPageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h3>Список отзывов</h3>
            {loading && <p>Загрузка...</p>}
            {error && <p>Ошибка: {error.message}</p>}
            {!loading && !error && reviewsList.length === 0 && <p>Нет информации о отзывах</p>}
            <div className="list-group">
                {reviewsList.map((review) => (
                    <div key={review.id} className="list-group-item">
                        <h5 className="mb-1">{review.author}</h5>
                        <p className="mb-1">{review.review}</p>
                    </div>
                ))}
            </div>
            {totalPages > 1 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            )}
        </div>
    );
}
