import './books.css'
import Items from "./Items"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBooks, getCategories } from "../../features/bookSlice"
import Search from "./Search"
import Pagination from "./Pagination"
import Categories from "./Categories"
import MobileCategories from "./MobileCategories"
import { createCart, getCart } from "../../features/cartSlice"
import useAddtoCart from "../../Hooks/useAddtoCart"
import Header from "../../Components/Layout/Header"
import usePagination from "../../Hooks/usePaginations"
import { toast } from 'react-toastify'


const Books = () => {

    const dispatch = useDispatch()
    const { books,isLoading,categories,pagetotal } = useSelector((state) => state.books)
    const { user } = useSelector((state) => state.auth)
    const [categoryId,setCategoryId]=useState(null)

    const perPage = 10
    
    const total = pagetotal
    const totalPages = Math.ceil(total / perPage)

    const { page, fnPrevPage, fnNextPage, fnChangePage } = usePagination(1, totalPages);
    
    const paginationPropsValues = {
        page,
        total,
        perPage,
        fnPrevPage,
        fnChangePage,
        fnNextPage,
        totalPages
    }
    // calling api for getting books data

    useEffect(() => {
        dispatch(getBooks({page,categoryId,limit:10}))
    }, [page,categoryId])

    useEffect(()=>{
        dispatch(getCategories())
    },[])

    useEffect(()=>{
        dispatch(getCart(user.id))
    },[user.id])

    const getCategoryBooks = (category) => {
        if (category) {
            setCategoryId(category)            
        }
    }
    const fnAddtoCart = (e, cartInfo) => {
        e.stopPropagation();
        const cartData={
            userId:user.id,
            bookId:cartInfo.id,
            quantity:1
        }
        dispatch(createCart(cartData))
    };

    return (
        <div className='books-page'>
            <Header />
            <Search fnAddtoCart={fnAddtoCart}/>
            <div className="mobile-Categories">

                {
                    categories?.map((cat, index) =>
                        <MobileCategories cat={cat} key={index} />
                    )
                }
            </div>
            <div className="page-wrapper">
                <Categories categories={categories} getCategoryBooks={getCategoryBooks} isLoading={isLoading}/>
                <div className='page-inner-wrapper'>
                <Items books={books} fnAddtoCart={fnAddtoCart} isLoading={isLoading}/>
                <Pagination paginationPropsValues={paginationPropsValues} />
                </div>
            </div>
        </div>
    )
}


export default Books