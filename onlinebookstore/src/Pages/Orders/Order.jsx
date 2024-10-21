import { useNavigate } from 'react-router-dom'
import Button from '../../Components/Common/Button'
const Order = ({ order }) => {
    console.log(order)
    const navigate=useNavigate()
    return (
        <div className="order-details">
            <h2>Order Details</h2>
            <p><strong>Order ID:</strong> {order.id}</p>
            <p><strong>Status:</strong> {order.status}</p>
            <p><strong>Order Date:</strong> {new Date(order.orderdate).toLocaleString()}</p>
            <h3>Total: ${order.total}</h3>

            <h4>Products:</h4>
            <div className="product-list">
                {order?.products?.map((product) => (
                    <div key={product.bookID} className="product-item">
                        <img src={product.imageurl} alt={product.bookName} className="product-image" />
                        <div className="product-info">
                            <p className="product-name">{product.bookName}</p>
                            <p className="product-quantity">Quantity: {product.quantity}</p>
                            <p className="product-quantity">Price: {product.price}</p>
                        </div>
                        <Button value="Add Review" className="btn-review" type="button" onClick={()=>navigate(`/review/${product.bookID}`)}/>
                        
                    </div>
                ))}
            </div>
        </div>
    )
}
export default Order