export interface ProductType {
  index: string | number;
  name: string;
  price: number;
  quantity: number;
};

export interface SubCategoryType {
  subCatId: string | number;
  name: string;
  products: Array<ProductType>;
};

export interface CategoryType {
  catId: string | number;
  name: string;
  subcategories: Array<SubCategoryType>;
};

export interface FiltersContextType {
  searchInput: string;
  setSearchInput: (value: string) => void;
  activeCategories: Array<string | number>;
  setActiveCategories: (value: Array<string | number>) => void;
  activeSubCategories: Array<string | number>;
  setActiveSubcategories: (value: Array<string | number>) => void;
  sorting: number;
  setSorting: (value: number) => void;
};

export interface DataContextType {
  data: Array<CategoryType>;
  categories: Array<OptionType>;
  subCategories: Array<OptionType>;
  getFilteredData: (
    searchInput: string,
    activeCategories: Array<string | number>,
    activeSubcategories: Array<string | number>,
    sorting: number
  ) => Array<CategoryType>;
};

export interface OptionType {
  label: string;
  value: number | string;
};
