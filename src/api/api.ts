import axios, {AxiosResponse} from 'axios'
import {token} from './token'
import {MoviePage, MovieProps} from '../types/movie-type';
import {EpisodesListProps} from "../types/episodes-types";
import {ContentType, Country, Genre, ReviewsResponse} from "../types/types";
import {StudiosProps} from "../types/studios-types";

export const BASE_URL = 'https://api.kinopoisk.dev/v1.4'
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const api = axios.create({
    baseURL: BASE_URL,
})

const delay = (duration) => new Promise(resolve => setTimeout(resolve, duration));

api.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = token;
    if (!config['retryCount']) {
        config['retryCount'] = 0;
    }
    return config;
    }, (error) => {
    return Promise.reject(error)
})

api.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
        const config = error.config;
        if (error.response && error.response.status === 503 && config['retryCount'] < MAX_RETRIES) {
            config['retryCount'] += 1;
            await delay(RETRY_DELAY);
            return api(config);
        }
        return Promise.reject(error);
    }
);

const apiV1 = axios.create({
    baseURL: BASE_URL.replace('v1.4', 'v1'),
});

apiV1.interceptors.request.use((config) => {
    config.headers['X-API-KEY'] = token;
    if (!config['retryCount']) {
        config['retryCount'] = 0;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

apiV1.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: any) => {
        const config = error.config;
        if (error.response && error.response.status === 503 && config['retryCount'] < MAX_RETRIES) {
            config['retryCount'] += 1;
            await delay(RETRY_DELAY);
            return api(config);
        }
        return Promise.reject(error);
    }
);

export const getMovies: (
    pageNumber: string,
    limit: string,
    ageRating?: string,
    genreName?: string,
    countryName?: string
) => Promise<AxiosResponse<MoviePage, unknown>> = (
    pageNumber,
    limit,
    ageRating,
    genreName,
    countryName
) => {
    let query = `/movie?page=${pageNumber}&limit=${limit}`;
    if (ageRating) query += `&ageRating=${ageRating}`;
    if (genreName) query += `&genres.name=${encodeURIComponent(genreName)}`;
    if (countryName) query += `&countries.name=${encodeURIComponent(countryName)}`;

    return api.get<MoviePage>(query);
};

export const getMovieById: (id: string) => Promise<AxiosResponse<MovieProps, unknown>> = (id: string) =>
    api.get(`/movie/${id}`)

export const getMoviesByName: (pageNumber: string, limit: string, name: string) =>
    Promise<AxiosResponse<MoviePage, unknown>> = (pageNumber: string, limit: string, name: string) =>
    api.get<MoviePage>(`/movie/search?page=${pageNumber}&limit=${limit}&query=${name}`)

export const getRandomMovie: ({
                                  type,
                                  year,
                                  ratingKp,
                                  genreName,
                                  countryName,
                                  networkName
                              }: {
    type?: string,
    year?: string,
    ratingKp?: string,
    genreName?: string,
    countryName?: string,
    networkName?: string
}) => Promise<AxiosResponse<MovieProps, unknown>> = ({
                                                         type,
                                                         year,
                                                         ratingKp,
                                                         genreName,
                                                         countryName,
                                                         networkName
                                                     }) => {
    let query = '/movie/random?';
    const params = [
        type && `type=${encodeURIComponent(type)}`,
        year && `year=${encodeURIComponent(year)}`,
        ratingKp && `rating.kp=${encodeURIComponent(ratingKp)}`,
        genreName && `genres.name=${encodeURIComponent(genreName)}`,
        countryName && `countries.name=${encodeURIComponent(countryName)}`,
        networkName && `networks.items.name=${encodeURIComponent(networkName)}`
    ].filter(Boolean).join('&');

    if (params.length > 0) {
        query += params;
    }

    return api.get<MovieProps>(query);
};

export const getStudios: (pageNumber: string, limit: string) => Promise<AxiosResponse<StudiosProps, unknown>> =
    (pageNumber: string, limit: string) => api.get<StudiosProps>(`/studio?page=${pageNumber}&limit=${limit}`)

export const getGenres: () => Promise<AxiosResponse<Genre[], unknown>> = () =>
    apiV1.get<Genre[]>(`/movie/possible-values-by-field?field=genres.name`)

export const getCountries: () => Promise<AxiosResponse<Country[], unknown>> = () =>
    apiV1.get<Country[]>(`/movie/possible-values-by-field?field=countries.name`)

export const getContentType: () => Promise<AxiosResponse<ContentType[], unknown>> = () =>
    apiV1.get<ContentType[]>(`/movie/possible-values-by-field?field=type`)

export const getSeasons: (pageNumber: string, limit: string, movieId: string) =>
    Promise<AxiosResponse<EpisodesListProps, unknown>> = (pageNumber: string, limit: string, movieId: string) =>
    apiV1.get<EpisodesListProps>(`/season?page=${pageNumber}&limit=${limit}&movieId=${movieId}`)

export const getReviews: (pageNumber: string, limit: string, movieId: string) =>
    Promise<AxiosResponse<ReviewsResponse, unknown>> = (pageNumber: string, limit: string, movieId: string) =>
    apiV1.get<ReviewsResponse>(`/review?page=${pageNumber}&&limit=${limit}&movieId=${movieId}`)
