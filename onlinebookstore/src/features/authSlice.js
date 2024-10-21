import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import {register,loginUser} from "../features/authService"

// checking the user details in local storage
const user=JSON.parse(localStorage.getItem('user'))

// specifying the initial state
const initialState={
    user:user?user:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

// register function for calling register api

export const registerUser=createAsyncThunk('/auth/register',async(user,thunkAPI)=>{
    try{
        return await register(user)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


// register function for calling register api

export const login=createAsyncThunk('/auth/login',async(user,thunkAPI)=>{
    
    try{
        return await loginUser(user)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})




export const authSlice=createSlice(
    {
        name:'auth',
        initialState,
        reducers:{
            reset:(state)=>{
                state.isError=false,
                state.isLoading=false,
                state.isSuccess=false,
                state.message=''
            },
            logout:(state)=>{
                localStorage.removeItem('user')
                localStorage.removeItem('token')
                state.user=null
            }
        },
        extraReducers:(builder)=>{
            builder
                .addCase(registerUser.pending,(state)=>{
                state.isLoading=true
                })
                .addCase(registerUser.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.user=action.payload
                })
                .addCase(registerUser.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.user=null
                    state.message=action.payload
                })
                .addCase(login.pending,(state)=>{
                    state.isLoading=true
                    state.isError=false
                    })
                    .addCase(login.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.user=action.payload
                    })
                    .addCase(login.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.user=null
                        state.message=action.payload
                    })
        }
    }
)

export const {reset,logout}=authSlice.actions
export default authSlice.reducer