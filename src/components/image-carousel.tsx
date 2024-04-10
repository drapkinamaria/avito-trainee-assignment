import React from 'react'
import {ImagesUrlProps} from "../types/types";
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

export default function ImageCarousel({imagesUrl} : ImagesUrlProps): JSX.Element {

    function handleDragStart(e: React.DragEvent<HTMLImageElement>) {
        e.preventDefault()
    }

    const items = imagesUrl.map((url, index) => (
        <img
            src={url.url}
            alt={`Slide ${index}`}
            key={index}
            className="carouselItem"
            onDragStart={handleDragStart}
        />
    ));

    return (
        <AliceCarousel
            mouseTracking
            items={items}
            infinite
            autoPlay
            autoPlayInterval={2000}
        />
    );
}
