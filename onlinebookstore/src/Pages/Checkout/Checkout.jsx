import { useDispatch, useSelector } from "react-redux";
import './checkout.css'
import { useEffect, useState } from "react";
import CartSummary from "../Cart/CartSummary";
import Button from "../../Components/Common/Button";
import AddNewAddress from "./AddNewAddress";
import { changeDefault, getAllAddress } from "../../features/Slices/adressSlice";
import AddressCards from "./AddressCards";
import { createOrder, resetOrderStatus } from "../../features/Slices/orderSlice";
import { useNavigate } from "react-router-dom";
import { getCart, updateCartData } from "../../features/cartSlice";


const Checkout=()=>{
    const { cart } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.auth);
    const {address}=useSelector((state)=>state.address)
    const {isOrderSuccess}=useSelector((state)=>state.orders)
    const [showForm,setShowForm]=useState(true)
    const [activeAddress,setActiveAddress]=useState([])
    const [total, setTotal] = useState('')
    const dispatch=useDispatch()
    const userID = user.id;
    const navigate=useNavigate()
    
    useEffect(()=>{
        dispatch(getCart(user.id))
    },[user.id,dispatch])

      // for calculating total price
      useEffect(() => {
        const calculatePrice = cart?.products?.reduce((acc, curr) => {
            const quantity = Number(curr.quantity); // Convert to number
            const price = Number(curr.price); // Convert to number
            return acc + (price * quantity);
        }, 0);

        setTotal(calculatePrice);
    }, [cart]);

  
    useEffect(()=>{
        if(user.id)
        dispatch(getAllAddress(user.id))
    },[])

    useEffect(()=>{
        setShowForm(address?.length===0)
        const activeAddresses = address.filter(item => item.active === 1);
        if (activeAddresses.length > 0) {
            setActiveAddress(activeAddresses[0]); // Set the first active address
        } else {
            setActiveAddress([]); // No active address found
        }
    },[address])
    useEffect(() => {
        if (isOrderSuccess) {
            navigate('/success')            
        }
        return(()=>{
            dispatch(resetOrderStatus()); // Reset isSuccess to false
        })
    }, [isOrderSuccess]);

    const fnChangeActiveAddress=(addressId)=>{
       dispatch(changeDefault({addressId,userId:user.id}))
    }
    const handlePayment=()=>{
        dispatch(createOrder({userId:userID,addressId:activeAddress.id,cartId:cart.cartId}))
    }
    
    return(
        <div className="checkout-container">
        <h1 className="checkout-heading">Checkout</h1>
        <div className="checkout-summary">
            <div className="checkout-details">

                <div>
                    <p className="address-detail">Address details</p>
                    <div className="address-card-wrapper">
                    {
                        address?.map((myadd,index)=><AddressCards key={index} myadd={myadd} fnChangeActiveAddress={fnChangeActiveAddress}/>)
                    }
                    </div>
                </div>
                <Button value="Add New Address" type="button" className="btn-add-address" onClick={()=>setShowForm(true)}/>
                <div className="address-form">
                    {
                        showForm && <AddNewAddress setShowForm={setShowForm}/>
                    }
                </div>

            </div>
            <div className="checkout-summarywrapper">
            {
                total && <CartSummary total={total}/>
            }
            <Button value="Pay" className="btn-payment" onClick={handlePayment}/>
            </div>
        </div>
            {/* {
                showSuccess && <OrderSuccess showSuccess={showSuccess} setShowSuccess={setShowSuccess}/>
            } */}
    </div>

    )
}
export default Checkout