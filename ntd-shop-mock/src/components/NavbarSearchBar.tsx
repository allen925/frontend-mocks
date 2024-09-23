import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { navSearchCategories } from '../consts';
import { useEffect, useRef, useState } from 'react';
import { NavSearchProps } from '../types/nav.types';
import usePreventDoubleClickSelect from '../hooks/usePreventDoubleClickSelect';

const NavbarSearchBar = ({ className, setIsSearchExpand, input }: NavSearchProps) => {
  const [isDropdownExpand, setIsDropdownExpand] = useState<boolean>(false);
  const [category, setCategory] = useState('All categories');
  usePreventDoubleClickSelect(['.prevent-double-click-select']);

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
    <form className={className + ' search-bar'} onClick={() => setIsSearchExpand && setIsSearchExpand(true)}>
      <div className='search'>
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        {input ?
          <input autoFocus={true} placeholder='Search'></input>
          :
          <span className='prevent-double-click-select'>
            Search
          </span>
        }
      </div>
      <div className={` dropdown-select ${isDropdownExpand ? 'active' : ''}`} ref={popupRef} onClick={(e) => {
        e.stopPropagation();
        setIsDropdownExpand((prev) => !prev);
      }}>
        <span>
          {category}
        </span>
        <FontAwesomeIcon icon={faChevronDown} className={`${isDropdownExpand ? 'rotate' : ''}`} />
        {isDropdownExpand &&
          <div className='dropdown-menu' >
            {navSearchCategories.map((item, index) => (
              <div key={index} onClick={() => setCategory(item.title)}>
                {item.title}
              </div>
            ))}
          </div>
        }
      </div>
    </form>
  );
};

export default NavbarSearchBar;
