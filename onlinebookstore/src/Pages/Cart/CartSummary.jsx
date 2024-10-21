import { useNavigate } from "react-router-dom"
import Button from "../../Components/Common/Button"
import './summary.css'

const CartSummary=({total})=>{
 console.log(total)
    return(
        <div className="cart-summary">
        <h3>Order Details</h3>
        <div className="summary-details">
            <p><span>Subtotal:</span> <span className="summary-price">₹ {total.toFixed(2)}</span></p>
            <p><span>Shipping:</span> <span className="summary-price">₹0</span></p>
            <p><span>Discount:</span> <span className="summary-price">₹0</span></p>
            <p><span>Order Total</span> <span className="summary-price">₹ {total.toFixed(2)}</span></p>
        </div>
    </div>
    )
}
export default CartSummary