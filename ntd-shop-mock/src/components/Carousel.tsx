import { useState } from 'react';
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
  { image: "/src/assets/image1.avif", title: "Image 1" },
  { image: "/src/assets/image2.avif", title: "Image 2" },
  { image: "/src/assets/image3.avif", title: "Image 3" },
  { image: "/src/assets/image4.avif", title: "Image 4" },
  { image: "/src/assets/image5.avif", title: "Image 5" },
  { image: "/src/assets/image6.avif", title: "Image 6" }
];
const slides = [originalSlides[originalSlides.length - 1], ...originalSlides, originalSlides[0]];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [enlarge, setEnlarge] = useState(true);
  const [shiftWithAnim, setShiftWithAmin] = useState(true);

  //////// PC icon "<" ">" navigate /////////
  const computerNavigateSlides = (delta: number) => {
    let newIndex = (currentIndex + delta + slides.length) % slides.length;
    const isBufferJump = newIndex === 0 || newIndex === slides.length - 1;

    if (isBufferJump) {
      // Handle instant jump to clone
      setShiftWithAmin(false);

      if (newIndex === 0) {
        setCurrentIndex(slides.length - 1);
        newIndex = slides.length - 2;
      } else {
        setCurrentIndex(0);
        newIndex = 1;
      }

      setTimeout(() => {
        setShiftWithAmin(true);
        doJump(newIndex);
      }, 0);
    } else {
      doJump(newIndex);
    }
  };

  //////// Mobile ////////
  const [startX, setStartX] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState<number>(-100 / slides.length);

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX !== null) {
      const touchX = e.touches[0].clientX;
      const movePercentage = (touchX - startX) / window.innerWidth * 100 / 5; 
      setCurrentTranslate(-(currentIndex * (100 / slides.length)) + movePercentage);
    }
  };

  const handleTouchEnd = () => {
    if (currentTranslate !== -(100 * currentIndex) / slides.length) {
      let newIndex = calcIndex(currentTranslate, slides.length)
      if (newIndex !== currentIndex) {
        doJump(newIndex)
        setCurrentTranslate(-((newIndex) * (100 / slides.length)));

        if (newIndex === 0 || newIndex === slides.length - 1) {
          // wait for translateX 300ms
          setTimeout(() => {
            // start switching without notice
            setShiftWithAmin(false);

            newIndex = newIndex === 0 ? slides.length - 2 : 1
            setCurrentTranslate(-((newIndex) * (100 / slides.length)));
            setCurrentIndex(newIndex);
            setTimeout(() => {
              setShiftWithAmin(true);
            }, 30);
          }, 300);
        }
      } else {
        setCurrentTranslate(-(currentIndex * (100 / slides.length)));
      }
    }
  };

  ////// helpers ///////
  const doJump = (newIndex: number) => {
    setEnlarge(false);
    setCurrentIndex(newIndex);
    setCurrentTranslate(-((newIndex) * (100 / slides.length)));
    setTimeout(() => {
      setEnlarge(true);
    }, 300);
  }

  function calcIndex(value: number, numSlides: number): number {
    const normalizedValue = value / 100 - 1 / (2 * numSlides);
    const index = Math.floor(Math.abs(normalizedValue * numSlides));
    return index;
  }

  const isTouchDevice = (() => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch {
      return false;
    }
  })();

  const slideShowStyle = isTouchDevice
    ? { transform: `translateX(${currentTranslate}%)` }
    : { transform: `translateX(-${currentIndex * (100 / slides.length)}%) ` };

  return (
    <div className="carousel-container">
      <div className='main-section'>
        <div className="slide-show"
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
          style={{
            ...slideShowStyle,
            width: `${100 * (slides.length)}%`,
            transition: shiftWithAnim ? 'transform 0.3s ease' : 'none'
          }}>
          {slides.map((slide, index) => (
            <div style={{
              transform: `scale(${enlarge && index == currentIndex ? 1 : .85})`,
              flex: `0 0 ${100 / (slides.length)}%`
            }} key={index} className={`slide`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        {isTouchDevice ? '' :
          <>
            <div className='btn--leftCenter'>
              <div className='btn--leftCenter--center'>
                <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={() => computerNavigateSlides(-1)} />
              </div>
            </div>
            <div className='btn--rightCenter'>
              <div className='btn--rightCenter--center'>
                <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={() => computerNavigateSlides(1)} />
              </div>
            </div>
          </>
        }
      </div>
      <div className="thumbnails">
        {originalSlides.map((slide, index) => (
          <img style={{
            // maxWidth: `calc((100% / 7) - 2rem)` // This accounts for 1rem margin on each side
          }} key={index} className={`thumbnail ${index + 1 === currentIndex ? 'active' : ''}`} src={slide.image} alt={slide.title} onClick={() => doJump(index + 1)} />
        ))}
        <div className='btn--leftCenter'>
          <div className='btn--leftCenter--center'>
            <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={() => computerNavigateSlides(-1)} />
          </div>
        </div>
        <div className='btn--rightCenter'>
          <div className='btn--rightCenter--center'>
            <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={() => computerNavigateSlides(1)} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Carousel;
