import { useNavigate } from "react-router-dom"
import Button from "../../Components/Common/Button"

const EmptyCart = () => {
    const navigate=useNavigate()
    const fnGoToShop=()=>{
        navigate('/')
    }
    return (
        <div className="empty-cart">
            <h2>Your Cart is Empty</h2>
            <p>Looks like you haven't added anything to your cart yet.</p>
            <Button className="btn-continue" value="Continue Shopping" type="button" onClick={fnGoToShop}/>
        </div>
    )
}
export default EmptyCart