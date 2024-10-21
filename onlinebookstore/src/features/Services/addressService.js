import axios from 'axios'
import { store } from '../../app/store'
import { logout } from '../authSlice'
const API_URL='http://localhost:3000/api/v1/address'

// calling api for registering user

export const addUserAddress=async(addressData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.post(API_URL,addressData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.address
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// calling api for registering user

export const getAddressess=async(userId)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${API_URL}/${userId}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.address
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// changing active address

export const changeActiveAddress=async(addressData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.post(`${API_URL}/${addressData.userId}/activate/${addressData.addressId}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        });
        return response?.data?.data?.address
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}