import { cloneDeep } from "lodash";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { testData } from "../utils/data";
import { DataContextType, OptionType } from "../utils/types";

export const DataContext = createContext<DataContextType | null>(null);

interface DataProviderProps {
  children: React.ReactNode;
}

export const DataProvider: React.FC<DataProviderProps> = ({ children }) => {
  const [categories, setCategories] = useState<Array<OptionType>>([]);
  const [subCategories, setSubcategories] = useState<Array<OptionType>>([]);

  const data = useMemo(() => testData, []);

  useEffect(() => {
    let loacalSubcategories: Array<OptionType> = [];
    const categories = data.map((category) => {
      loacalSubcategories = loacalSubcategories.concat(
        category.subcategories.map((subcategory) => ({
          value: subcategory.subCatId,
          label: `${category.name} - ${subcategory.name}`,
        }))
      );
      return { value: category.catId, label: category.name };
    });
    setCategories(categories);
    setSubcategories(loacalSubcategories);
  }, [data]);

  const getFilteredData = (
    searchInput: string,
    activeCategories: Array<string | number>,
    activeSubcategories: Array<string | number>,
    sorting: number
  ) => {
    let filteredData;
    if (
      searchInput.length < 3 &&
      activeCategories.length === 0 &&
      activeSubcategories.length === 0 &&
      sorting === 0
    ) {
      return data;
    }

    filteredData = cloneDeep(data);

    if (activeCategories.length > 0) {
      filteredData = filteredData.filter((category) => {
        return activeCategories.includes(category.catId);
      });
    }

    if (activeSubcategories.length > 0) {
      filteredData = filteredData.map((category) => {
        const subcategories = category.subcategories.filter((subcategory) => {
          return activeSubcategories.includes(subcategory.subCatId);
        });
        return { ...category, subcategories };
      });
    }

    if (searchInput.length >= 3) {
      console.log("searchInput", searchInput);
      filteredData = filteredData.map((category) => {
        const subcategories = category.subcategories.map((subcategory) => {
          const products = subcategory.products.filter((product) => {
            return product.name.includes(searchInput);
          });
          return { ...subcategory, products };
        });

        return { ...category, subcategories };
      });
    }
    console.log("change", sorting);
    if (sorting !== 0) {
      filteredData = filteredData.map((category) => {
        const subcategories = category.subcategories.map((subcategory) => {
          const products = subcategory.products.sort((a, b) => {
            if (sorting === 1) {
              return a.price - b.price;
            } else {
              return b.price - a.price;
            }
          });

          return { ...subcategory, products };
        });

        return { ...category, subcategories };
      });
    }

    return filteredData;
  };

  return (
    <DataContext.Provider
      value={{
        data,
        categories,
        subCategories,
        getFilteredData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export default function useData() {
  const context = useContext(DataContext);

  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }

  return context;
}
