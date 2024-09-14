import { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import '../styles/main.scss';
import '../styles/carousel.scss';
import CarouselThumbnails from './CarouselThumbnails';
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
const isMultiImage = originalSlides.length > 1;
const slides = isMultiImage ? [originalSlides[originalSlides.length - 1], ...originalSlides, originalSlides[0]] : originalSlides;

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(isMultiImage ? 1 : 0);
  const [enlargeAnim, setEnlargeAnim] = useState(true);
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

    // jumping thumbnail
    jumpThumbnail(newIndex)
  };

  //////// Mobile ////////
  const [startX, setStartX] = useState<number | null>(null);
  const [currentTranslate, setCurrentTranslate] = useState<number>(isMultiImage ? -100 / slides.length : 0);

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

        // jumping thumbnail
        jumpThumbnail(newIndex);

        if (newIndex === 0 || newIndex === slides.length - 1) {
          // wait for translateX 300ms
          setTimeout(() => {
            // start switching without notice
            setShiftWithAmin(false);

            newIndex = newIndex === 0 ? slides.length - 2 : 1
            setCurrentTranslate(-((newIndex) * (100 / slides.length)));
            setCurrentIndex(newIndex);

            // jumping thumbnail
            jumpThumbnail(newIndex);

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
    setEnlargeAnim(false);
    setCurrentIndex(newIndex);
    setCurrentTranslate(-((newIndex) * (100 / slides.length)));
    setTimeout(() => {
      setEnlargeAnim(true);
    }, 300);
  }

  function calcIndex(value: number, numSlides: number): number {
    const normalizedValue = value / 100 - 1 / (2 * numSlides);
    const index = Math.floor(Math.abs(normalizedValue * numSlides));
    return index;
  }

  function jumpThumbnail(newIndex: number): void {
    const element = refs.current[newIndex - 1];
    if (element) {
      const clickImageX = element.getBoundingClientRect().left + 0.5 * thumbnailWidth * 16;
      const clickedFirstMiddle = clickImageX / window.innerWidth;
      // Backward, so 1 -
      const clickedFirstMiddleFromEnd = 1 - clickImageX / window.innerWidth;
      const threshold = 0.65
      if (!thumbnailFlexEnd && clickedFirstMiddle > threshold) {
        setThumbnailFlexEnd(true)
      } else if (thumbnailFlexEnd && clickedFirstMiddleFromEnd > threshold) {
        setThumbnailFlexEnd(false)
      }
    }
  }

  const isTouchDevice = (() => {
    try {
      document.createEvent('TouchEvent');
      return true;
    } catch {
      return false;
    }
  })();

  //////// thumbnail init /////////
  const [thumbnailWidth, setThumbnailWidth] = useState(11);
  const [thumbnailGap, setThumbnailGap] = useState(3);
  const [thumbnailFlexEnd, setThumbnailFlexEnd] = useState<boolean>(false);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    refs.current = refs.current.slice(0, originalSlides.length);
  }, []);

  return (
    <div className="carousel-container">
      <div className='main-section'>
        <div className="slide-show"
          // mobile jumping
          onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd}
          style={{
            ...isTouchDevice ? { transform: `translateX(${currentTranslate}%)` } : { transform: `translateX(-${currentIndex * (100 / slides.length)}%)` },
            width: `${100 * (slides.length)}%`,
            transition: shiftWithAnim ? 'transform 0.3s ease' : 'none'
          }}>
          {slides.map((slide, index) => (
            <div style={{
              transform: `scale(${enlargeAnim && index == currentIndex ? 1 : .85})`,
              flex: `0 0 ${100 / (slides.length)}%`
            }}
              key={index} className={`slide`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        {isMultiImage && !isTouchDevice &&
          <>
            <div className='btn--left'>
              <FontAwesomeIcon icon={faChevronLeft} className="icon" onClick={() => computerNavigateSlides(-1)} />
            </div>
            <div className='btn--right'>
              <FontAwesomeIcon icon={faChevronRight} className="icon" onClick={() => computerNavigateSlides(1)} />
            </div>
          </>
        }
      </div>
      {isMultiImage &&
        <CarouselThumbnails thumbnailGap={thumbnailGap} setThumbnailGap={setThumbnailGap} doJump={doJump} thumbnailFlexEnd={thumbnailFlexEnd} setThumbnailFlexEnd={setThumbnailFlexEnd} thumbnailWidth={thumbnailWidth} setThumbnailWidth={setThumbnailWidth} originalSlides={originalSlides} currentIndex={currentIndex} refs={refs} />
      }
    </div>
  );
};

export default Carousel;