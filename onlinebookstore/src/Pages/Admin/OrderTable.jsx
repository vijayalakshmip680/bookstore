import { useEffect } from "react"
import OrderRows from "./OrderRows"

const OrderTable=({orders,handleStatusChange})=>{

    useEffect(()=>{
        console.log(orders,'orders')
    },[])
    return(
        <table className="orders-table">
        <thead>
            <tr>
                <th>Order ID</th>
                <th>User ID</th>
                <th>Products</th>
                <th>Total Amount</th>
                <th>Order Status</th>
            </tr>
        </thead>
        <tbody>
            {orders.map((order,index) => (
              <OrderRows key={index} order={order} handleStatusChange={handleStatusChange}/>
            ))}
        </tbody>
    </table>
    )
}
export default OrderTable