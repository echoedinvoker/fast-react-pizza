import { formatCurrency } from "../../utils/helpers"
import DeletePizza from "./DeletePizza"; 
import UpdatePizzaQuantity from "./UpdatePizzaQuantity";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-semibold">{formatCurrency(totalPrice)}</p>
        <UpdatePizzaQuantity quantity={quantity} pizzaId={pizzaId}/>
        <DeletePizza pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;

