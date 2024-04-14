import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '../api/api';
import { MovieProps } from '../types/movie-type';
import { AppRoute } from '../const';
import ImageCarousel from "../components/image-carousel";
import { Pagination } from "../components/pagination";
import {EpisodesList} from "../components/episodes-list";
import {ReviewsList} from "../components/reviews-list";

export const Movie = () => {
    const { id } = useParams<{ id: string }>();
    const [movie, setMovie] = useState<MovieProps | undefined>();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentActorPage, setCurrentActorPage] = useState(1);
    const actorsPerPage = 10;
    const indexOfLastActor = currentActorPage * actorsPerPage;
    const indexOfFirstActor = indexOfLastActor - actorsPerPage;

    useEffect(() => {
        if (id) {
            const fetchMovie = async () => {
                try {
                    setLoading(true);
                    const response = await getMovieById(id);
                    setMovie(response.data);
                } catch (err) {
                    setError("Error fetching movie");
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }
    }, [error, id]);

    if (loading) return <div className="alert alert-info">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!movie) return <div className="alert alert-warning">Movie not found.</div>;

    const currentActors = movie.persons.slice(indexOfFirstActor, indexOfLastActor);
    const paginate = (pageNumber: number) => setCurrentActorPage(pageNumber);

    const similarMoviesPosters = movie.similarMovies.map(similarMovie => ({
        imageUrl: similarMovie.poster.url,
        id: similarMovie.id,
    }));

    return (
        <div className="container mt-3">
            <Link to={AppRoute.Root} className="btn btn-primary mb-3">Назад</Link>
            <h1>{movie.name || movie.alternativeName}</h1>
            <p>{movie.shortDescription}</p>
            <div>Оценка: {movie.rating.kp || 'Нет информации'}</div>
            <h3>Список актеров</h3>
            <div>
                {movie.persons && movie.persons.length > 0 ? (
                    <ul className="list-group">
                        {currentActors.map((person) => (
                            person.name && <li key={person.id} className="list-group-item">{person.name}</li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-secondary">Нет информации о актерах</div>
                )}
            </div>
            {movie.persons && movie.persons.length > 10 && (
                <Pagination
                    totalPages={Math.ceil(movie.persons.length / actorsPerPage)}
                    currentPage={currentActorPage}
                    onPageChange={paginate}
                />
            )}
            <div>{movie.isSeries ? <EpisodesList movieId={id} /> : ''}</div>
            <ReviewsList movieId={id}></ReviewsList>
            {
                movie.poster.url && (
                    <img
                        src={movie.poster.url}
                        alt={movie.name || movie.alternativeName}
                        className="img-fluid my-3"
                        style={{ maxWidth: '300px', height: 'auto' }}
                    />
                )
            }
            <div className="mt-3">
                {similarMoviesPosters.length > 0 ? (
                    <ImageCarousel imagesUrlId={similarMoviesPosters} />
                ) : (
                    <div className="alert alert-secondary">Нет информации о похожих фильмах</div>
                )}
            </div>
        </div>
    );
};
