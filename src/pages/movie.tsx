import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getMovieById } from '../api/api';
import { MovieProps } from '../types/movie-type';
import { AppRoute } from '../const';
import ImageCarousel from "../components/image-carousel";
import {Pagination} from "../components/pagination";

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
                } catch (err) {
                    setError("Error fetching movie");
                } finally {
                    setLoading(false);
                }
            };
            fetchMovie();
        }
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!movie) return <div>Movie not found.</div>;

    const currentActors = movie.persons.slice(indexOfFirstActor, indexOfLastActor);
    const paginate = (pageNumber: number) => setCurrentActorPage(pageNumber);

    return (
        <div>
            <div>{movie.name}</div>
            <div>{movie.shortDescription}</div>
            <div>{movie.rating.imdb}</div>
            <div>
                {movie.persons && movie.persons.length > 0 ? (
                    currentActors.map((person) => (
                        <div key={person.id}>{person.name}</div>
                    ))
                ) : (
                    <div>No information about actors.</div>
                )}
            </div>
            {movie.persons && movie.persons.length > 10 && (
                <Pagination
                    totalPages={Math.ceil(movie.persons.length / actorsPerPage)}
                    currentPage={currentActorPage}
                    onPageChange={paginate}
                />
            )}
            <img src={movie.poster.url} alt={movie.name}></img>
            <ImageCarousel imagesUrl={movie.similarMovies.map((mov => mov.poster))}></ImageCarousel>
            <div>
                {movie.similarMovies.length > 0 ? (
                    movie.similarMovies.map((similarMovie) => (
                        <div key={similarMovie.id}>
                            <Link to={`${AppRoute.Movie.replace(':id', similarMovie.id.toString())}`}>
                                <div>{similarMovie.name}</div>
                                <img src={similarMovie.poster.url} alt={similarMovie.name} />
                            </Link>
                        </div>
                    ))
                ) : (
                    <div>No information about similar movies.</div>
                )}
            </div>
        </div>
    );
};
