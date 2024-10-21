import { Link } from "react-router-dom"
import Button from "../../Components/Common/Button"

const CartItems = ({cartitem,cartProps}) => {
    const {
        addQuantity,
        decreaseQuantity,
        removeItem
    }=cartProps

    console.log(cartitem,'hh')
    return (
        <div className="cart-items">

            <div className="cart-item">
                <img src={cartitem.imageurl} alt={cartitem.bookname} className="cart-item-image" />
                <div className="cart-item-details">
                    <Link to={`/books/${cartitem.bookid}`}>
                    <h4 className="cart-item-title">{cartitem.bookname}</h4>
                    </Link>
                    <p className="cart-item-author">{cartitem.authorname}</p>
                    <h5 className="cart-item-price">₹ {cartitem.price}</h5>
                    <div className="quantity-selector">
                        <Button type="button" value="-" onClick={()=>decreaseQuantity(cartitem.bookid)}/>
                        <span>{cartitem.quantity}</span>
                        <Button type="button" value="+" onClick={()=>addQuantity(cartitem.bookid)}/>
                    </div>
                    <Button type="button" className="remove-item" value="Remove" onClick={()=>removeItem(cartitem.bookid)}/>
                </div>
            </div>
            
        </div>
    )
}
export default CartItems