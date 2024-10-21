import { useDispatch, useSelector } from "react-redux";
import { createCart, getCart, updateCartData } from "../features/cartSlice";


const useAddtoCart=()=>{

    const {cart}=useSelector((state)=>state.cart)
    const dispatch=useDispatch()
    const addCart=(userID,cartInfo)=>{
        if (!cart) {
            // Create a new userCart if it doesn't exist
            const newUserCart = {
                userID,
                products: [{
                    bookID: cartInfo.id,
                    quantity: "1", // Initial quantity
                    bookName: cartInfo.bookName,
                    imageUrl: cartInfo.imageUrl,
                    price:cartInfo.price,
                    authorName:cartInfo.authorName
                }]
            };
            dispatch(createCart(newUserCart))
        } else {
            let newUserCart={}
            let modifiedProducts=[]
           const existingProduct= cart?.products?.find(item=>item.bookID==cartInfo.id)
            if(existingProduct)
                 modifiedProducts=cart?.products.map(item=>item.bookID===existingProduct.bookID?{...existingProduct,quantity:parseInt(existingProduct.quantity)+1}:item)
            else {
                const newProduct={...cartInfo,bookID:cartInfo.id,quantity:1}
                delete newProduct.id
                modifiedProducts=[...cart.products,newProduct]
            } 
            newUserCart={
                ...cart,
                products:modifiedProducts
          }  
            
            dispatch(updateCartData(newUserCart))
        }
    }
    return {addCart}
}

export default useAddtoCart
