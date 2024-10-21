import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { addUserReviews } from "../Services/ratingService"

// specifying the initial state
const initialState={
    ratings:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
}



//adding reviews
export const addReview=createAsyncThunk('/ratings/addReview',async(reviewData,thunkAPI)=>{
    try{
        return await addUserReviews(reviewData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


const ratingSlice=createSlice({
    name:'ratings',
    initialState,
    reducers:{
        resetStatus:(state)=>{
            state.isSuccess=false
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(addReview.pending,(state)=>{
            state.isLoading=true
            })
            .addCase(addReview.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.ratings=[...state.ratings,action.payload] 
            })
            .addCase(addReview.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.ratings=null
                state.message=action.payload
            })
    }
})

export const {resetStatus}=ratingSlice.actions
export default ratingSlice.reducer