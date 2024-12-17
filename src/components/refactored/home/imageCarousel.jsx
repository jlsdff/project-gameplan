import { Image } from "@nextui-org/react";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ImageCarousel() {
  const images = [
    {
      original: "./carousel-1.jpg"
    },
    {
      original: "./carousel-2.jpg"
    },
    {
      original: "./carousel-3.jpg"
    },
    {
      original: "./carousel-4.jpg"
    },
    {
      original: "./carousel-5.png"
    },
    {
      original: "./carousel-6.jpg"
    }
  ];

  return (
    <Carousel showThumbs={false} autoPlay interval={5000} infiniteLoop >
      {images.map((image, index) => (
        <div key={index}>
          <Image src={image.original} alt={`poster-${index}`} />
        </div>
      ))}
    </Carousel>
  );
}