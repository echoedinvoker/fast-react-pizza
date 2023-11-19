import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTotalCartPrice, getTotalCartQuantity } from "./cartSlice";
import { formatCurrency } from '../../utils/helpers'

function CartOverview() {
  const totalCartQuantity = useSelector(getTotalCartQuantity)
  const totalCartPrice = useSelector(getTotalCartPrice)

  if (!totalCartQuantity) return null

  return (
    <div className="flex text-center justify-between p-4 bg-stone-900 text-stone-300 text-sm 
      uppercase sm:px-6 md:text-base">
      <p className="space-x-4 text-stone-400 font-semibold md:space-x-6">
        <span>{totalCartQuantity} pizzas</span>
        <span>{formatCurrency(totalCartPrice)}</span>
      </p>
      <Link to="/cart"> Open cart &rarr; </Link>
    </div>
  );
}

export default CartOverview;

