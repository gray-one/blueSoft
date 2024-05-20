import { CategoryType } from "../utils/types";
import Subcategory from "./Subcategory";

function Category(props: CategoryType) {
  const { name, subcategories } = props;

  return (
    <>
      <tr>
        <td
          className="h-[80px] bg-slate-200 border border-gray-300 px-4"
          colSpan={4}
        >
          Category: {name}
        </td>
      </tr>
      {subcategories.map((subcategory) => (
        <Subcategory key={subcategory.subCatId} {...subcategory} />
      ))}
    </>
  );
}

export default Category;
