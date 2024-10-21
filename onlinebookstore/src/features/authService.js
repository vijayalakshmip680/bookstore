import axios from 'axios'
const API_URL='http://localhost:3000/api/v1/users'

// calling api for registering user

 export const register=async(userData)=>{
    const response=await axios.post(`${API_URL}/register`,userData)
    if(response?.data?.data?.user){
      const { password, ...userWithoutPassword } = response?.data?.data?.user;
        localStorage.setItem('user',JSON.stringify(userWithoutPassword))
        localStorage.setItem('token',JSON.stringify(response?.data?.data?.token))
    }
    return response?.data?.data?.user
}

// calling login api

 export const loginUser=async(userData)=>{

    const response=await axios.post(`${API_URL}/login`,userData)
     // Check if the response contains valid user data

     if(response?.data?.data?.user){
      //   localStorage.setItem('user',JSON.stringify(response?.data?.data?.user))
      const { password, ...userWithoutPassword } = response?.data?.data?.user;
        localStorage.setItem('user',JSON.stringify(userWithoutPassword))
        localStorage.setItem('token',JSON.stringify(response?.data?.data?.token))
     }
     return response?.data?.data?.user
}


