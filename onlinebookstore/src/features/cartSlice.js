import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {  createUserCart, getUserCartItem, removeCartItem, updateUsercart } from "./cartService"


// specifying the initial state
const initialState={
    cart:null,
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:''
}
//get user cart
export const getCart=createAsyncThunk('/cart/getCart',async(userId,thunkAPI)=>{
    try{
        return await getUserCartItem(userId)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//create user cart
export const createCart=createAsyncThunk('/cart/createCart',async(cartData,thunkAPI)=>{
    try{
        return await createUserCart(cartData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//update user cart
export const updateCartData=createAsyncThunk('/cart/updateCartData',async(cartData,thunkAPI)=>{
    try{
        return await updateUsercart(cartData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//remove cart item

export const removeCart=createAsyncThunk('/cart/removeCart',async(cartData,thunkAPI)=>{
    try{
        return await removeCartItem(cartData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//end

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        updateCart: (state, action) => {
            state.cart = action.payload;
        }
    },
    extraReducers:(builder)=>{
        builder
            .addCase(getCart.pending,(state)=>{
            state.isLoading=true
            })
            .addCase(getCart.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isSuccess=true
                state.cart=action.payload
            })
            .addCase(getCart.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.cart=null
                state.message=action.payload
            })   
            .addCase(createCart.pending,(state)=>{
                state.isLoading=true
                })
                .addCase(createCart.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.cart=action.payload
                })
                .addCase(createCart.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.cart=null
                    state.message=action.payload
                })
                .addCase(updateCartData.pending,(state)=>{
                    state.isLoading=true
                    })
                    .addCase(updateCartData.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.cart=action.payload
                    })
                    .addCase(updateCartData.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.cart=null
                        state.message=action.payload
                    })  
                    .addCase(removeCart.pending,(state)=>{
                        state.isLoading=true
                        })
                        .addCase(removeCart.fulfilled,(state,action)=>{
                            state.isLoading=false
                            state.isSuccess=true
                            state.cart=action.payload
                        })
                        .addCase(removeCart.rejected,(state,action)=>{
                            state.isLoading=false
                            state.isError=true
                            state.cart=null
                            state.message=action.payload
                        })                 
    }
});
// Export the action
export const { updateCart } = cartSlice.actions;

export default cartSlice.reducer