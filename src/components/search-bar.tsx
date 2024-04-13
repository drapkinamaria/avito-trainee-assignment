import React, { useState, useEffect } from 'react';
import { getGenres, getCountries } from '../api/api';
import {Country, Genre} from "../types/types";
import {ageRating} from "../const";

export function SearchBar(): JSX.Element {
    const [genres, setGenres] = useState<Genre[]>([]);
    const [countries, setCountries] = useState<Country[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresResponse = await getGenres();
                setGenres(genresResponse.data);
            } catch (err) {
                setError(err as Error);
            } finally {
                setLoading(false);
            }
        };

        const fetchCountries = async () => {
            try {
                const countriesResponse = await getCountries();
                setCountries(countriesResponse.data);
            } catch (err) {
                setError(err as Error);
            }
        };

        fetchGenres();
        fetchCountries();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="container my-3">
            <div className="mb-3">
                <label htmlFor="genre-select" className="form-label">Выбери жанр:</label>
                <select id="genre-select" name="genres" className="form-select">
                    {genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="country-select" className="form-label">Выбери страну:</label>
                <select id="country-select" name="countries" className="form-select">
                    {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="age-select" className="form-label">Выбери возрастной рейтинг:</label>
                <select id="age-select" name="ages" className="form-select">
                    {ageRating.map((age) => (
                        <option key={age} value={age}>
                            {age}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
