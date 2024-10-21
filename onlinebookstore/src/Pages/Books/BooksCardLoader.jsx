import './skeleton.css'
const BookCardLoader=()=>{
    return(
        <div className="book-item-wrapper skeleton">
            <div className="book-item-inner">
                <div className="book-image-wrapper">
                    <div className="skeleton-image" />
                </div>
                <div className="books-details deatils-skeleton">
                    <div className="skeleton-title" />
                    <div className="skeleton-author" />
                    <div className="skeleton-price" />
                </div>
            </div>
        </div>
    )
}
export default BookCardLoader