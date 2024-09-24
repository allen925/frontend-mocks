import '../styles/main.scss';
import '../styles/navbar.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const NavMobilePanel = () => {
  return (
    <div className='nav-mobile'>
      <nav className='panel'>
        <FontAwesomeIcon icon={faBars} />
        <FontAwesomeIcon icon={faHeart} />
        <FontAwesomeIcon icon={faMagnifyingGlass} />
        <FontAwesomeIcon icon={faCartShopping} />
        <FontAwesomeIcon icon={faUser} />
      </nav>
    </div>
  );
}

export default NavMobilePanel;
