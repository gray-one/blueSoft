import { useEffect, useState } from "react";
import Category from "../components/Category";
import Filters from "../components/Filters";
import useData from "../context/dataContext";
import useFilters from "../context/filtersContext";
import { CategoryType } from "../utils/types";

function App() {
  const dataContext = useData();
  const filtersContext = useFilters();
  const [data, setData] = useState<Array<CategoryType>>([]);

  useEffect(() => {
    if(!dataContext || !filtersContext) {
      return;
    }
    setData(
      dataContext.getFilteredData(
        filtersContext.searchInput,
        filtersContext.activeCategories,
        filtersContext.activeSubCategories,
        filtersContext.sorting
      )
    );
  }, [filtersContext, dataContext]);

  return (
    <>
      <Filters />
      <div className="p-10">
        <table className="w-full table-auto">
          <tbody>
            {data &&
              data.map((item) => <Category key={item.catId} {...item} />)}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default App;
