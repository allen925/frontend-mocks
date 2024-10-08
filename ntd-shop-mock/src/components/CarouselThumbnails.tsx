import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { CarouselThumbnailsProps } from '../types/carousel.types';

const CarouselThumbnails = ({ thumbnailGap, setThumbnailGap, doJump, thumbnailFlexEnd, setThumbnailFlexEnd, thumbnailWidth, setThumbnailWidth, originalSlides, currentIndex, refs }: CarouselThumbnailsProps) => {

  function jumpThumbnail(Xaxis: number): void {
    const clickImageX = Xaxis + 0.5 * thumbnailWidth * 16;
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

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth <= 768 ? (window.innerWidth <= 576 ? 5 : 8) : 11;
      setThumbnailWidth(width);
      const gap = window.innerWidth <= 768 ? (window.innerWidth <= 576 ? 1 : 2) : 3;
      setThumbnailGap(gap);
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setThumbnailGap, setThumbnailWidth]);

  // rem * (Oslides num * size + gap num * size)
  const thumbnailsSize = 16 * (originalSlides.length * thumbnailWidth + (originalSlides.length - 1) * thumbnailGap);

  const moveX = thumbnailsSize - window.innerWidth;
  const thumbnailsShift = thumbnailFlexEnd
    // 100vw - thumbnails width (since moving negative direction)
    ? { transform: `translateX(${-moveX}px)` }
    : { transform: `translateX(0)` };

  return (
    <div className="thumbnails-container">

      <div className="thumbnails" style={{
        gap: `${thumbnailGap}rem`,
        width: `${thumbnailsSize}px`,
        ...thumbnailsShift,
      }}>
        {originalSlides.map((slide, index) => (
          <div className={`thumbnail ${index + 1 === currentIndex ? 'active' : ''}`}
            ref={el => refs.current[index] = el} key={index}
          >
            <img style={{
              width: `${thumbnailWidth}rem`,
            }} src={slide.image} alt={slide.title} onClick={(e) => {
              if (currentIndex !== index + 1)
                doJump(index + 1);

              const clickImageX = e.currentTarget.getBoundingClientRect().left;
              jumpThumbnail(clickImageX)
            }} />
          </div>
        ))}
      </div>
      {thumbnailsSize > window.innerWidth && (thumbnailFlexEnd ?
        <div className='btn--left'>
          <div className='icon-wrap'>
            <FontAwesomeIcon
              icon={faChevronLeft} className="icon" onClick={() => setThumbnailFlexEnd(false)}
            />
          </div>
        </div>
        :
        <div className='btn--right'>
          <div className='icon-wrap'>
            <FontAwesomeIcon
              icon={faChevronRight} className="icon" onClick={() => setThumbnailFlexEnd(true)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
export default CarouselThumbnails;