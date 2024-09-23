// useResponsiveMode.ts
import { useState, useEffect } from 'react';

const useResponsiveMode = () => {

  const [widthMode, setWidthMode] = useState<number>(() => {
    const width = window.innerWidth;
    
    // 0 ~ 1023 : 2
    // 1024 ~ 1439 : 1
    // > 1440 : 0
    if (width > 1440) return 0;
    if (width < 1024) return 2;
    return 1;
  });

  useEffect(() => {

    let timeoutId: number;

    const handleResize = () => {
      clearTimeout(timeoutId);
      // timeout makes resize changing really not fluent, so comment out
      // timeoutId = window.setTimeout(() => {
        const width = window.innerWidth;
        let newWidthMode: number;
        if (width > 1440) newWidthMode = 0;
        else if (width < 1024) newWidthMode = 2;
        else newWidthMode = 1;

        setWidthMode((prevMode) => (prevMode !== newWidthMode ? newWidthMode : prevMode));
      // }, 100);
    };

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => {
      // clearTimeout(timeoutId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return widthMode;
};

export default useResponsiveMode;
