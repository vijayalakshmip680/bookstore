import axios from 'axios'
import { store } from '../../app/store'
import { logout } from '../authSlice'
const API_URL='http://localhost:3000/api/v1/orders'
const ADMIN_API_URL='http://localhost:3000/api/v1/admin'


// calling api for create  user order

export const createUserOrder=async(orderData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.post(API_URL,orderData,{
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


export const getUserOrders=async(userId)=>{
    try{ 
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${API_URL}/${userId}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.orders
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}
// get all order for admin
export const getOrders=async()=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${ADMIN_API_URL}/orders`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.orders
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}


// update order status
export const changeOrderStatus=async(orderData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.put(`${ADMIN_API_URL}/orders/update-status`,orderData,
            {
                headers: {
                    'Content-Type':'application/json',
                    'authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data.data
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }

}