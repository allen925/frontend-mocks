import React, { useState } from 'react';
import './HeartIcon.scss'; // Ensure the SCSS file is linked correctly
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { HeartIconProps } from '../types/heartIcon.types';

const HeartIcon = ({ containerSize, heartSize , beamSize}: HeartIconProps) => {
  const [animate, setAnimate] = useState(false);
  
  return (
    <div className="heart-container" style={{ width: `${containerSize}px`, height: `${containerSize}px` }} onMouseEnter={() => setAnimate(true)} >
      <FontAwesomeIcon icon={faHeart} className='heart' style={{ width: `${heartSize}px`, height: `${heartSize}px` }} />
      <div className="beams">
        {Array.from({ length: 8 }).map((_, idx) => (
          <div key={idx}
            className={`beam ${animate ? 'animate' : ''}`}
            style={{width: `${beamSize}px`, left: `calc(50% - ${parseInt(beamSize!) / 2}px)`}}
            onAnimationEnd={() => setAnimate(false)}></div>
        ))}
      </div>
    </div>
  );
};

export default HeartIcon;
