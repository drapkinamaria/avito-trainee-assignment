import React, {useState, useEffect, ChangeEvent} from "react";
import {getContentType, getCountries, getGenres, getRandomMovie, getStudios} from "../api/api";
import {ContentType, Country, Genre} from "../types/types";
import {RandomSearchBar} from "../components/random-search-bar";
import {useNavigate, useSearchParams} from "react-router-dom";
import {AppRoute} from "../const";

export function RandomMovie(): JSX.Element {
    const [loading, setLoading] = useState(true);
    const [genres, setGenres] = useState<Genre[]>([]);
    const [contentType, setContentType] = useState<ContentType[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedGenre, setSelectedGenre] = useState("");
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedContentType, setSelectedContentType] = useState("");
    const [selectedStudio, setSelectedStudio] = useState("");
    const [selectedYear, setSelectedYear] = useState("");
    const [selectedRating, setSelectedRating] = useState("");
    const [error, setError] = useState<Error | null>(null);
    const [id, setId] = useState('');
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const updateSearchParams = () => {
        const params = {};

        if (selectedGenre) params['genre'] = selectedGenre;
        if (selectedCountry) params['country'] = selectedCountry;
        if (selectedContentType) params['type'] = selectedContentType;
        if (selectedStudio) params['studio'] = selectedStudio;
        if (selectedYear) params['year'] = selectedYear;
        if (selectedRating) params['rating'] = selectedRating;

        setSearchParams(params);
    };

    useEffect(() => {
        updateSearchParams();
    }, [selectedGenre, selectedCountry, selectedContentType, selectedStudio, selectedYear, selectedRating]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const [genresResponse, countriesResponse, contentTypeResponse] = await Promise.all([
                    getGenres(),
                    getCountries(),
                    getContentType(),
                ]);
                setGenres(genresResponse.data);
                setCountries(countriesResponse.data);
                setContentType(contentTypeResponse.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        fetchFilters();
    }, []);

    useEffect(() => {
        if (id) {
            navigate(AppRoute.Movie.replace(':id', id));
        }
    }, [id, navigate]);

    const handleFetchRandomMovie = async () => {
        const params = {
            type: selectedContentType,
            year: selectedYear,
            'rating.kp': selectedRating,
            'genres.name': selectedGenre,
            'countries.name': selectedCountry,
            'networks.items.name': selectedStudio
        };

        setLoading(true);
        try {
            const response = await getRandomMovie(params);
            setId(response.data.id.toString());
        } catch (err) {
            setError(err as Error);
        } finally {
            setLoading(false);
        }
    };

    const handleGenreChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedGenre(event.target.value);
    };

    const handleCountryChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedCountry(event.target.value);
    };

    const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(event.target.value);
    };

    const handleNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSelectedRating(event.target.value);
    };

    const handleContentTypeChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedContentType(event.target.value);
    };

    const handleStudioChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setSelectedStudio(event.target.value);
    };

    if (loading) return <div className="alert alert-info">Загрузка...</div>;
    if (error) return <div className="alert alert-danger">{error}</div>;

    return (
        <div className="container mt-3">
            {loading ? <div>Loading...</div> : error ? <div>Error: {error}</div> : (
                <RandomSearchBar
                    genres={genres}
                    countries={countries}
                    contentTypes={contentType}
                    onGenreChange={handleGenreChange}
                    onCountryChange={handleCountryChange}
                    onYearChange={handleYearChange}
                    onNumberChange={handleNumberChange}
                    onContentTypeChange={handleContentTypeChange}
                    onStudioChange={handleStudioChange}
                    selectedGenre={selectedGenre}
                    selectedCountry={selectedCountry}
                    selectedContentType={selectedContentType}
                    selectedStudio={selectedStudio}
                    selectedYear={selectedYear}
                    selectedRating={selectedRating}
                />
            )}
            <button className="btn btn-primary mt-3" onClick={handleFetchRandomMovie} disabled={loading}>
                {loading ? 'Загрузка...' : 'Получить случайный фильм'}
            </button>
        </div>
    );
}
