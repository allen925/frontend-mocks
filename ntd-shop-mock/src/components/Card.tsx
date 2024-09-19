import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { CardProps } from '../types/nav.types';
import { navSearchDropProducts, navSearchDropTopics } from '../consts';

const Card = ({ product }: CardProps) => {

  return (
    <div className='card'>
      {product.title}
    </div>
  );
}


export default Card;
