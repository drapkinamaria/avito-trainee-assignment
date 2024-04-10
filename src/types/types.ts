import {Poster} from './movie-type';
import {AuthorizationStatus} from '../const';

export type ImagesUrlProps = {
    imagesUrl: Poster[]
}

export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}

export type PrivateRouteProps = {
    authorizationStatus: AuthorizationStatus;
    children: JSX.Element;
}
