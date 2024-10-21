import './ordersuccess.css'
import suucessIcon from './../../assets/ordersuccess.gif'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../Components/Common/Button'
import { IoCloseCircle } from 'react-icons/io5'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyOrder } from '../../features/Slices/orderSlice'
// import { updateBookQuantity } from '../../features/bookSlice'
const OrderSuccess=()=>{
    const navigate=useNavigate()
    return(
        <div className="order-success-modal">

            <div className="order-success-modal-wrapper">
                <div className="success-content">
                    <div className='image-wrapper'>
                    <img src={suucessIcon}/>
                    </div>
                    <h3>Order Placed</h3>
                    <p>Thank You For Purchasing..  <Link to='/'>Buy More</Link></p>
                    <Button value="Orders" type="button" className="btn-orders" onClick={()=>navigate('/orders')}/>
                </div>

            </div>

        </div>
    )
}

export default OrderSuccess