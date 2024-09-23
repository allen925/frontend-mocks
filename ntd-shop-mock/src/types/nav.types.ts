export interface NavSearchProps {
  className: string;
  setIsSearchExpand?: React.Dispatch<React.SetStateAction<boolean>>;
  input?: boolean; 
}

export interface NavSearchDropProps {
  className: string;
  isSearchExpand?: boolean;
  onAnimationEnd: () => void;
}

export interface CardProps {
  product: NavSearchDropProduct;
}

export interface NavSearchCategories {
  title: string;
}

export interface NavSearchDropTopic {
  title: string;
  link: string;
}

export interface NavSearchDropProduct {
  title: string;
  type: string;
  link: string;
  image: string;
}
