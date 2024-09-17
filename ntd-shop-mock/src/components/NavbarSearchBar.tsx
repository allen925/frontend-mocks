import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { NavSearch } from '../types/carousel.types';
import { navSearchDrop } from '../consts';
import { useEffect, useRef, useState } from 'react';

const NavbarSearchBar = ({ className, setIsSearchExpand}: NavSearch) => {
  const [isDropdownExpand, setIsDropdownExpand] = useState<boolean>(false);
  const [category, setCategory] = useState('All categories');

  const popupRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsDropdownExpand(false);
      };
    }

    if (isDropdownExpand) {
      document.addEventListener('click', handleOutsideClick);
    } else {
      document.removeEventListener('click', handleOutsideClick);
    }

    // Cleanup the event listener unmounts / closes
    return () => {
      document.removeEventListener('click', handleOutsideClick);
    };
  }, [isDropdownExpand]);

  return (
    <div className={className + ' search-bar'} onClick={() => setIsSearchExpand(true)}>
      <div className='search'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <span>
          Search
        </span>
      </div>
      <div className={` dropdown-select`} ref={popupRef} onClick={() => setIsDropdownExpand(prev => !prev)}>
        <span>
          {category}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={`${isDropdownExpand ? 'rotate' : ''}`} />
        {isDropdownExpand &&
          <div className='dropdown-menu' >
            {navSearchDrop.map((item, index) => (
              <div key={index} onClick={() => setCategory(item.title)}>
                {item.title}
              </div>
            ))}
          </div>
        }
      </div>
    </div>
  );
};

export default NavbarSearchBar;
