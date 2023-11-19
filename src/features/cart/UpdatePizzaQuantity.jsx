import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { decreaseItemQuantity, increaseItemQuantity } from "./cartSlice";

function UpdatePizzaQuantity({quantity, pizzaId}) {
  const dispatch = useDispatch()
  return <div className="flex items-center gap-2">
          <Button type="round" onClick={()=>dispatch(decreaseItemQuantity(pizzaId))}>-</Button>
          <span className="text-sm font-semibold">{quantity}</span>
          <Button type="round" onClick={()=>dispatch(increaseItemQuantity(pizzaId))}>+</Button>
        </div>
}

export default UpdatePizzaQuantity
