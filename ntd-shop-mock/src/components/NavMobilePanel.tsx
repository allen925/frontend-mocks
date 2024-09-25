import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faCartShopping, faHeart, faUser, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

const NavMobilePanel = () => {
  return (
    <div className='nav-mobile'>
      <nav className='panel'>
        <a href="">
          <FontAwesomeIcon icon={faBars} className='icon'/>
        </a>
        <a href="">
          <FontAwesomeIcon icon={faHeart} className='icon' />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faMagnifyingGlass} className={'icon big-icon'}/>
        </a>
        <a href="">
          <FontAwesomeIcon icon={faCartShopping} className='icon' />
        </a>
        <a href="">
          <FontAwesomeIcon icon={faUser} className='icon' />
        </a>
      </nav>
    </div>
  );
}

export default NavMobilePanel;
