"use client";
import React from "react";
import ReactImageGallery from "react-image-gallery";

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
  
  const renderItem = (item) => {
    return (
      <div className='custom-image-container'>
        <img src={item.original} alt='' style={{ borderRadius: '10px', objectFit: 'cover' }} />
      </div>
    );
  };

  return (
    <ReactImageGallery
      items={images}
      autoPlay={true}
      slideInterval={2000}
      renderItem={renderItem}
      showNav={false}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
    />
  );
}
