import './addnew.css'
import Button from '../../Components/Common/Button'
import Input from '../../Components/Common/Input'
import Label from '../../Components/Common/Label'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { addBook, editBook } from '../../features/bookSlice'
import { IoClose } from "react-icons/io5";
const AddNewBook=({setPopupForm,edit,setEdit,categories})=>{
    const [productData,setProductData]=useState(
        {
            bookName:'',
            authorName:'',
            price:'',
            imageUrl:'',
            Category:'',
            description:'',
            quantity:''            
        }
    )
    useEffect(()=>{
        console.log(categories,'cat')
    },[])

    const [productErrorData,setProductErrorData]=useState(
        {
            hasErrorInbookName:false,
            hasErrorInauthorName:false,
            hasErrorInprice:false,
            hasErrorInimageUrl:false,
            hasErrorInCategory:false,
            hasErrorIndescription:false,
            hasErrorInquantity:false           
        }
    )

    const dispatch=useDispatch()
    //destructing the form data object and error object
    const {bookName,authorName,price,imageUrl,Category,description,quantity}=productData
    const{hasErrorInbookName,hasErrorInauthorName,hasErrorInprice,hasErrorInimageUrl,hasErrorInCategory,hasErrorIndescription,hasErrorInquantity}=productErrorData

    const fnHandleChange=(e)=>{
        setProductData(
            {
                ...productData,[e.target.name]:e.target.value
            }
        )
    }

    useEffect(()=>{
        if(edit.isEdit){
            setProductData({
                bookName: edit.value.bookname,
                authorName: edit.value.authorname,
                price: edit.value.price,
                imageUrl: edit.value.imageurl,
                Category: edit.value.category, 
                description: edit.value.description,
                quantity: edit.value.quantity
            });
        }
    },[edit])
    const fnHandleSubmit=(e)=>{
        e.preventDefault()
        
        // error checking
        const newObj={...productErrorData}
        newObj.hasErrorInbookName=bookName.length===0
        newObj.hasErrorInauthorName=authorName.length===0
        newObj.hasErrorInprice=price.length===0
        newObj.hasErrorInimageUrl=imageUrl.length===0
        newObj.hasErrorInCategory=Category.length===0
        newObj.hasErrorIndescription=description.length===0
        newObj.hasErrorInquantity=quantity.length===0
        setProductErrorData(newObj)

         //checking if any fields have errors
         const productInfo=Object.values(newObj)
        const result=productInfo.some((item)=>item===true) // if any error flag is true, then there is an error

        if(!result){
            if(edit.isEdit){
                const product={
                    id:edit.value.id,
                    authorName,
                    bookName,
                    price,
                    Category,
                    imageUrl,
                    description,
                    quantity
                }
                setPopupForm(false)
                setEdit(
                    {
                        isEdit:false,
                        value:[]
                    }
                )    
                // call edit api       
                dispatch(editBook(product))
            }
            else{
                
                const product={
                    authorName,
                    bookName,
                    price,
                    Category,
                    imageUrl,
                    description,
                    quantity
                    }
                setPopupForm(false)
                dispatch(addBook(product))
            }   
        }
        else{
            // if there is any error, show toast messages for the respective fields
            toast.error("Please fill mandatory informations")

        }
    }

    const handleErrorChange=(e)=>{
        const {name}=e.target
        setProductErrorData(
            {
                ...productErrorData,[`hasErrorIn${name}`]:false
            }
        )
    }
    const handlePopupClose=()=>{
       setPopupForm(false)
       setEdit(
        {
            isEdit:false,
            value:[]
        }
    ) 
    }
    return(
        <div className="addnew-modal">
            <span className='close' onClick={handlePopupClose}><IoClose /></span>
            <div className='modal-cover'>
                <p className='heading-form'>Add New Book</p>

                <form className='product-add-form' onSubmit={fnHandleSubmit}>
                    <div className='form-items'>

                        <div className='form-item'>
                        <Label htmlFor='bookName' value="Name"/>
                        <Input id="bookName" value={bookName} name='bookName' type='text' onChange={fnHandleChange}  className={hasErrorInbookName?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorInbookName?'error':'hidden'}>Please enter the book name</p>
                        </div>


                        <div className='form-item'>
                        <Label htmlFor='authorName' value="Author Name"/>
                        <Input id="authorName" value={authorName} name='authorName' type='text' onChange={fnHandleChange}  className={hasErrorInauthorName?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorInauthorName?'error':'hidden'}>Please enter the author name</p>
                        </div>
                    </div>


                    <div className='form-items'>

                        <div className='form-item'>
                        <Label htmlFor='price' value="Price"/>
                        <Input id="price" value={price} name='price' type='text' onChange={fnHandleChange}  className={hasErrorInprice?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorInprice?'error':'hidden'}>Please enter price name</p>
                        </div>


                        <div className='form-item'>
                        <Label htmlFor='imageUrl' value="Image URL"/>
                        <Input id="imageUrl" value={imageUrl} name='imageUrl' type='text' onChange={fnHandleChange}  className={hasErrorInimageUrl?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorInimageUrl?'error':'hidden'}>Please enter image url</p>
                        </div>
                    </div>

                    <div className='form-items'>

                        <div className='form-item'>
                        <Label htmlFor='Category' value="Category"/>
                        <select  id="Category" name='Category' value={Category} onChange={fnHandleChange}  className={hasErrorInCategory?'inputerror':''} onFocus={handleErrorChange}>
                            <option value="">Select Category</option>
                            {
                                categories?.map((cat)=>
                                    <option key={cat.id} value={cat.id}>{cat.category}</option>
                                )
                            }
                        </select>
                        <p className={hasErrorInCategory?'error':'hidden'}>Please enter the category</p>
                        </div>
                        <div className='form-item'>
                        <Label htmlFor='quantity' value="Quantity"/>
                        <Input id="quantity" value={quantity} name='quantity' type='text' onChange={fnHandleChange}  className={hasErrorInquantity?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorInquantity?'error':'hidden'}>Please enter the quantity</p>
                        </div>

                    </div>
                    <div className='desc-wrapper'>
                        <Label htmlFor='description' value="Description"/>
                        <textarea id="description" value={description} name='description' rows="4" onChange={fnHandleChange}  className={ hasErrorIndescription?'inputerror':''} onFocus={handleErrorChange}/>
                        <p className={hasErrorIndescription?'error':'hidden'}>Please enter the description</p>
                    </div>
                    <Button type='submit' className='add-btn' value='Submit'/>
                </form>
            </div>
        </div>
    )
}
export default AddNewBook  