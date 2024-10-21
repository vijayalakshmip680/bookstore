const OrderRows=({order,handleStatusChange})=>{
    return(
        <tr key={order.id}>
        <td>{order.id}</td>
        <td>{order.userID}</td>
        <td>
            {order.products.map(product => `${product.bookName} (x${product.quantity})`).join(', ')}
        </td>
        <td>₹{order.total}</td>
        <td>
            <select 
                value={order.status} 
                onChange={(e) => handleStatusChange(order, e.target.value)}
            >
                <option value="Order Placed">Order Placed</option>
                <option value="Shipped">Shipped</option>
                <option value="Delivered">Delivered</option>
            </select>
        </td>
    </tr>
    )
}
export default OrderRows