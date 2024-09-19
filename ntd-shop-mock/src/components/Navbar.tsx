import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleQuestion, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import USA from "/src/assets/USAIcon.webp";
import NavbarSearchBar from './NavbarSearchBar';
import { useState } from 'react';
import NavbarSearchDrop from './NavbarSearchDrop';
import HeartIcon from './HeartIcon';

const Navbar = () => {
  const [isSearchExpand, setIsSearchExpand] = useState<boolean>(false);

  return (
    <nav className='nav'>
      {/* <div className='nav-top-container'>
        <a href="/" className='home'>
          <img src='/src/assets/nav-ntd.svg' alt='ntd icon' width='69' />
        </a>
        <NavbarSearchBar className={"content"} setIsSearchExpand={setIsSearchExpand}/>
        <div className='content nav-items'>
          <a href="">
            <FontAwesomeIcon icon={faCircleQuestion} />
            <span>
              Support
            </span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faHeart} />
            <span>
              Wish List
            </span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faCartShopping} />
            <span>
              Cart
            </span>
          </a>
          <a href="">
            <FontAwesomeIcon icon={faUser} />
            <span>
              Log in / Sign Up
            </span>
          </a>
        </div>
        <div className='content'>
          <a href="https://www.nintendo.com/us/store/products/stardew-valley-switch/">
            <img src={USA} className='icon' />
          </a>
        </div>
      </div>
      <div className='nav-mid-container'>
      </div> */}
      <NavbarSearchDrop className={"nav-search-drop-container"} />
    </nav>
  );
};

export default Navbar;
