import { useEffect, useState } from 'react';
import './review.css'
import { Rating } from '@smastrom/react-rating';
import Button from '../../Components/Common/Button';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addReview, resetStatus } from '../../features/Slices/ratingSlice';
import Header from '../../Components/Layout/Header';
const Addreview=()=>{
    const {id}=useParams()
    const dispatch=useDispatch()
    const [rating, setRating] = useState(0); // State for rating
    const [review, setReview] = useState(''); // State for review text
    const { user } = useSelector((state) => state.auth)
    const { ratings,isSuccess } = useSelector((state) => state.ratings)
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (rating === 0 || review.trim() === '') {
            toast.error("Please provide a rating and a review.");
            return;
        }
        const reviewData={
            bookId:id,
            userId:user.id,
            review,
            rating,
        }
        dispatch(addReview(reviewData))
        
    }

    useEffect(()=>{
        console.log(ratings)
        console.log(isSuccess)
        if(isSuccess){
            toast.success("Review addedd for the product")
            dispatch(resetStatus())
        }
        setReview('')
        setRating(0)
    },[ratings])
    return(
       <>
       <Header/>
        <form className="review-form" onSubmit={handleSubmit}>
        <h3>Submit Your Review</h3>
        <div className="rating-container">
            <Rating
                style={{ maxWidth: 250 }}
                value={rating}
                onChange={setRating}
            />
        </div>
        <div className="review-input">
            <textarea
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Write your review here..."
                rows="4"
                required
            />
        </div>
        <Button type="submit" className="submit-button" value="Submit Review"/>
    </form>
       
       </>
    )
}
export default Addreview