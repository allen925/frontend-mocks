import { NavSearchDropProps } from '../types/nav.types';
import { navSearchDropProducts, navSearchDropTopics } from '../consts';
import Card from './Card';
import { useEffect, useRef } from 'react';
import useResponsiveMode from '../hooks/useResponsiveMode';

const NavbarSearchDrop = ({ className, isSearchExpand, onAnimationEnd }: NavSearchDropProps) => {
  const widthMode = useResponsiveMode();
  const containerRef = useRef<HTMLDivElement>(null);
  const trendRef = useRef<HTMLDivElement>(null);
  const productsRef = useRef<HTMLDivElement>(null);
  const trendHeightRef = useRef<number>(0);
  const productsHeightRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    const trend = trendRef.current;
    const products = productsRef.current;

    if (!container || !trend || !products) return;

    trendHeightRef.current = trend.getBoundingClientRect().height;
    productsHeightRef.current = products.getBoundingClientRect().height;
  }, []);


  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Toggle 'expanded' class based on isSearchExpand
    container.classList.toggle('expanded', widthMode === 0);


    // Trigger reflow to ensure transition
    void container.offsetHeight;

    // Set the appropriate height
    if (isSearchExpand) {
      // Opening: Set height to content height
      const trendHeight = trendHeightRef.current;
      const productsHeight = productsHeightRef.current;
      let endHeight = '';
      switch (widthMode) {
        case 0:
          endHeight = `calc(${Math.max(trendHeight, productsHeight)}px + 3rem)`;
          break;
        case 1:
          endHeight = `calc(${trendHeight + productsHeight}px + 5.5rem)`;
          break;
        case 2:
          endHeight = 'calc(100vh - 53px)';
      }
      container.style.height = endHeight;
    } else {
      // Closing: Set height to 0
      container.style.height = '0';
    }

    // Listen for transition end
    const handleTransitionEnd = () => {
      if (!isSearchExpand) {
        onAnimationEnd();
      }
    };

    container.addEventListener('transitionend', handleTransitionEnd);

    // Cleanup
    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [isSearchExpand, widthMode, onAnimationEnd]);


  return (
    <div className={`${className} ${widthMode == 0 ? 'expanded' : ''}`} ref={containerRef}>
      <div className='trend' ref={trendRef}>
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

      <div className='products' ref={productsRef}>
        <span>
          Top store products
        </span>
        <div className='cards'>
          {navSearchDropProducts.map((product, index) => (
            <Card product={product} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}


export default NavbarSearchDrop;
