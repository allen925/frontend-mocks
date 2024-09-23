import { useEffect } from 'react';

const usePreventDoubleClickSelect = (selectors: string[]) => {
  useEffect(() => {
    const handleMouseDown = (event: MouseEvent) => {
      if (event.detail > 1) {
        for (const selector of selectors) {
          if ((event.target as Element).matches(selector)) {
            event.preventDefault();
            break;
          }
        }
      }
    };

    document.addEventListener('mousedown', handleMouseDown, false);

    return () => {
      document.removeEventListener('mousedown', handleMouseDown, false);
    };
  }, [selectors]);
};

export default usePreventDoubleClickSelect;
