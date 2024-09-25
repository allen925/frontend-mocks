import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping, faCircleQuestion, faHeart, faUser } from '@fortawesome/free-solid-svg-icons';
import USA from "/src/assets/USAIcon.webp";
import NavbarSearchBar from './NavbarSearchBar';
import { useEffect, useState } from 'react';
import NavbarSearchDrop from './NavbarSearchDrop';
import useEscapeKey from '../hooks/useEscapeKey';
import useResponsiveMode from '../hooks/useResponsiveMode';
import NavMobilePanel from './NavMobilePanel';

const Navbar = () => {
  // if search drop happen or not
  const [isSearchExpand, setIsSearchExpand] = useState(false);
  // wait for animating of height change done then switch
  const [isAnimating, setIsAnimating] = useState(false);
  const [isCloseIconVisible, setIsCloseIconVisible] = useState(false);

  const handleClose = () => {
    setIsSearchExpand(false);
    setIsAnimating(true);
  };

  const handleAnimationEnd = () => {
    setIsAnimating(false);
  };

  useEscapeKey(() => {
    if (isSearchExpand || isAnimating) {
      handleClose();
    }
  });

  useEffect(() => {
    setIsCloseIconVisible(isSearchExpand);
  }, [isSearchExpand]);

  const widthMode = useResponsiveMode();

  return (
    <nav>
      {!(isSearchExpand) && (
        [0, 1].includes(widthMode) ?
          <div className='nav-top-container'>
            <a href="/" className='home'>
              <img src='/src/assets/nav-ntd.svg' alt='ntd icon' width='69' />
            </a>
            <NavbarSearchBar className={"content"} setIsSearchExpand={setIsSearchExpand} />
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
          :
          <NavMobilePanel />
      )}
      {/* <div className='nav-mid-container'>
      </div> */}

      {/* clicked searching element */}
      {(isSearchExpand || isAnimating) && (
        <div style={{ position: 'absolute', width: '100%', top: '0', left: '0', }}>
          <div className='nav-top-container'>
            <a href="/" className='home'>
              <img src='/src/assets/nav-ntd.svg' alt='ntd icon' width='69' />
            </a>
            <NavbarSearchBar className={"content"} input={true} />

            <img src='/src/assets/close.svg' alt='close icon' width='24' className={`close ${isCloseIconVisible ? 'visible' : ''}`}
              onClick={handleClose} />
          </div>
          <NavbarSearchDrop className={"nav-search-drop-container"}
            isSearchExpand={isSearchExpand}
            onAnimationEnd={handleAnimationEnd} />
        </div>
      )}
    </nav>
  );
};

export default Navbar;
