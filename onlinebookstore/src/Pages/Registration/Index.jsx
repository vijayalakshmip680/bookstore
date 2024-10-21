import { useEffect, useState } from 'react'
import Input from '../../Components/Common/Input'
import Label from '../../Components/Common/Label'
import {useDispatch, useSelector} from 'react-redux'
import './register.css'

import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { registerUser, reset } from '../../features/authSlice'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import InputForm from '../../Components/Common/InputForm'



const Register=()=>{

    const dispatch=useDispatch()
    const navigate=useNavigate()
    // state to hold the form data name,email,password and confirm password
    const [formData,setFormData]=useState(
        {
            firstName:'',
            lastName:'',
            username:'',
            password:'',
            confirmpassword:''
        }
    )
    //for password showing and hiding
    const [isvisible,setIsVisible]=useState(false)
    const [isvisiblePassword,setIsVisiblePassword]=useState(false)
    // state to track errors for specific fields
    const [errorData,setErrorData]=useState(
        {
            hasErrorInfirstName:false,
            hasErrorInlastName:false,
            hasErrorInusername:false,
            hasErrorInpassword:false,
            hasErrorInconfirmpassword:false   
        }
    )

    // destructing formData and errorData 
    const {firstName,lastName,username,password,confirmpassword}=formData
    const {hasErrorInfirstName,hasErrorInlastName,hasErrorInusername,hasErrorInpassword,hasErrorInconfirmpassword}=errorData

    const {user,isError,isSuccess,message,isLoading}=useSelector((state)=>state.auth)

    useEffect(()=>{
        if(isError){
            toast.error(message)
        }
        if (user === null) {
            navigate('/register'); // Redirect to the registration page
        } else if (isSuccess || user?.isadmin === false) {
            navigate('/'); // Redirect to the home page for successful registration
        }
    },[isError, user, isSuccess, navigate, isError])

    // handler to update form state when user types into input fields
    const handleInputChange=(e)=>{
        setFormData(
            {
                ...formData,[e.target.name]:e.target.value
            }
        )
    }

    // function for handling the form submission
    const fnhandleSubmit=(e)=>{
        e.preventDefault() // prevent the form from refreshing the page

        //error checking
        // validating email using regex
        // const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // creating a new object to track error status
        const newObj={...errorData}
        // error validation for each field
        newObj.hasErrorInfirstName=firstName.length===0
        newObj.hasErrorInlastName=lastName.length===0
        newObj.hasErrorInusername=username.length===0
        newObj.hasErrorInpassword=password.length<=7
        newObj.hasErrorInconfirmpassword=confirmpassword !==password || confirmpassword.length===0

        // updating error state with new validation results

        setErrorData(newObj)

        //checking if any fields have errors
        const userData=Object.values(newObj)
        const result=userData.some((item)=>item===true) // if any error flag is true, then there is an error


        // if there is no error call the registration function to send the data to backend
        if(!result){
            const userDetails={
                firstname:firstName,
                lastname:lastName,
                username:username,
                password:password,
                isadmin:false
            }
            dispatch(registerUser(userDetails))
        }
    }

    // function to reset the error flag for a specific field when the user focuses on it
    const handleErrorChange=(e)=>{
        const {name}=e.target
        setErrorData({...errorData,[`hasErrorIn${name}`]:false})
    }
    return(
        <div className='registration-container'>

            <h2>Create an Account</h2>

            <form className='registration-form' onSubmit={fnhandleSubmit}>
            <InputForm wrapperClass="form-group" label='First Name' isErrormsg={hasErrorInfirstName} erroMsg='First Name is required' id="name" value={firstName} name='firstName' type='text' onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInfirstName?'inputerror':''}/>
            <InputForm wrapperClass='form-group' label='Last Name' isErrormsg={hasErrorInlastName} erroMsg='Last Name is required' value={lastName} name='lastName' type='text' id="lastname" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInlastName?'inputerror':''}/>
            <InputForm wrapperClass='form-group' label='User Name' isErrormsg={hasErrorInusername} erroMsg='User Name is required' value={username} name='username' type='text' id="username" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInusername?'inputerror':''}/>

            <div className='password-wrapper'>
            <div className='form-group'>
                <Label htmlFor='password' value="Password"/>
                <Input value={password} name='password' type={isvisible?'text':'password'} id="password" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInpassword?'inputerror':''}/>
                <span className='eye-icons-register' onClick={()=>setIsVisible(!isvisible)}>
                {
                    isvisible?<FaRegEye />:<FaRegEyeSlash />
                }
                </span>
                <p className={hasErrorInpassword?'error-msg':'noerr'}>Please Enter a valid password (min 8 characters)</p>
            </div>
            </div>

            <div className='password-wrapper'>   
            <div className='form-group'>
                <Label htmlFor='confirmpassword' value="Confirm Password"/>
                <Input value={confirmpassword} name='confirmpassword' type={isvisiblePassword?'text':'password'} id="confirmpassword" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInconfirmpassword?'inputerror':''}/>
                <span className='eye-icons-register' onClick={()=>setIsVisiblePassword(!isvisiblePassword)}>
                {
                    isvisiblePassword?<FaRegEye />:<FaRegEyeSlash />
                }
                </span>
                <p className={hasErrorInconfirmpassword?'error-msg':'noerr'}>Password do not match</p>
            </div>
            </div>
            {/* <div className='form-group'>
            <select name='role' value={role} onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInrole?'inputerror':''}>
                <option value="">Select Role</option>
                <option value="Admin">ADMIN</option>
                <option value="User">USER</option>
            </select>
            <p className={hasErrorInrole?'error-msg':'noerr'}>Role is required</p>
            </div> */}
            <button type='submit' className='submit-btn'>Register</button>
            <p style={{paddingBlock:".5rem"}}>For existing user <Link to='/login'>Login</Link></p>
            </form>

        </div>
    )
}

export default Register