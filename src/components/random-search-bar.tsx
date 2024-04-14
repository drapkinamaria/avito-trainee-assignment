import React from "react";
import {RandomSearchBarProps} from "../types/types";
import {numbers, studiosName, years} from "../const";

export function RandomSearchBar({genres, countries, contentTypes, onGenreChange, onCountryChange, onYearChange,
                                    onNumberChange, onContentTypeChange, onStudioChange, selectedGenre, selectedCountry,
                                    selectedContentType, selectedStudio}: RandomSearchBarProps) {
    return (
        <div className="container my-3">
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
                <label htmlFor="age-select" className="form-label">Выбери год:</label>
                <select id="year-select" className="form-select" onChange={onYearChange}>
                    <option value="">Выбери год...</option>
                    {years.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="number-input" className="form-label">Выбери оценку фильма:</label>
                <input
                    id="number-input"
                    type="number"
                    className="form-control"
                    min="1.0"
                    max="10.0"
                    step="0.1"
                    onChange={onNumberChange}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="content-type-select" className="form-label">Выбери тип контента:</label>
                <select id="content-type-select" className="form-select" value={selectedContentType || ''}
                        onChange={onContentTypeChange}>
                    <option value="">Выбери тип...</option>
                    {contentTypes.map((type) => (
                        <option key={type.name} value={type.name}>
                            {type.name}
                        </option>
                    ))}
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="studio-select" className="form-label">Выбери сеть производства:</label>
                <select id="studio-select" className="form-select" value={selectedStudio || ''}
                        onChange={onStudioChange}>
                    <option value="">Выбери сеть...</option>
                    {studiosName.map(studio => (
                        <option key={studio} value={studio}>
                            {studio}
                        </option>
                    ))}
                </select>
            </div>
        </div>
    );
}
