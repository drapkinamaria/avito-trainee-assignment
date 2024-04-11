import {Poster} from "./movie-type";

export type EpisodesListProps = {
    docs: Episode[];
    limit: number,
    page: number,
    pages: number,
    total: number,
}

export type Episode = {
    movieId: number,
    number: number,
    episodesCount: number,
    episodes: EpisodeDetail[];
    updatedAt: string;
    airDate: string;
    description?: string;
    duration?: number;
    enDescription?: string;
    enName: string;
    name: string;
    poster: Poster;
    source: string;
    id: string;
}

export type EpisodeDetail = {
    number: number;
    name: string;
    enName: string;
    date?: string;
    description?: string;
    airDate?: string;
    enDescription?: string;
    still?: Poster;
    duration?: number;
};

export type Still = {
    url: string;
    previewUrl: string;
};
