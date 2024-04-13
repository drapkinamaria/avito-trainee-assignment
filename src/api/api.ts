import axios, {AxiosResponse} from 'axios'
import {token} from './token'
import {MoviePage, MovieProps} from '../types/movie-type';
import {EpisodesListProps} from "../types/episodes-types";
import {Country, Genre, ReviewsResponse} from "../types/types";

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

export const getMovies: (pageNumber: string, limit: string) => Promise<AxiosResponse<MoviePage, unknown>> =
    (pageNumber: string, limit: string) => api.get<MoviePage>(`/movie?page=${pageNumber}&limit=${limit}`);

export const getMovieById: (id: string) => Promise<AxiosResponse<MovieProps, unknown>> = (id: string) =>
    api.get(`/movie/${id}`)

export const getMoviesByName: (pageNumber: string, limit: string, name: string) =>
    Promise<AxiosResponse<MoviePage, unknown>> = (pageNumber: string, limit: string, name: string) =>
    api.get<MoviePage>(`/movie/search?page=${pageNumber}&limit=${limit}&query=${name}`)

export const getRandomMovie: () => Promise<AxiosResponse<MovieProps, unknown>> = () =>
    api.get<MovieProps>(`/movie/random`)

export const getStudios: () => Promise<AxiosResponse<unknown, unknown>> = () =>
    api.get<unknown>(`/studio`)

export const getGenres: () => Promise<AxiosResponse<Genre[], unknown>> = () =>
    apiV1.get<Genre[]>(`/movie/possible-values-by-field?field=genres.name`)

export const getCountries: () => Promise<AxiosResponse<Country[], unknown>> = () =>
    apiV1.get<Country[]>(`/movie/possible-values-by-field?field=countries.name`)

export const getSeasons: (pageNumber: string, limit: string, movieId: string) =>
    Promise<AxiosResponse<EpisodesListProps, unknown>> = (pageNumber: string, limit: string, movieId: string) =>
    apiV1.get<EpisodesListProps>(`/season?page=${pageNumber}&limit=${limit}&movieId=${movieId}`)

export const getReviews: (pageNumber: string, limit: string, movieId: string) =>
    Promise<AxiosResponse<ReviewsResponse, unknown>> = (pageNumber: string, limit: string, movieId: string) =>
    apiV1.get<ReviewsResponse>(`/review?page=${pageNumber}&&limit=${limit}&movieId=${movieId}`)
