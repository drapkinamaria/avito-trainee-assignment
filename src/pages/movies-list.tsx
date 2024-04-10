import React, { ChangeEvent, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getMoviesByName, getMovies, getRandomMovie } from '../api/api';
import { MovieProps } from '../types/movie-type';
import { AppRoute } from '../const';
import { Pagination } from "../components/pagination";

export function MoviesList() {
    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const navigate = useNavigate();
    const [isRandomLoading, setIsRandomLoading] = useState(false);
    const [limit, setLimit] = useState<number>(10);

    async function fetchMovies(page: number, limit: number) {
        if (!searchQuery) {
            setLoading(true);
            try {
                const response = await getMovies(page.toString(), limit.toString());
                setMovies(response.data.docs);
                setNumberOfPages(response.data.pages);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        }
    }

    async function fetchMoviesByName(name: string) {
        if (name) {
            setLoading(true);
            try {
                const response = await getMoviesByName(currentPage.toString(), limit.toString(), name);
                setSearchResults(response.data.docs);
                setNumberOfPages(response.data.pages);
                setLoading(false);
            } catch (err) {
                setError(err as Error);
                setLoading(false);
            }
        } else {
            setSearchResults([]);
        }
    }

    useEffect(() => {
        fetchMovies(currentPage, limit);
    }, [currentPage, limit, searchQuery]);

    function handleSearchChange(e: ChangeEvent<HTMLInputElement>) {
        setSearchQuery(e.target.value);
        fetchMoviesByName(e.target.value);
    }

    async function onClickRandomMovie() {
        setIsRandomLoading(true);
        try {
            const responseRandom = await getRandomMovie();
            navigate(AppRoute.Movie.replace(':id', responseRandom.data.id.toString()));
        } catch (err) {
            console.error(err);
            alert("Failed to fetch a random movie.");
        } finally {
            setIsRandomLoading(false);
        }
    }

    function handleChangeNumber(e: ChangeEvent<HTMLSelectElement>) {
        setLimit(parseInt(e.target.value, 10));
    }

    if (loading) return <div className="alert alert-info">Loading...</div>;
    if (error) return <div className="alert alert-danger">Error: {error instanceof Error ? error.message :
        "An error occurred"}</div>;

    const moviesToShow = searchQuery ? searchResults : movies;

    return (
        <>
            <h1 className="text-center">Movies</h1>
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search movies..."
                    value={searchQuery}
                    onChange={handleSearchChange}
                />
                <select className="custom-select" value={limit} onChange={handleChangeNumber}>
                    {Array.from({ length: 250 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="list-group">
                {moviesToShow.map((movie: MovieProps) => {
                    if (movie.id) {
                        return (
                            <Link key={movie.id} className="list-group-item list-group-item-action"
                                  to={`${AppRoute.Movie.replace(':id', movie.id.toString())}`}>
                                {movie.name ? movie.name : movie.alternativeName}
                            </Link>
                        );
                    }
                    return null;
                })}
            </div>
            {numberOfPages > 1 && (
                <Pagination onPageChange={(page: number) => setCurrentPage(page)}
                            currentPage={currentPage} totalPages={numberOfPages} />
            )}
            <button className="btn btn-primary mt-3" onClick={onClickRandomMovie} disabled={isRandomLoading}>
                {isRandomLoading ? 'Loading...' : 'Choose a Random Movie'}
            </button>
        </>
    );
}
