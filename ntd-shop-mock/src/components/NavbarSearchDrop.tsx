import '../styles/main.scss';
import '../styles/navbar.scss';

import { NavSearchDropProps } from '../types/nav.types';
import { navSearchDropProducts, navSearchDropTopics } from '../consts';
import NavbarSearchBar from './NavbarSearchBar';
import Card from './Card';
import { useEffect, useState } from 'react';

const NavbarSearchDrop = ({ className }: NavSearchDropProps) => {

  return (
    <>
      <div className='nav-top-container'>
        <a href="/" className='home'>
          <img src='/src/assets/nav-ntd.svg' alt='ntd icon' width='69' />
        </a>
        <NavbarSearchBar className={"content"} input={true} />
      </div>

      <div className={className}>
        <div className='trend'>
          <span>
            Trending topics
          </span>
          {navSearchDropTopics.map((topic, index) => (
            <div key={index}>
              <a href="">
                {topic.title}
              </a>
            </div>
          ))}
        </div>

        <div className='products'>
          <span>
            Top Store Products
          </span>
          <div className='cards'>
            {navSearchDropProducts.map((product, index) => (
              <Card product={product} key={index} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}


export default NavbarSearchDrop;
