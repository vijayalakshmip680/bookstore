export const GetReviews=(reviews)=>{
    
    if (!reviews || reviews.length === 0) return 0;

    const totalRating = reviews.reduce((acc, curr) => {
    return acc + curr.rating; // Accumulate the total rating
    }, 0);

    return totalRating / reviews.length; // Calculate the average
}