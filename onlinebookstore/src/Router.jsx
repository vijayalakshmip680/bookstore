
import {Routes,Route} from 'react-router-dom'
import React from 'react'
const Register=React.lazy(()=>import("./Pages/Registration/Index"))
const Login=React.lazy(()=>import("./Pages/Login/Index"))
const Books=React.lazy(()=>import("./Pages/Books/Books"))
const Dashboard=React.lazy(()=>import("./Pages/Admin/Dashboard"))
const Book=React.lazy(()=>import("./Pages/Books/Book"))
const UserCart=React.lazy(()=>import("./Pages/Cart/UserCart"))
const Checkout=React.lazy(()=>import("./Pages/Checkout/Checkout"))
// import UserAuthGuard from './Hooks/userAuthGuard'
import AdminAuthGuard from './Hooks/AdminAuthGuard'
import UserAuthGuard from './Hooks/UserAuthGuard'
import Success from './Pages/Checkout/Success'
import MyOrders from './Pages/Orders/MyOrders'
import Addreview from './Pages/Review/Addreview'


const Router=()=>{
    return(
        <Routes>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/' element={<UserAuthGuard><Books/></UserAuthGuard>}></Route>
        <Route path='/books/:id' element={<UserAuthGuard><Book/></UserAuthGuard>}></Route>
        <Route path='/dashboard' element={<AdminAuthGuard><Dashboard/></AdminAuthGuard>}></Route>
        <Route path='/cart' element={<UserAuthGuard><UserCart/></UserAuthGuard>}></Route>
        <Route path='/checkout' element={<UserAuthGuard><Checkout/></UserAuthGuard>}></Route>
        <Route path='/success' element={<UserAuthGuard><Success/></UserAuthGuard>}></Route>
        <Route path='/orders' element={<UserAuthGuard><MyOrders/></UserAuthGuard>}></Route>
        <Route path='/review/:id' element={<UserAuthGuard><Addreview/></UserAuthGuard>}></Route>
      </Routes>
    )
}
export default Router