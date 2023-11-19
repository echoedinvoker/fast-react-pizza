import { Form, useFetcher } from "react-router-dom";
import Button from "../../ui/Button";
import { updateOrder } from "../../services/apiRestaurant";

function UpdateOrder({order}) {
  const fetcher = useFetcher()
  
  return <Form method="PATCH" className="text-right">
    <Button type="primary">Make Priority</Button>
  </Form>
}

export async function action({ request, params }) {
  const updateObj = { priority: true }
  await updateOrder(params.orderID, updateObj)

  return null
}

export default UpdateOrder

