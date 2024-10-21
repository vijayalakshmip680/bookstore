import BookCardLoader from "./BooksCardLoader"
import Item from "./Item"

const Items=({books,fnAddtoCart,isLoading})=>{
    return(
        <div className="books-items">


                {isLoading ? (
                // Show skeleton loaders if loading
                Array.from({ length: 10 }).map((_, index) => (
                    <BookCardLoader key={index} />
                ))
            ) : (
                // Show actual book items if not loading
                books?.map((book, index) => (
                    <Item book={book} key={index} fnAddtoCart={fnAddtoCart} />
                ))
            )}
        </div>
    )
}
export default Items