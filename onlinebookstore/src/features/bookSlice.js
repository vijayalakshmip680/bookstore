import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import { getUserBooks,getUserBook, addNewBook, removeBook, updateBook, getBookCategories, getSearchResults, getAdminBooksData, getAdminBookCategories } from './bookService'
// specifying the initial state
const initialState={
    books:[],
    isError:false,
    isSuccess:false,
    isLoading:false,
    message:'',
    book:{},
    categories:[],
    isbookSuccess:false,
    pagetotal:'',
    searchData:[]
}

// getBooks function for  getting all books

export const getBooks=createAsyncThunk('/books/getBooks',async(bookData,thunkAPI)=>{
    try{
        return await getUserBooks(bookData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// getBooks function for  getting all books

export const getAdminBooks=createAsyncThunk('/books/getAdminBooks',async(bookData,thunkAPI)=>{
    try{
        return await getAdminBooksData(bookData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// for getting categories
export const getCategories=createAsyncThunk('/books/getCategories',async(thunkAPI)=>{
    try{
        return await getBookCategories()
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})



// for getting categories for admin
export const getAdminCategories=createAsyncThunk('/books/getAdminCategories',async(thunkAPI)=>{
    try{
        return await getAdminBookCategories()
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

//  function for calling get book api

export const getBook=createAsyncThunk('/books/getBook',async(id,thunkAPI)=>{
    try{
        return await getUserBook(id)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

// calling api for adding new book
export const addBook=createAsyncThunk('/books/addBook',async(bookData,thunkAPI)=>{
    try{
        return await addNewBook(bookData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const deleteBook=createAsyncThunk('/books/deleteBook',async(bookId,thunkAPI)=>{
    try{
        return await removeBook(bookId)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const editBook=createAsyncThunk('/books/editBook',async(updateData,thunkAPI)=>{
    try{
        return await updateBook(updateData)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})


//update quantity of particular book
export const getSearch=createAsyncThunk('/books/getSearch',async(searchTerm,thunkAPI)=>{
    try{
        return await getSearchResults(searchTerm)
    }
    catch(e){
        const message=(e.message && e.response.data && e.response.data.message) || e.message || e.toString()
        return thunkAPI.rejectWithValue(message)
    }
})

export const bookSlice=createSlice(
    {
        name:'books',
        initialState,
        reducers:{
            // reset:(state)=>{
            //     state.isError=false,
            //     state.isLoading=false,
            //     state.isSuccess=false,
            //     state.message=''
            // },
        },
        extraReducers:(builder)=>{
            builder
                .addCase(getBooks.pending,(state)=>{
                state.isLoading=true
                })
                .addCase(getBooks.fulfilled,(state,action)=>{
                    state.isLoading=false
                    state.isSuccess=true
                    state.books=action.payload.books
                    state.pagetotal=action.payload.totalBooks
                })
                .addCase(getBooks.rejected,(state,action)=>{
                    state.isLoading=false
                    state.isError=true
                    state.books=null
                    state.message=action.payload
                })
                .addCase(getAdminBooks.pending,(state)=>{
                    state.isLoading=true
                    })
                    .addCase(getAdminBooks.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.books=action.payload.books
                        state.pagetotal=action.payload.totalBooks
                    })
                    .addCase(getAdminBooks.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.books=null
                        state.message=action.payload
                    })
                .addCase(getBook.pending,(state)=>{
                    state.isLoading=true
                    })
                    .addCase(getBook.fulfilled,(state,action)=>{
                        state.isLoading=false
                        state.isSuccess=true
                        state.book=action.payload
                    })
                    .addCase(getBook.rejected,(state,action)=>{
                        state.isLoading=false
                        state.isError=true
                        state.book=null
                        state.message=action.payload
                    })
                    .addCase(addBook.pending,(state)=>{
                        state.isLoading=true
                        })
                    .addCase(addBook.fulfilled,(state,action)=>{
                            state.isLoading=false
                            state.isSuccess=true
                            const existingbooks=state.books
                            existingbooks.push(action.payload)
                            state.books=existingbooks
                        
                    })
                    .addCase(addBook.rejected,(state,action)=>{
                            state.isLoading=false
                            state.isError=true
                            state.books=null
                            state.message=action.payload
                    })
                    .addCase(deleteBook.pending,(state)=>{
                        state.isLoading=true
                        })
                    .addCase(deleteBook.fulfilled,(state,action)=>{
                            state.isLoading=false
                            state.isSuccess=true
                            const deleted=state.books.filter((item)=>item.id!==action.payload.id)
                            state.books=deleted  
                    })
                    .addCase(deleteBook.rejected,(state,action)=>{
                            state.isLoading=false
                            state.isError=true
                            state.books=null
                            state.message=action.payload
                    })
                    .addCase(editBook.pending,(state)=>{
                        state.isLoading=true
                        })
                    .addCase(editBook.fulfilled,(state,action)=>{
                            state.isLoading=false
                            state.isSuccess=true
                            state.books=state.books.map((item)=>
                                {
                                    if(item.id===action.payload.id) {
                                        return action.payload
                                    }
                                    else return item
                            })
                    })
                    .addCase(editBook.rejected,(state,action)=>{
                            state.isLoading=false
                            state.isError=true
                            state.books=null
                            state.message=action.payload
                    })
                    .addCase(getCategories.pending,(state)=>{
                        // state.isLoading=true
                        })
                    .addCase(getCategories.fulfilled,(state,action)=>{
                            // state.isLoading=false
                            state.isSuccess=true
                            state.categories=action.payload
                            // state.pagetotal=action.payload.total
                    })
                    .addCase(getCategories.rejected,(state,action)=>{
                            // state.isLoading=false
                            state.isError=true
                            state.categories=null
                            state.message=action.payload
                    })
                            .addCase(getSearch.pending,(state)=>{
                                state.isLoading=true
                                })
                                .addCase(getSearch.fulfilled,(state,action)=>{
                                    state.isLoading=false
                                    state.isSuccess=true
                                    state.searchData=action.payload
                                })
                                .addCase(getSearch.rejected,(state,action)=>{
                                    state.isLoading=false
                                    state.isError=true
                                    state.searchData=null
                                    state.message=action.payload
                                })
                                .addCase(getAdminCategories.pending,(state)=>{
                                    // state.isLoading=true
                                    })
                                .addCase(getAdminCategories.fulfilled,(state,action)=>{
                                        // state.isLoading=false
                                        state.isSuccess=true
                                        state.categories=action.payload
                                        // state.pagetotal=action.payload.total
                                })
                                .addCase(getAdminCategories.rejected,(state,action)=>{
                                        // state.isLoading=false
                                        state.isError=true
                                        state.categories=null
                                        state.message=action.payload
                                })
        }
    }
)

export default bookSlice.reducer