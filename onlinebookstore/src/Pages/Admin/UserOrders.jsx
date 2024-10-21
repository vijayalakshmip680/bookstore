import { useDispatch, useSelector } from 'react-redux'
import './adminorders.css'
import OrderTable from './OrderTable'
import {updateOrderStatus} from '../../features/Slices/orderSlice'
const UserOrders=({orders})=>{
    const dispatch=useDispatch()
    const handleStatusChange=(order,newStatus)=>{
        const updateData={
            orderId:order.id,
            newStatus
        }
        dispatch(updateOrderStatus(updateData))
    }
    return(
        <div className="admin-orders">
        <h1 className='admin-order-title'>Manage Orders</h1>
        <OrderTable orders={orders} handleStatusChange={handleStatusChange}/>
    </div>
    )
}

export default UserOrders