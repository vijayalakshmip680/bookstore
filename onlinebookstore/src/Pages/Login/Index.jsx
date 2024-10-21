import { useEffect, useState } from 'react'
import Button from '../../Components/Common/Button'
import Input from '../../Components/Common/Input'
import Label from '../../Components/Common/Label'
import '../Registration/register.css'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../../features/authSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { commonConst } from '../../constants/commonConstants'
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
const Login=()=>{
  
    const dispatch=useDispatch()
    const [formData,setFormData]=useState(
        {
            username:'',
            password:'',
        }
    )

    const navigate=useNavigate()

    //for password showing and hiding
    const [isvisible,setIsVisible]=useState(false)

     // state to track errors for specific fields
     const [errorData,setErrorData]=useState(
        {

            hasErrorInusername:false,
            hasErrorInpassword:false,       
        }
    )

    const {isError,isSuccess,message,user}=useSelector((state)=>state.auth)
    // destructing formData and errorData 
    const {username,password}=formData
    const {hasErrorInusername,hasErrorInpassword}=errorData
  useEffect(()=>{
    if(user){
        dispatch(reset())
        if(user?.isadmin===false){
           
            navigate('/')

        }else{
            navigate('/dashboard')
        }
    }

  },[user,isSuccess,navigate,dispatch])
    useEffect(()=>{
        if(isError) toast.error('User not found or invalid credentials')
    },[isError,isSuccess])
    
    const fnhandleSubmit=(e)=>{
        e.preventDefault()

         //error checking
        // validating email using regex
        const emailRegex=commonConst.EmailPattern
        // creating a new object to track error status
        const newObj={...errorData}
        // error validation for each field
        newObj.hasErrorInusername=username.length===0
        newObj.hasErrorInpassword=password.length<=7

        // updating error state with new validation results

        setErrorData(newObj)

        //checking if any fields have errors
        const userData=Object.values(newObj)
        const result=userData.some((item)=>item===true) // if any error flag is true, then there is an error

        if(!result){
            const userDetails={
                username,
                password
            }
            dispatch(login(userDetails))
        }
    }

    const handleInputChange=(e)=>{
        setFormData(
            {
                ...formData,[e.target.name]:e.target.value
            }
        )
    }

    const handleErrorChange=(e)=>{
        const {name}=e.target
        setErrorData(
            {
                ...errorData,[`hasErrorIn${name}`]:false
            }
        )

    }
    return(
        <div className='registration-container'>

            <h2>Sign In</h2>

            <form className='registration-form' onSubmit={fnhandleSubmit}>

            <div className='form-group'>
                <Label htmlFor='username' value="User Name"/>
                <Input value={username} name='username' type='text' id="username" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInusername?'inputerror':''}/>
                <p className={hasErrorInusername?'error-msg':'noerr'}>Please Enter the username</p>
            </div>

            <div className='form-group'>
                <Label htmlFor='password' value="Password"/>
                <div className='password-wrapper'>
                <Input value={password} name='password' type={isvisible?'text':'password'} id="password" onChange={handleInputChange} onFocus={handleErrorChange} className={hasErrorInpassword?'inputerror':''}/>
                <p className={hasErrorInpassword?'error-msg':'noerr'}>Please Enter the password</p>
                <span className='eye-icons' onClick={()=>setIsVisible(!isvisible)}>
                {
                    isvisible?<FaRegEye />:<FaRegEyeSlash />
                }
                </span>
                </div>
            </div>
            <Button type='submit' className='submit-btn' value='Login'/>
            <p style={{paddingBlock:".5rem"}}>Don't you have an account? <Link to='/register'>Register</Link></p>
            </form>

        </div>
    )
}
export default Login