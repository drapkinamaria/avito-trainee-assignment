import {Poster} from './movie-type';

export type ImagesUrlProps = {
    imagesUrl: Poster[]
}

export type PaginationProps = {
    totalPages: number;
    currentPage: number;
    onPageChange: (pageNumber: number) => void;
}
