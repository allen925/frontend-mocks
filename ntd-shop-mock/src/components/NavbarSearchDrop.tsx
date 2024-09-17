import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef, useState } from 'react';
import { NavSearchDropProps } from '../types/nav.types';
import { navSearchDropProducts, navSearchDropTopics } from '../consts';

const NavbarSearchDrop = ({ className }: NavSearchDropProps) => {

  return (
    <div className={className}>
      {navSearchDropTopics.map((topic, index) => (
        <div key={index}>
          {topic.title}
        </div>
      ))}

      {navSearchDropProducts.map((product, index) => (
        <div key={index}>
          {product.title}
        </div>
      ))}
    </div>
  );
}


export default NavbarSearchDrop;
