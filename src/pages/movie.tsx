import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '../api/api';
import { MovieProps } from '../types/movie-type';
import { AppRoute } from '../const';
import ImageCarousel from "../components/image-carousel";
import { Pagination } from "../components/pagination";

export const Movie = () => {
    const { id } = useParams<{ id?: string }>();
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
                    console.log(response.data.rating.imdb)
                } catch (err) {
                    setError("Error fetching movie");
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }
    }, [id]);

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;
    if (!movie) return <div className="alert alert-warning">Movie not found.</div>;

    const currentActors = movie.persons.slice(indexOfFirstActor, indexOfLastActor);
    const paginate = (pageNumber: number) => setCurrentActorPage(pageNumber);

    return (
        <div className="container mt-3">
            <Link to={AppRoute.Root} className="btn btn-primary mb-3">Назад</Link>
            <h1>{movie.name}</h1>
            <p>{movie.shortDescription}</p>
            <div>Rating: <span className="badge badge-success">{movie.rating.imdb}</span></div>
            <h3>Actors</h3>
            <div>
                {movie.persons && movie.persons.length > 0 ? (
                    <ul className="list-group">
                        {currentActors.map((person) => (
                            <li key={person.id} className="list-group-item">{person.name}</li>
                        ))}
                    </ul>
                ) : (
                    <div className="alert alert-secondary">No information about actors.</div>
                )}
            </div>
            {movie.persons && movie.persons.length > 10 && (
                <Pagination
                    totalPages={Math.ceil(movie.persons.length / actorsPerPage)}
                    currentPage={currentActorPage}
                    onPageChange={paginate}
                />
            )}
            <img src={movie.poster.url} alt={movie.name} className="img-fluid my-3"></img>
            <ImageCarousel imagesUrl={movie.similarMovies.map((mov => mov.poster))}></ImageCarousel>
            <div className="mt-3">
                <h3>Similar Movies</h3>
                {movie.similarMovies.length > 0 ? (
                    <div className="row">
                        {movie.similarMovies.map((similarMovie) => (
                            <div key={similarMovie.id} className="col-md-4 mb-3">
                                <Link to={`${AppRoute.Movie.replace(':id', similarMovie.id.toString())}`}>
                                    <div>{similarMovie.name}</div>
                                    <img src={similarMovie.poster.url} alt={similarMovie.name} className="img-fluid" />
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="alert alert-secondary">No information about similar movies.</div>
                )}
            </div>
        </div>
    );
};
