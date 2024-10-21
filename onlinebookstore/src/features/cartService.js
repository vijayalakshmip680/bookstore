import axios from 'axios'
import { store } from '../app/store'
import { logout } from './authSlice'
const API_URL='http://localhost:3000/api/v1/cart'



export const getUserCartItem=async(userID)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${API_URL}/${userID}`,{
            headers: {
            'Content-Type':'application/json',
            'authorization': `Bearer ${token}`,
        }
        })
        return response.data.data
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }

}

export const createUserCart=async(cartData)=>{

    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.post(`${API_URL}`,cartData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
            
        })
        return response.data.data.cart
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}


export const updateUsercart=async(cartData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.put(`${API_URL}`,cartData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.cart
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

export const removeCartItem=async(cartData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.delete(`${API_URL}/${cartData.cartId}/remove/${cartData.bookId}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.cart
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}
