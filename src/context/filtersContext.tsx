import { createContext, useContext, useState } from "react";
import { FiltersContextType } from "../utils/types";

export const FiltersContext = createContext<FiltersContextType | null>(null);

interface FiltersProviderProps {
  children: React.ReactNode;
}

export const FiltersProvider: React.FC<FiltersProviderProps> = ({
  children,
}) => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [activeCategories, setActiveCategories] = useState<Array<string | number>>([]);
  const [activeSubCategories, setActiveSubcategories] = useState<Array<string | number>>([]);
  const [sorting, setSorting] = useState<number>(0);

  return (
    <FiltersContext.Provider
      value={{
        searchInput,
        setSearchInput,
        activeCategories,
        setActiveCategories,
        activeSubCategories,
        setActiveSubcategories,
        sorting,
        setSorting,
      }}
    >
      {children}
    </FiltersContext.Provider>
  );
};

export default function useFilters() {
  const context = useContext(FiltersContext);

  if (context === undefined) {
    throw new Error("useFilters must be used within a FiltersProvider");
  }

  return context;
}
