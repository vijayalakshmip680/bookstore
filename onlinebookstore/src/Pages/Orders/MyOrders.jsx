import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getMyOrder } from "../../features/Slices/orderSlice"
import './order.css'
import Order from "./Order"
import Header from '../../Components/Layout/Header'

const MyOrders = () => {

    const { user } = useSelector((state) => state.auth)
    const { orders } = useSelector((state) => state.orders)
    const [myOrder, setMyOrder] = useState([])

    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getMyOrder(user.id))
    }, [user.id])



    // const transformOrderData = (ordersdata) => {
    //     const orders = {};

    //     ordersdata?.forEach(ordersdata => {
    //         const { orderId, orderdate, bookid, bookname, authorname, quantity, imageurl, price, status } = ordersdata;

    //         if (!orders[orderId]) {
    //             // Create a new order entry if it doesn't exist
    //             orders[orderId] = {
    //                 orderId: orderId,
    //                 orderdate: orderdate,
    //                 status,
    //                 products: []
    //             };
    //         }

    //         // Add product details to the products array
    //         orders[orderId].products.push({
    //             bookid,
    //             quantity,
    //             bookname,
    //             imageurl,
    //             price,
    //             authorname
    //         });
    //     });

    //     return Object.values(orders); // Convert to an array

    // };


    // useEffect(() => {
    //     if (orders) {
    //         const transformedOrders = transformOrderData(orders);
    //         setMyOrder(transformedOrders)
    //     }
    // }, [orders])
    return (
        <>
            <Header />
            <div className="order-history">
                <h2>Order History</h2>
                {orders?.length === 0 ? (
                    <p>No orders found.</p>
                ) : (
                    orders?.map((order, index) => (
                        <div key={index} className="order-item">
                            <Order order={order} />
                        </div>
                    ))
                )}
            </div>
        </>
    )
}

export default MyOrders