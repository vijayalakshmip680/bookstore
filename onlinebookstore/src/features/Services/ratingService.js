import axios from 'axios'
import { store } from '../../app/store'
import { logout } from '../authSlice'
const API_URL='http://localhost:3000/api/v1/review'



// calling api for add review

export const addUserReviews=async(reviewData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.post(API_URL,reviewData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.review
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}