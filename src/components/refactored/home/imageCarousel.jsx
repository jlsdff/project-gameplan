import { Image } from "@nextui-org/react";
import React from "react";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

export default function ImageCarousel() {
  const images = [
    {
      original:
        "https://firebasestorage.googleapis.com/v0/b/the-project-gameplan.appspot.com/o/images%2Fposter_1.png?alt=media&token=a40b5901-b794-4a42-ad3a-46e17b4bcc11",
    },
    {
      original:
        "https://firebasestorage.googleapis.com/v0/b/the-project-gameplan.appspot.com/o/images%2Fposter_2.png?alt=media&token=974c8c8b-aa61-4931-9a93-7773072415cb",
    },
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