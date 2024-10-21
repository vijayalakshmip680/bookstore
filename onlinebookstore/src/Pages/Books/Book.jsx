import './detail.css'
import bookImage from '../../assets/book1.jpg'
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getBook } from '../../features/bookSlice';
import Button from '../../Components/Common/Button'
import useAddtoCart from '../../Hooks/useAddtoCart';
import { Rating } from '@smastrom/react-rating';
import Header from '../../Components/Layout/Header';
import { createCart } from '../../features/cartSlice';



const Book=()=>{

    const dispatch=useDispatch()
    const {addCart}=useAddtoCart()
    const {id}=useParams()

    useEffect(()=>{
        dispatch(getBook(id))
    },[id])

    const {book} = useSelector((state)=>state.books)

    const {user} = useSelector((state)=>state.auth)
  
    const fnAddCart = (e, cartInfo) => {
        e.stopPropagation();
        const cartData={
            userId:user.id,
            bookId:cartInfo.id,
            quantity:1
        }
        dispatch(createCart(cartData))
    };
    return(
        <>
        <Header/>
        <div className="detail-page">

            {
                book ?(<><div className="book-image">
                    <img src={bookImage} alt={book.bookname} />
                </div>
                <div className="book-details">
                    <h1 className="book-title">{book.bookname}</h1>
                    <h2 className="book-author">By {book.authorname}</h2>
                    <p className="book-description">{book.description}</p>
                    <Rating style={{ maxWidth: 100 }} value={book.average_rating} readOnly />
                    {
                        book.quantity<1 ?( <Button type='button' value="Out Of Stock" className="book-available"/>):(<Button type='button' value="Add To Bag" className="btn-add-cart" onClick={(e)=>fnAddCart(e,book)}/>)
                    }
                </div></>):<div>No Result found</div>
            }

        </div>
        </>
    )
}
export default Book