import React, {ChangeEvent, useState, useEffect, useCallback} from 'react';
import {Link, Navigate, useLocation, useNavigate, useSearchParams} from 'react-router-dom';
import {getMoviesByName, getMovies, getGenres, getCountries} from '../api/api';
import { MovieProps } from '../types/movie-type';
import { Pagination } from "../components/pagination";
import {SearchBar} from "../components/search-bar";
import {debounce} from "../utils/debounce";
import {MovieList} from "../components/movie-list";
import {Country, Genre} from "../types/types";
import {RandomMovieButton} from "../components/random-movie-button";
import {AppRoute, AuthorizationStatus} from "../const";
import {AuthContext, AuthProvider, useAuth} from "../components/auth-context";

export function MoviesList() {

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [searchResults, setSearchResults] = useState<MovieProps[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [numberOfPages, setNumberOfPages] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [error, setError] = useState<Error | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>('');
    const [selectedGenre, setSelectedGenre] = useState<string>('');
    const [selectedCountry, setSelectedCountry] = useState<string>('');
    const [selectedAge, setSelectedAge] = useState<string>('');
    const [limit, setLimit] = useState<number>(10);
    const navigate = useNavigate();
    const [searchParams, setSearchParams] = useSearchParams();
    const [genres, setGenres] = useState<Genre[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [searchHistory, setSearchHistory] = useState<string[]>(() => {
        const saved = localStorage.getItem('searchHistory');
        return saved ? JSON.parse(saved) : [];
    });

    const { authStatus } = useAuth();

    if (authStatus !== AuthorizationStatus.Auth) {
        return <Navigate to={AppRoute.Login} replace />;
    }

    const updateSearchParams = useCallback(() => {
        const params = {};

        if (selectedGenre) params['genre'] = selectedGenre;
        if (selectedCountry) params['country'] = selectedCountry;
        if (selectedAge) params['age'] = selectedAge;
        if (searchQuery) params['query'] = searchQuery;

        params['page'] = currentPage.toString();
        params['limit'] = limit.toString();

        setSearchParams(params);
    }, [currentPage, limit, searchQuery, selectedGenre, selectedCountry, selectedAge, setSearchParams]);

    const handleRandomMovieClick = () => {
        navigate(AppRoute.RandomMovie);
    };

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [genresResponse, countriesResponse] = await Promise.all([
                    getGenres(),
                    getCountries()
                ]);
                setGenres(genresResponse.data);
                setCountries(countriesResponse.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    const fetchMovies = useCallback(async () => {
        setLoading(true);
        try {
            const response = await getMovies(
                currentPage.toString(),
                limit.toString(),
                selectedAge,
                selectedGenre,
                selectedCountry
            );
            setMovies(response.data.docs);
            setNumberOfPages(response.data.pages);
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, selectedAge, selectedGenre, selectedCountry]);

    const debouncedFetchMoviesByName = useCallback(debounce(async (name: string) => {
        if (name) {
            setLoading(true);
            try {
                const response = await getMoviesByName(currentPage.toString(), limit.toString(), name);
                setSearchResults(response.data.docs);
                setNumberOfPages(response.data.pages);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        } else {
            setSearchResults([]);
        }
    }, 1000), [currentPage, limit]);

    useEffect(() => {
        if (searchQuery) {
            debouncedFetchMoviesByName(searchQuery);
        } else {
            fetchMovies();
        }
    }, [searchQuery, debouncedFetchMoviesByName, fetchMovies]);

    useEffect(() => {
        if (searchQuery !== null) {
            debouncedFetchMoviesByName(searchQuery);
        }
    }, [searchQuery, debouncedFetchMoviesByName]);

    useEffect(() => {
        updateSearchParams();
    }, [selectedGenre, selectedCountry, selectedAge, searchQuery, updateSearchParams]);


    useEffect(() => {
        const newPage = parseInt(searchParams.get('page') || '1', 10);
        const newLimit = parseInt(searchParams.get('limit') || '10', 10);
        fetchMovies();
        setCurrentPage(newPage);
        setLimit(newLimit);
    }, [searchParams]);

    const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value;
        setSearchQuery(newQuery);

        if (newQuery !== '') {
            setSelectedGenre('');
            setSelectedCountry('');
            setSelectedAge('');
        }

        const updatedHistory = [newQuery, ...searchHistory.filter(item => item !== newQuery)];
        if (updatedHistory.length > 20) {
            updatedHistory.length = 20;
        }
        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const handleGenreChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(e.target.value);
        setSearchQuery('');
        fetchMovies();
    };

    const handleCountryChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(e.target.value);
        setSearchQuery('');
        fetchMovies();
    };

    const handleAgeChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setSelectedAge(e.target.value);
        setSearchQuery('');
        fetchMovies();
    };

    const handleChangeNumber = (e: ChangeEvent<HTMLSelectElement>) => {
        const newLimit = parseInt(e.target.value, 10);
        setLimit(newLimit);
        setSearchParams({ page: currentPage.toString(), limit: newLimit.toString() });
    };

    if (loading) return <div className="alert alert-info">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">Ошибка: {error instanceof Error ? error.message :
        "Произошла ошибка"}</div>;

    const moviesToShow = searchQuery ? searchResults : movies;

    return (
        <div className="container mt-3">
            <h1 className="text-center">Список фильмов</h1>
            <SearchBar
                searchQuery={searchQuery}
                onSearchChange={handleSearchChange}
                onLimitChange={handleChangeNumber}
                limit={limit}
                genres={genres}
                countries={countries}
                onAgeChange={handleAgeChange}
                selectedAge={selectedAge}
                selectedGenre={selectedGenre}
                onGenreChange={handleGenreChange}
                selectedCountry={selectedCountry}
                onCountryChange={handleCountryChange}
            />
            <MovieList movies={moviesToShow} />
            {numberOfPages > 1 && (
                <Pagination onPageChange={(page: number) => setCurrentPage(page)}
                            currentPage={currentPage} totalPages={numberOfPages} />
            )}
            {numberOfPages === 0 && (
                <div className="alert alert-warning" role="alert">Фильмы не найдены</div>
            )}
            <Link to={AppRoute.RandomMovie}>
                <RandomMovieButton onClick={handleRandomMovieClick} isLoading={false}/>
            </Link>
        </div>
    );
}
