import { useEffect, useState } from "react"
import InputForm from "../../Components/Common/InputForm"
import Button from "../../Components/Common/Button"
import { useDispatch, useSelector } from "react-redux"
import { addAddress } from "../../features/Slices/adressSlice"

const AddNewAddress=({setShowForm})=>{

    const {user}=useSelector((state)=>state.auth)
    const dispatch=useDispatch()
    //initialize the form data
    const [addressForm,setAddressForm]=useState({
        house:'',
        area:'',
        city:'',
        pin:''
    })

    // initialize the error data for error checking
    const [errorData,setErrorData]=useState(
        {
            hasErrorInhouse:false,
            hasErrorInarea:false,
            hasErrorIncity:false,
            hasErrorInpin:false
        }
    )
    // destructing the values
    const {hasErrorInarea,hasErrorIncity,hasErrorInhouse,hasErrorInpin}=errorData
    const {house,area,city,pin}=addressForm

    // on change function for input change
    const fnhandleChange=(e)=>{
        
        setAddressForm(
            {
                ...addressForm,[e.target.name]:e.target.value
            }
        )
    }

    const validateFields=()=>{
        const newData={...errorData}
        newData.hasErrorInhouse=house.length===0
        newData.hasErrorInarea=area.length===0
        newData.hasErrorIncity=city.length===0
        newData.hasErrorInpin=pin.length===0

        setErrorData(newData)

        const addressData=Object.values(newData)

        const result=addressData.some((item)=>item===true)
        return result
    }
    
    const fnHandleSubmit=(e)=>{
        e.preventDefault()

        if(!validateFields()){
            const userAddress={
                userid:user.id,
                house,
                area,
                city,
                pin,
                active:1
            }
            setShowForm(false)
            dispatch(addAddress(userAddress))
        }
    }
    const handleFocus=(e)=>{
        const {name}=e.target
        setErrorData({
            ...errorData,[`hasErrorIn${name}`]:false
        })
    }

    return(
        <form onSubmit={fnHandleSubmit}>
            <InputForm wrapperClass="address-item" id="house" name="house" value={house} placeholder="Enter the house name /flat no.... " onChange={fnhandleChange} className={hasErrorInhouse?"inputerror":''} onFocus={handleFocus}/>
            <InputForm wrapperClass="address-item" id="area" name="area" value={area} placeholder="Enter the area " onChange={fnhandleChange} className={hasErrorInarea?"inputerror":''} onFocus={handleFocus}/>
            <InputForm wrapperClass="address-item" id="city" name="city" value={city} placeholder="City" onChange={fnhandleChange} className={hasErrorIncity?"inputerror":''} onFocus={handleFocus}/>
            <InputForm wrapperClass="address-item" id="pin" name="pin" value={pin} placeholder="Pin No" onChange={fnhandleChange} className={hasErrorInpin?"inputerror":''} onFocus={handleFocus}/>
            <Button value="Save" type="submit" className="btn-submit-address" />
        </form>
    )
}
export default AddNewAddress