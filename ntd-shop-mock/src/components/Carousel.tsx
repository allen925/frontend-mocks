import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.scss';
import '../styles/carousel.scss';

interface SlideProps {
  image: string;
  title: string;
}

const slides: SlideProps[] = [
  { image: "/src/assets/image0.avif", title: "Image 0" },
  { image: "/src/assets/image1.avif", title: "Image 1" },
  { image: "/src/assets/image2.avif", title: "Image 2" },
  { image: "/src/assets/image3.avif", title: "Image 3" },
  { image: "/src/assets/image4.avif", title: "Image 4" },
  { image: "/src/assets/image5.avif", title: "Image 5" },
  { image: "/src/assets/image6.avif", title: "Image 6" }
];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex(prevIndex => prevIndex === slides.length - 1 ? 0 : prevIndex + 1);
  };

  const goToPrev = () => {
    setCurrentIndex(prevIndex => prevIndex === 0 ? slides.length - 1 : prevIndex - 1);
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="carousel-container">
      <div className='main-section'>
        <div className="slide-show">
          {slides.map((slide, index) => (
            <div key={index} className={`slide ${index === currentIndex ? 'active' : ''}`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        <div className='btn'>
          <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={goToPrev} />
          <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={goToNext} />
        </div>
      </div>
      {/* <div className="thumbnails">
        {slides.map((slide, index) => (
          <img key={index} className={`thumbnail ${index === currentIndex ? 'active' : ''}`} src={slide.image} alt={slide.title} onClick={() => goToSlide(index)} />
        ))}
        <div>
          <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={goToPrev} />
          <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={goToNext} />
        </div>
      </div> */}
    </div>
  );
};

export default Carousel;
