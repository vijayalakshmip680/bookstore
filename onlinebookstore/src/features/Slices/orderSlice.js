import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { changeOrderStatus, createUserOrder, getOrders, getUserOrders } from "../Services/orderService"

// specifying the initial state
const initialState={
    orders:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    isOrderSuccess:false,
    isStatusChanged:false
}

// create order
export const createOrder=createAsyncThunk('/orders/createOrder',async(orderData,thunkAPI)=>{
    try{
        return await createUserOrder(orderData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get my order order
export const getMyOrder=createAsyncThunk('/orders/getMyOrder',async(userId,thunkAPI)=>{
    try{
        return await getUserOrders(userId)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// get all  order
export const getAllOrder=createAsyncThunk('/orders/getAllOrder',async(thunkAPI)=>{
    try{
        return await getOrders()
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// update Order Status
export const updateOrderStatus=createAsyncThunk('/orders/updateOrderStatus',async(orderData,thunkAPI)=>{
    try{
        return await changeOrderStatus(orderData)
        
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

const orderSlice=createSlice({
    name:'orders',
    initialState,
    reducers:{
        resetOrderStatus:(state)=>{
            state.isOrderSuccess=false
        },
    },
    extraReducers:(builder)=>{
        builder
            .addCase(createOrder.pending,(state)=>{
            state.isLoading=true
            })
            .addCase(createOrder.fulfilled,(state,action)=>{
                state.isLoading=false
                state.isOrderSuccess=true
            })
            .addCase(createOrder.rejected,(state,action)=>{
                state.isLoading=false
                state.isError=true
                state.orders=null
                state.message=action.payload
            })
            .addCase(getMyOrder.pending,(state)=>{
                state.isLoading=true
                })
                .addCase(getMyOrder.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.orders=action.payload
                })
                .addCase(getMyOrder.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.orders=null
                    state.message=action.payload
                })
                .addCase(getAllOrder.pending,(state)=>{
                    state.isLoading=true
                    })
                    .addCase(getAllOrder.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.orders=action.payload
                    })
                    .addCase(getAllOrder.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.orders=null
                        state.message=action.payload
                    })
                    .addCase(updateOrderStatus.pending,(state)=>{
                        state.isLoading=true
                    })
                    .addCase(updateOrderStatus.fulfilled,(state,action)=>{
                            state.isLoading=false
                            state.isStatusChanged=true
                            const newOrder=state.orders.map((item)=>
                                {
                                    if(item.id===action.payload.orderId) {
                                        return {
                                            ...item,
                                            status: action.payload.orderStatus // Update status with the new status
                                        };
                                    }
                                    else return item
                            })
                            state.orders=newOrder
                    })
                    .addCase(updateOrderStatus.rejected,(state,action)=>{
                            state.isLoading=false
                            state.isError=true
                            state.orders=null
                            state.message=action.payload
                    })
    }
})

export const {resetOrderStatus}=orderSlice.actions
export default orderSlice.reducer