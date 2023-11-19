import { formatCurrency } from "../../utils/helpers";
import Button from "../../ui/Button"
import { useDispatch, useSelector } from "react-redux";
import { addItem, getCurrentQuantityById } from "../cart/cartSlice";
import DeletePizza from "../cart/DeletePizza";
import UpdatePizzaQuantity from "../cart/UpdatePizzaQuantity";

function MenuItem({ pizza }) {
  const dispatch = useDispatch()
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const currentQuantity = useSelector(getCurrentQuantityById(id))
  const isInCart = currentQuantity > 0

  function handleAddtoCart() {
    dispatch(addItem({
      name,
      pizzaId: id,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1
    }))
  }

  return (
    <li className="flex gap-4 py-2">
      <img className={`h-24 ${soldOut ? 'grayscale opacity-70' : ''}`} src={imageUrl} alt={name} />
      <div className="flex flex-col grow pt-2">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">{ingredients.join(', ')}</p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut
            ? <p className="text-sm">{formatCurrency(unitPrice)}</p>
            : <p className="text-sm uppercase text-stone-500">Sold out</p>
          }

          {isInCart && <div className="flex items-center gap-3 sm:gap-8">
            <UpdatePizzaQuantity quantity={currentQuantity} pizzaId={id} />
            <DeletePizza pizzaId={id} />
          </div>}
          {!soldOut && !isInCart && <Button type="small" onClick={handleAddtoCart} >Add to cart</Button>}

        </div>
      </div>
    </li>
  );
}

export default MenuItem;
