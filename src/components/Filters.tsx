import Select from "react-select";
import useData from "../context/dataContext";
import useFilters from "../context/filtersContext";

function Filters() {
  const buttonClass =
    "border rounded py-1 px-3 m-1 bg-slate-100 hover:bg-slate-200 cursor-pointer";
  const buttonActiveClass = "bg-slate-200";
  const filters = useFilters();
  const data = useData();

  if (!filters || !data) {
    return null;
  }

  const { categories, subCategories } = data;
  const {
    searchInput,
    setSearchInput,
    setActiveCategories,
    setActiveSubcategories,
    sorting,
    setSorting,
  } = filters;

  return (
    <div className="sticky top-0 bg-slate-50 shadow p-4">
      <label htmlFor="search">Szukaj produktu po nazwie</label>
      <input
        type="text"
        id="search"
        value={searchInput}
        placeholder="Wpisz minimum 3 znaki"
        onChange={(e) => setSearchInput(e.currentTarget.value)}
        className="border w-full rounded h-8 p-2 mb-3"
      />

      <label htmlFor="filter-categories">Filtruj kategorię:</label>
      <Select
        id="filter-categories"
        options={categories}
        isMulti
        placeholder="Wybierz kategorię"
        className="mb-3"
        onChange={(selectedData) => {
          setActiveCategories(selectedData.map((item) => item.value));
          console.log(selectedData.map((item) => item.value));
        }}
      />
      <label htmlFor="filter-subcategories">Filtruj podaktegorię:</label>
      <Select
        id="filter-subcategories"
        options={subCategories}
        isMulti
        placeholder="Wybierz podkategorię"
        className="mb-3"
        onChange={(selectedData) => {
          setActiveSubcategories(selectedData.map((item) => item.value));
        }}
      />

      <span>
        Sortowanie po cenie:
        <button
          className={`${buttonClass} ${sorting === 0 ? buttonActiveClass : ""}`}
          onClick={() => setSorting(0)}
        >
          brak
        </button>
        <button
          className={`${buttonClass} ${sorting === 1 ? buttonActiveClass : ""}`}
          onClick={() => setSorting(1)}
        >
          rosnąco
        </button>
        <button
          className={`${buttonClass} ${
            sorting === -1 ? buttonActiveClass : ""
          }`}
          onClick={() => setSorting(-1)}
        >
          malejąco
        </button>
      </span>
    </div>
  );
}

export default Filters;
