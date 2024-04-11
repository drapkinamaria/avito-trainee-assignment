import React from 'react'
import {ImagesUrlProps} from "../types/types";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import {Link} from "react-router-dom";
import {AppRoute} from "../const";

export default function ImageCarousel({ imagesUrlId }: { imagesUrlId: ImagesUrlProps[] }): JSX.Element {
    const handleDragStart = (e: React.DragEvent<HTMLImageElement>) => e.preventDefault();

    const items = imagesUrlId.map((item, index) => (
        <Link to={`${AppRoute.Movie.replace(':id', item.id.toString())}`}>
            <img
                src={item.imageUrl}
                alt={`Slide ${index}`}
                key={item.id}
                className="carouselItem img-fluid img-thumbnail d-flex justify-content-center"
                style={{ maxHeight: '70vh', maxWidth: '100%' }}
                onDragStart={handleDragStart}
            />
        </Link>
    ));

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            className="d-flex justify-content-center"
        />
    );
}
