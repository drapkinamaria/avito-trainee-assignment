import {AuthorizationStatus} from '../const';

export type ImagesUrlProps = {
    imageUrl: string,
    id: number,
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

export type Review = {
    id: number;
    movieId: number;
    title: string;
    type: string;
    review: string;
    date: string;
    author: string;
    userRating: number;
    authorId: number;
    createdAt: string;
    updatedAt: string;
    reviewLikes?: number;
    reviewDislikes?: number;
};

export type ReviewsResponse = {
    docs: Review[];
    total: number;
    limit: number;
    page: number;
    pages: number;
};

export type Genre = {
    name: string,
    slug: string
}

export type Country = {
    name: string,
    slug: string
}

export type RandomMovieButtonProps = {
    onClick: () => void;
    isLoading: boolean;
}
