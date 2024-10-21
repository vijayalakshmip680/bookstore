import axios from 'axios'
const API_URL='http://localhost:3000/api/v1/books'
const ADMIN_API_URL='http://localhost:3000/api/v1/admin'
import { store } from '../app/store'
import { logout } from './authSlice'



// calling api for getting books details

export const getUserBooks=async(bookData)=>{
    try{
        const {page,categoryId,limit}=bookData
        const token=JSON.parse(localStorage.getItem('token'))
    
          // Build the query parameters conditionally
          const params = new URLSearchParams({ page, limit });
    
          if (categoryId) {
              params.append('categoryId', categoryId);
          }
        const response = await axios.get(`${API_URL}?${params.toString()}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        return response.data.data;
    }
    catch(e){
        if(e.response && e.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
 
}


// for getting categories
export const getBookCategories=async()=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${API_URL}/categories`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        return response?.data?.data.categories
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// calling api for getting books details

 export const getUserBook=async(id)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(API_URL+`/${id}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.book
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}


//serach
export const getSearchResults=async(searchTerm)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response= await axios.get(`${API_URL}/search?query=${searchTerm}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        });
        return response.data.data.books
    }catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// admin api section

// calling api for getting admin books 

export const getAdminBooksData=async(bookData)=>{
    try{

        const {page,limit}=bookData
        const token=JSON.parse(localStorage.getItem('token'))
        const response = await axios.get(`${ADMIN_API_URL}/books?page=${page}&limit=${limit}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        });
        return response.data.data;
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// api for adding new book

export const addNewBook=async(bookData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.post(`${ADMIN_API_URL}/books`,bookData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.books
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}

// api for adding deleting book

export const removeBook=async(bookId)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.delete(`${ADMIN_API_URL}/books/${bookId}`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        })
        return response.data.data.book
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}


// api for editing the book details

export const updateBook=async(bookData)=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.put(`${ADMIN_API_URL}/books/${bookData.id}`, bookData,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            }
        });
        return response.data.data.book
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}


// for getting categories
export const getAdminBookCategories=async()=>{
    try{
        const token=JSON.parse(localStorage.getItem('token'))
        const response=await axios.get(`${ADMIN_API_URL}/books/categories`,{
            headers: {
                'Content-Type':'application/json',
                'authorization': `Bearer ${token}`,
            },
        });
        return response?.data?.data.categories
    }
    catch(error){
        if(error.response && error.response.status === 401){
            store.dispatch(logout())
        }
        throw new Error('Unauthorized access, please log in again.')
    }
}