import React, { useState } from 'react';
import '../styles/HeartIcon.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { HeartIconProps } from '../types/heartIcon.types';

const HeartIcon = ({ containerSize, heartSize, beamSize, translateYFrom = '-100%', translateYTo = '-150%', scaleY = '.5' }: HeartIconProps) => {
  const [animate, setAnimate] = useState(false);
  const style = { "--translate-y-from": `${translateYFrom}`, "--translate-y-to": `${translateYTo}`,  "--scale-y": `${scaleY}`} as React.CSSProperties;

  return (
    <div className="heart-container" style={{ width: `${containerSize}px`, height: `${containerSize}px` }} onMouseEnter={() => setAnimate(true)} >
      <FontAwesomeIcon icon={faHeart} className='heart' style={{ width: `${heartSize}px`, height: `${heartSize}px` }} />
      <div className="beams">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx}
            className={`beam ${animate ? 'animate' : ''}`}
            style={{
              ...style,
              width: `${beamSize}px`,
              left: `calc(50% - ${parseInt(beamSize!) / 2}px)`,
            }} onAnimationEnd={() => setAnimate(false)}></div>
        ))}
      </div>
    </div>
  );
};

export default HeartIcon;
