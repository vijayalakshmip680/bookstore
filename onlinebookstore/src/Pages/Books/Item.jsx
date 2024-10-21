import { useNavigate } from "react-router-dom"
import BuyCartButton from "./BuyCartButton"
import Button from "../../Components/Common/Button"
const Item=({book,fnAddtoCart})=>{
    const navigate=useNavigate()
    const fnGoToDetail=(e)=>{
        navigate(`/books/${book.id}`)
    }
    return(
        <div className="book-item-wrapper" onClick={fnGoToDetail}>
            <div className="book-item-inner">

                <div className="book-image-wrapper">
                    <img src={book.imageurl} alt={book.bookname}/>

                </div>
                <div className="books-details">
                    <h4 className='title'>{book.bookname}</h4>
                    <p>{book.authorname}</p>
                    <p>{book.categoryname}</p>
                    <h5><span>₹</span>{book.price}</h5>
                </div>
                {
                    book.quantity >0 ?(

                        <BuyCartButton fnAddtoCart={(e)=>fnAddtoCart(e,book)} book={book}/>
                    ):( <Button className='btn-outofstock' value="Out Of Stock"/>)
                }
            </div>
        </div>
    )
}
export default Item