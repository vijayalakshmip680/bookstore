
import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/authSlice'
import bookReducer from '../features/bookSlice'
import cartReducer from '../features/cartSlice'
import addressReducer from '../features/Slices/adressSlice'
import orderReducer from '../features/Slices/orderSlice'
import ratingReducer from '../features/Slices/ratingSlice'
export const store=configureStore(
    {
        reducer:{
            auth:authReducer,
            books:bookReducer,
            cart:cartReducer,
            address:addressReducer,
            orders:orderReducer,
            ratings:ratingReducer
        }
    }
)