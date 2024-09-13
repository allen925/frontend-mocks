import { useEffect, useRef, useState } from 'react';
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

    // jumping thumbnail
    const element = refs.current[newIndex - 1];
    if (element) {
      const clickImageX = element.getBoundingClientRect().left;
      jumpThumbnail(clickImageX)
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

        // jumping thumbnail
        const element = refs.current[newIndex - 1];
        if (element) {
          const clickImageX = element.getBoundingClientRect().left;
          jumpThumbnail(clickImageX);
        }


        if (newIndex === 0 || newIndex === slides.length - 1) {
          // wait for translateX 300ms
          setTimeout(() => {
            // start switching without notice
            setShiftWithAmin(false);

            newIndex = newIndex === 0 ? slides.length - 2 : 1
            setCurrentTranslate(-((newIndex) * (100 / slides.length)));
            setCurrentIndex(newIndex);

            // jumping thumbnail
            const element = refs.current[newIndex - 1];
            if (element) {
              const clickImageX = element.getBoundingClientRect().left;
              jumpThumbnail(clickImageX);
            }

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

  function jumpThumbnail(X: number): void {
    const clickImageX = X + 0.5 * thumbnailWidth * 16;
    const clickedFirstMiddle = clickImageX / window.innerWidth;
    // Backward, so 1 -
    const clickedFirstMiddleFromEnd = 1 - clickImageX / window.innerWidth;
    const threshold = 0.65
    console.log(clickImageX)
    if (!thumbnailFlexEnd && clickedFirstMiddle > threshold) {
      setThumbnailFlexEnd(true)
    } else if (thumbnailFlexEnd && clickedFirstMiddleFromEnd > threshold) {
      setThumbnailFlexEnd(false)
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

  const slideShowStyle = isTouchDevice
    ? { transform: `translateX(${currentTranslate}%)` }
    : { transform: `translateX(-${currentIndex * (100 / slides.length)}%) ` };

  //////// thumbnail /////////
  const thumbnailWidth = 11;
  const thumbnailGap = 3;
  // rem * (Oslides num * size + gap num * size)
  const thumbnailsSize = 16 * (originalSlides.length * thumbnailWidth + (originalSlides.length - 1) * thumbnailGap);
  const [thumbnailFlexEnd, setThumbnailFlexEnd] = useState<boolean>(false);

  const moveX = thumbnailsSize - window.innerWidth;
  const thumbnailStyle = thumbnailFlexEnd
    // 100vw - thumbnails width (since moving negative direction)
    ? { transform: `translateX(${-moveX}px)` }
    : { transform: `translateX(0)` };

  const thumbnailBtnStyle = thumbnailFlexEnd
    ? { transform: `translateX(${moveX}px)` }
    : { transform: `translateX(${-moveX}px)` };

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
            ...slideShowStyle,
            width: `${100 * (slides.length)}%`,
            transition: shiftWithAnim ? 'transform 0.3s ease' : 'none'
          }}>
          {slides.map((slide, index) => (
            <div style={{
              transform: `scale(${enlarge && index == currentIndex ? 1 : .85})`,
              flex: `0 0 ${100 / (slides.length)}%`
            }}
              key={index} className={`slide`}>
              <img src={slide.image} alt={slide.title} />
            </div>
          ))}
        </div>
        {isTouchDevice ? '' :
          <>
            <div className='btn--leftCenter'>
              <div className='btn--leftCenter--center'>
                <FontAwesomeIcon icon={faChevronLeft} className="icon prev" onClick={() => {
                  computerNavigateSlides(-1);
                }} />
              </div>
            </div>
            <div className='btn--rightCenter'>
              <div className='btn--rightCenter--center'>
                <FontAwesomeIcon icon={faChevronRight} className="icon next" onClick={() => {
                  computerNavigateSlides(1)
                }} />
              </div>
            </div>
          </>
        }
      </div>
      <div className="thumbnails" style={{
        gap: `${thumbnailGap}rem`,
        width: `${thumbnailsSize}px`,
        transition: `transform 0.3s ease`,
        ...thumbnailStyle,
      }}>
        {originalSlides.map((slide, index) => (
          <div className={`thumbnail ${index + 1 === currentIndex ? 'active' : ''}`}
            ref={el => refs.current[index] = el}
          >
            <img style={{
              width: `${thumbnailWidth}rem`,
              height: `6rem`,

            }} key={index} src={slide.image} alt={slide.title} onClick={(e) => {
              if (currentIndex !== index + 1)
                doJump(index + 1);

              const clickImageX = e.currentTarget.getBoundingClientRect().left;
              jumpThumbnail(clickImageX)
            }} />

          </div>
        ))}
        {thumbnailFlexEnd ?
          <div className='btn--leftCenter'>
            <div className='btn--leftCenter--center'
              style={{
                ...thumbnailBtnStyle
              }}
            >
              <FontAwesomeIcon

                icon={faChevronLeft} className="icon prev" onClick={() => {
                  setThumbnailFlexEnd(false)
                }} />
            </div>
          </div>
          :
          <div className='btn--rightCenter'>
            <div className='btn--rightCenter--center'
              style={{
                ...thumbnailBtnStyle
              }}
            >
              <FontAwesomeIcon
                icon={faChevronRight} className="icon next" onClick={() => {
                  setThumbnailFlexEnd(true)
                }} />
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default Carousel;