import React from 'react';
import {RandomMovieButtonProps} from "../types/types";

export function RandomMovieButton({ onClick, isLoading }: RandomMovieButtonProps): JSX.Element {
    return (
        <button className="btn btn-primary mt-3" onClick={onClick} disabled={isLoading}>
            {isLoading ? 'Загрузка...' : 'Выбери рандомный фильм'}
        </button>
    );
}
