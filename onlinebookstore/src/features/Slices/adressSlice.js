import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUserAddress, changeActiveAddress, getAddressess } from "../Services/addressService"

// specifying the initial state
const initialState={
    address:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}

export const addAddress=createAsyncThunk('/address/addAddress',async(addressData,thunkAPI)=>{
    try{
        // return await register(user)
        return await addUserAddress(addressData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get All address
export const getAllAddress=createAsyncThunk('/address/getAllAddress',async(userId,thunkAPI)=>{
    try{
        return await getAddressess(userId)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//change default address

export const changeDefault=createAsyncThunk('/address/changeDefault',async(addressData,thunkAPI)=>{
    try{
        return await changeActiveAddress(addressData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const addressSlice=createSlice({
    name:'address',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(addAddress.pending,(state)=>{
            state.isLoading=true
            })
            .addCase(addAddress.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.address=action.payload
    
            })
            .addCase(addAddress.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.address=[]
                state.message=action.payload
            })
            .addCase(getAllAddress.pending,(state)=>{
                state.isLoading=true
                })
                .addCase(getAllAddress.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.address=action.payload
                })
                .addCase(getAllAddress.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.address=[]
                    state.message=action.payload
                })
                .addCase(changeDefault.pending,(state)=>{
                    state.isLoading=true
                    })
                    .addCase(changeDefault.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.address=action.payload
                    })
                    .addCase(changeDefault.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.address=[]
                        state.message=action.payload
                    })
    }
})

export default addressSlice.reducer