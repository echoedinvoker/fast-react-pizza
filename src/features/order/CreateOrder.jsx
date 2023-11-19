// import { useState } from "react";
import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { clearItem, getCart, getTotalCartPrice } from "../cart/cartSlice";
import EmptyCart from "../cart/EmptyCart";
import store from "../../store";
import { formatCurrency } from "../../utils/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const formErrors = useActionData()
  const { username, status: statusAddress, position, address, error }  = useSelector(state => state.user)
  const isLoadingAddress = statusAddress === 'loading'
  const totalCartPrice = useSelector(getTotalCartPrice)
  const [withPriority, setWithPriority] = useState(false)
  const totalPrice = totalCartPrice + (withPriority ? totalCartPrice * 0.2 : 0)

  const isSubmitting = navigation.state === 'submitting'
  const cart = useSelector(getCart);

  if (!cart.length) return <EmptyCart />

  return (
    <div className="px-4 py-3">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>
      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input className="input grow" type="text" name="customer" defaultValue={username} required />
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && <p className="text-xs text-red-500 bg-red-200 p-2 rounded-md mt-1">{formErrors.phone}</p>}
          </div>
        </div>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input className="input w-full" type="text" name="address" defaultValue={address} disabled={isLoadingAddress} required />
            {statusAddress==='error' && <p className="text-xs text-red-500 bg-red-200 p-2 rounded-md mt-1">{error}</p>}
          </div>
          { !position.latitude && !position.longtitude &&
          <span className="sm:absolute sm:right-[3px] sm:top-[3px]">
            <Button type="small" onClick={() => dispatch(fetchAddress())} disabled={isLoadingAddress}>get position</Button>
          </span>}
        </div>
        <div className="mb-12 flex gap-2 items-center">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority">Want to yo give your order priority?</label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input type="hidden" name="position" value={
            position.latitude && position.longitude
              ? `${position.latitude},${position.longitude}`
              : ''
          } />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  const errors = {}

  if (!isValidPhone(data.phone))
    errors.phone = "Please give us your correct phone number. We might need it to contact you."

  if (Object.keys(errors).length > 0) return errors

  const newOrder = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === 'true'
  }
  const resOrder = await createOrder(newOrder)

  store.dispatch(clearItem())

  return redirect(`/order/${resOrder.id}`)
}

export default CreateOrder;
