import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.scss';
import '../styles/carousel.scss';

interface SlideProps {
  image: string;
  title: string;
}

const originalSlides: SlideProps[] = [
  { image: "/src/assets/image0.avif", title: "Image 0" },
  // { image: "/src/assets/image1.avif", title: "Image 1" },
  // { image: "/src/assets/image2.avif", title: "Image 2" },
  // { image: "/src/assets/image3.avif", title: "Image 3" },
  // { image: "/src/assets/image4.avif", title: "Image 4" },
  { image: "/src/assets/image5.avif", title: "Image 5" },
  { image: "/src/assets/image6.avif", title: "Image 6" }
];
const slides = [originalSlides[originalSlides.length - 1], ...originalSlides, originalSlides[0]];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [transitionEnabled, setTransitionEnabled] = useState(true);

  const navigateSlides = (delta: number) => {
    let newIndex = (currentIndex + delta + slides.length) % slides.length;
    const isBufferJump = newIndex === 0 || newIndex === slides.length - 1;

    if (isBufferJump) {
      // Handle instant jump to buffer
      setTransitionEnabled(false);
      if (newIndex === 0){
        setCurrentIndex(slides.length - 1);
        newIndex = slides.length - 2;
      } else {
        setCurrentIndex(0);
        newIndex = 1;
      }
      setTimeout(() => {
        setTransitionEnabled(true); 
        setAnimating(true); 
        setCurrentIndex(newIndex);
        setTimeout(() => {
          setAnimating(false); 
        }, 300);
      }, 0); 

    } else {
      // Normal navigation with animation
      setAnimating(true); 
      setCurrentIndex(newIndex);
      setTimeout(() => {
        setAnimating(false); 
      }, 300);
    }
  };

  return (
    <div className="carousel-container">
      <div className='main-section'>
        <div className="slide-show" style={{
          transform: `translateX(-${currentIndex * (100 / slides.length)}%) `,
          width: `${100 * (slides.length)}%`,
          transition: transitionEnabled ? 'transform 0.3s ease' : 'none'
        }}>
          {slides.map((slide, index) => (
            <div style={{
              transform: `scale(${animating ? 0.85 : 1})`,
              flex: `0 0 ${100 / (slides.length)}%`
            }
            } key={index} className={`slide`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        <div className='btn--leftCenter'>
          <div className='btn--leftCenter--center'>
            <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={() => navigateSlides(-1)} />
          </div>
        </div>
        <div className='btn--rightCenter'>
          <div className='btn--rightCenter--center'>
            <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={() => navigateSlides(1)} />
          </div>
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
