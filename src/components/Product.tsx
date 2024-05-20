import { ProductType } from "../utils/types";

function Product(props: ProductType) {
  const { index, name, price, quantity } = props;
  const cellClass = "h-[40px] border border-gray-300 px-4" ;
  return (
    <tr>
      <td title="Index" className={cellClass}>{index}</td>
      <td title="Nazwa" className={cellClass}>{name}</td>
      <td title="Cena" className={cellClass}>{price}</td>
      <td title="Ilość" className={cellClass}>{quantity}</td>
    </tr>
  )
}

export default Product
