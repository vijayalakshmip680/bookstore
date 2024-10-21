import { useDispatch, useSelector } from 'react-redux';
import './cart.css';
import CartItems from './CartItems';
import { useEffect, useState } from 'react';
import { createCart, getCart, removeCart, updateCartData } from '../../features/cartSlice';
import CartSummary from './CartSummary';
import EmptyCart from './EmptyCart';
import Header from '../../Components/Layout/Header';
import Button from '../../Components/Common/Button';
import { useNavigate } from 'react-router-dom';

// import { getCart } from "../../features/cartSlice"


const UserCart = () => {
    const { cart } = useSelector((state) => state.cart)
    const { user } = useSelector((state) => state.auth)
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const [total, setTotal] = useState('')
    const userID = user.id
   
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


    const addQuantity = (itemId) => {
        const cartData={
            userId:user.id,
            bookId:itemId,
            action:'add',
            quantity:1
        }
        dispatch(updateCartData(cartData))

    };

    const decreaseQuantity = (itemId) => {
        const cartData={
            userId:user.id,
            bookId:itemId,
            action:'subtract',
            quantity:1
        }
        dispatch(updateCartData(cartData))
    };


    const removeItem = (itemId) => {
        const cartData={
            bookId:itemId,
            cartId:cart.cartId
        }
        dispatch(removeCart(cartData))      
    };

    const cartProps = {
        addQuantity,
        decreaseQuantity,
        removeItem
    }
    return (
        <>
            <Header />
            <div className="cart-container">
                        {(!cart||cart?.products?.length === 0) ? (
                            <EmptyCart />
                        ) : (
                            <>
                             <h2>Shopping Cart</h2>
                            <div className='cart-content'>
                            <div className='cart-wrapper'>
                                {
                                    cart?.products?.map((cartitem, index) => (
                                        <CartItems cartitem={cartitem} key={index} cartProps={cartProps} />
                                    ))
                                }

                            </div>
                            {cart?.products?.length > 0 && <div className='summary-wrapper-cart'>
                                {
                                    total && 
                            <CartSummary total={total} />
                                }
                            <div className='continue-shopping-wrapper'>

                            <Button className="continue-shopping" type='button' value="Proceed To Checkout" onClick={()=>navigate('/checkout')}/>
                            </div>

                            </div>
                            }
                            </div>
                            </>
                        )}
            </div>
        </>
    );
};

export default UserCart;
