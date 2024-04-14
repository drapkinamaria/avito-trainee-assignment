import React, { useEffect, useState } from 'react';
import { getSeasons } from "../api/api";
import { Episode } from "../types/episodes-types";
import { Pagination } from './pagination';

export function EpisodesList({ movieId }: { movieId: string }): JSX.Element {
    const [episodesList, setEpisodesList] = useState<Episode[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [limit, setLimit] = useState<number>(10);

    useEffect(() => {
        const fetchEpisodesList = async () => {
            try {
                setLoading(true);
                const response = await getSeasons(currentPage.toString(), limit.toString(), movieId);
                setEpisodesList(response.data.docs);
                setTotalPages(response.data.pages);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchEpisodesList();
    }, [movieId, currentPage, limit]);

    const handlePageChange = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    if (loading) {
        return <div className="text-center"><div className="spinner-border" role="status">
            <span className="sr-only">Загрузка...</span></div></div>;
    }

    if (error) {
        return <div className="alert alert-danger">Ошибка: {error.message}</div>;
    }

    return (
        <div>
            <h3>Список эпизодов</h3>
            {episodesList.length > 0 ? (
                episodesList.map((season) => (
                    <div key={season.id} className="card mb-3">
                        <div className="card-header">{season.enName}</div>
                        <ul className="list-group list-group-flush">
                            {season.episodes.map((episode) => (
                                <li key={episode.number} className="list-group-item">
                                    {episode.number}. {episode.name}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))
            ) : (
                <div className="alert alert-warning" role="alert">Эпизоды не найдены</div>
            )}
            {totalPages > 1 && (
                <Pagination
                    totalPages={totalPages}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            )}
        </div>
    );
}
