import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { getAdminBooks, getAdminCategories, getBooks, getCategories } from "../../features/bookSlice"
import './admin.css'
import SideBar from "./SideBar"
import MainContent from "./MainContent"
import Header from "../../Components/Layout/Header"
import UserOrders from "./UserOrders"
import Sales from "./Sales"
import { getAllOrder } from "../../features/Slices/orderSlice"
import MobileSideBar from "./MobileSideBar"
import Menu from '../../assets/rounded__menu-512.webp'
const Dashboard=()=>{

    const {books,isLoading,pagetotal,categories}=useSelector((state)=>state.books)
    const{orders,isStatusChanged}=useSelector((state)=>state.orders)
    const dispatch=useDispatch()
    const [page,setPage]=useState(1)
    const perPage=10
    const total=pagetotal
    const totalPages=Math.ceil(total/perPage)
    const [popupForm,setPopupForm]=useState(false)
    const [deletePopup,setDeletePopup]=useState(false)
    const [deleteid,setDeleteid]=useState('')
    const [currentTab,setCurrentTab]=useState(1)
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const deleteConfigurations={
        deletePopup,
        setDeletePopup,
        deleteid,
        setDeleteid,
    }

    //reusing need to change
    const fnPrevPage=()=>{
        if(page>1) setPage((page)=>page-1)
    }
    const fnNextPage=()=>{
        if(page<totalPages) setPage((page)=>page+1)
    }
    const fnChangePage=(page)=>{
        setPage(page)
    }
    const paginationPropsValues={
        page,
        setPage,
        total,
        perPage,
        fnPrevPage,
        fnChangePage,
        fnNextPage,
        totalPages
    }
    
    const [edit,setEdit]=useState({
        isEdit:false,
        value:[]
    })
    useEffect(() => {
        dispatch(getAdminBooks({page,limit:10}))
    }, [page,isStatusChanged])

    useEffect(()=>{
        dispatch(getAdminCategories())
    },[])
    // calling method for getting order data
    useEffect(()=>{
        dispatch(getAllOrder())
    },[])

    const fnEdit=(bookData)=>{
        setEdit(
            {
                isEdit:true,
                value:bookData
            }
        )
        setPopupForm(true)
    }
    return(
        <div>
            <Header/>
            <h2 className="dashboard-heading">Dashboard</h2>
             <span className="mobile-menu" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                <img className="menu-icon" src={Menu} alt="mobile menu"/>
             </span>
                {
                    isSidebarOpen && 
                <MobileSideBar setCurrentTab={setCurrentTab} setIsSidebarOpen={setIsSidebarOpen}/>
                }
            <div className="dashboard">
                <SideBar setCurrentTab={setCurrentTab}/>
                {
                currentTab===1 &&
                <MainContent books={books} setPopupForm={setPopupForm} popupForm={popupForm} fnEdit={fnEdit} edit={edit} setEdit={setEdit} paginationPropsValues={paginationPropsValues} isLoading={isLoading} deleteConfigurations={deleteConfigurations} categories={categories}/>
                }
                {
                currentTab===2 &&
                    <UserOrders orders={orders}/>
                }
                     {
                currentTab===3 &&
                    <Sales orders={orders}/>
                }
            </div>


        </div>
    )
}
export default Dashboard