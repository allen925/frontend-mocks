export interface SlideProps {
  image: string;
  title: string;
}

export interface CarouselThumbnailsProps {
  thumbnailGap: number;
  setThumbnailGap: React.Dispatch<React.SetStateAction<number>>;
  doJump: (newIndex: number) => void;
  thumbnailFlexEnd: boolean;
  setThumbnailFlexEnd: React.Dispatch<React.SetStateAction<boolean>>;
  thumbnailWidth: number;
  setThumbnailWidth: React.Dispatch<React.SetStateAction<number>>;
  originalSlides: SlideProps[];
  currentIndex: number;
  refs: React.MutableRefObject<(HTMLDivElement | null)[]>;
}


export interface NavSearch {
  className: string;
  setIsSearchExpand: React.Dispatch<React.SetStateAction<boolean>>;
}
