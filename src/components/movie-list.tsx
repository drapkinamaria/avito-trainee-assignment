import React from 'react'
import {MovieProps} from "../types/movie-type";
import {AppRoute} from "../const";
import {Link} from "react-router-dom";

export function MovieList({ movies }: MovieProps[]): JSX.Element {
    return (
        <div className="list-group">
            {movies.map(movie => movie.id && (
                <Link key={movie.id} className="list-group-item list-group-item-action"
                      to={`${AppRoute.Movie.replace(':id', movie.id)}`}>
                    {movie.name || movie.alternativeName}
                </Link>
            ))}
        </div>
    );
}
