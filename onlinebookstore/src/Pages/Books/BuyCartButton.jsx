import Button from "../../Components/Common/Button"

const BuyCartButton=({fnAddtoCart,book})=>{
    return(
        <div className="btn-wrapper">
        <Button type='button' className='btn-cart' value='Add Cart' onClick={(e)=>fnAddtoCart(e,book)}/>   
        </div>
    )
}
export default BuyCartButton