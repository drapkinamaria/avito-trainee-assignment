import React from 'react';
import { SearchBarProps } from "../types/types";
import {ageRating} from "../const";

export function SearchBar({searchQuery, onSearchChange, onLimitChange, limit, genres, countries, onAgeChange,
                              selectedAge, selectedGenre, onGenreChange, selectedCountry, onCountryChange}:
                              SearchBarProps): JSX.Element {
    return (
        <div className="container my-3">
            <div className="input-group mb-3">
                <input
                    type="text"
                    className="form-control"
                    placeholder="Поиск фильмов..."
                    value={searchQuery}
                    onChange={onSearchChange}
                />
                <select className="custom-select" value={limit.toString()} onChange={onLimitChange}>
                    <option value="">Выбери лимит...</option>
                    {Array.from({ length: 250 }, (_, index) => (
                        <option key={index} value={index + 1}>
                            {index + 1}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="genre-select" className="form-label">Выбери жанр:</label>
                <select id="genre-select" className="form-select" value={selectedGenre || ''}
                        onChange={(e) => onGenreChange(e)}>
                    <option value="">Выбери жанр...</option>
                    {genres.map((genre) => (
                        <option key={genre.name} value={genre.name}>
                            {genre.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="country-select" className="form-label">Выбери страну:</label>
                <select id="country-select" className="form-select" value={selectedCountry || ''}
                        onChange={(e) => onCountryChange(e)}>
                    <option value="">Выбери страну...</option>
                    {countries.map((country) => (
                        <option key={country.name} value={country.name}>
                            {country.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="age-select" className="form-label">Выбери возрастной рейтинг:</label>
                <select id="age-select" className="form-select" value={selectedAge || ''}
                        onChange={(e) => onAgeChange(e)}>
                    <option value="">Выбери ограничения по возрасту...</option>
                    {ageRating.map(age => (
                        <option key={age} value={age}>
                            {age}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
