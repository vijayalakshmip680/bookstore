import {useSelector} from 'react-redux'
import {Navigate} from "react-router-dom"
const AdminAuthGuard=({children})=>{

    const {user}=useSelector((state)=>state.auth)   
    if( user?.isadmin)
    {
        return <>{children}</>
    }
    else{

        return <Navigate to='/login'/>
    }
    
}

export default AdminAuthGuard