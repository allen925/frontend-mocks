export interface NavSearchProps {
  className: string;
  setIsSearchExpand: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface NavSearchDropProps {
  className: string;
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
