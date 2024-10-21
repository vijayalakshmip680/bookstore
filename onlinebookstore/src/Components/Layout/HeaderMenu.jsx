import { useDispatch, useSelector } from 'react-redux'
import userImage from '../../assets/user.png'
import { logout } from '../../features/authSlice'
import { useNavigate } from 'react-router-dom'
import cartIcon from '../../assets/cart-icon.png'
import logoutimg from '../../assets/logout.png'
import ordersimg from '../../assets/Orders.png'


const HeaderMenu = () => {
    const dispatch = useDispatch()
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const navigate = useNavigate()
    const fnGotoCart = () => {
        navigate('/cart')
    }
    const getCartQuantity=(cart)=>{

        let sum=0
        cart?.products?.forEach(element=>
        {
            sum+=parseInt(element.quantity)
        }
        )
        return sum
    }
    return (
        <>
            {
                user && !user?.isadmin &&
                <div className='header-cart' onClick={fnGotoCart}>
                    {
                       cart && cart?.products?.length>0 && 
                        (<span className='cart-count'>{getCartQuantity(cart)}</span>)
                    }
                    <span className='cart-icon'><img src={cartIcon} alt='cart-icon' /></span>
                </div>
            }
            <div className='myaccount'>
            <span className='userimage'><img src={userImage} alt='userimage'/></span>
            <div className="logout">
                {
                    user && !user?.isadmin &&
                <p onClick={()=>navigate('/orders')}><span><img src={ordersimg} alt='logout image'/></span>Orders</p>
                }
                <p onClick={() => dispatch(logout())}><span><img src={logoutimg} alt='logout image'/></span>Logout</p>
                </div>
            </div>
        </>
    )
}
export default HeaderMenu