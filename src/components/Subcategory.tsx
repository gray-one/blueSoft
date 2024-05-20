import { SubCategoryType } from "../utils/types";
import Product from "./Product";

function Subcategory(props: SubCategoryType) {
  const { name, products } = props;

  return (
    <>
      <>
        <tr>
          <td
            colSpan={4}
            className="h-[60px] bg-slate-100 border border-gray-300 px-4"
          >
            {name}
          </td>
        </tr>
        {products.map((product) => (
          <Product key={product.index} {...product} />
        ))}
      </>
    </>
  );
}
export default Subcategory;
