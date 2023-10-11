import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Box } from '@mui/material';

type ImageSliderPropsType = {
  images: string[];
};

const ImageSlider: React.FC<ImageSliderPropsType> = ({ images }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return !images.length ? null : (
    <Slider {...settings}>
      {images.map((image, index) => (
        <Box key={index}>
          <img
            src={image}
            alt="products"
            style={{
              maxWidth: '100%',
              objectFit: 'cover',
              width: '100%', // Ensure the image takes up the full width
              maxHeight: '700px', // Maintain the image's aspect ratio
              display: 'block', // Prevent any default inline layout
            }}
          />
        </Box>
      ))}
    </Slider>
  );
};

export default ImageSlider;
