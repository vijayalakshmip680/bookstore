import { useDispatch } from "react-redux"
import Button from "../../Components/Common/Button"
import AddNewBook from "./AddNewBook"
import TableContent from "./TableContent"
import { deleteBook } from "../../features/bookSlice"
import Pagination from "../Books/Pagination"
import ConfirmationPopup from "./ConfirmationPopup"


const MainContent=({books,popupForm,setPopupForm,fnEdit,edit,setEdit,paginationPropsValues,isLoading,deleteConfigurations,categories})=>{
    const dispatch=useDispatch()

    const {deletePopup,setDeletePopup,deleteid,setDeleteid}=deleteConfigurations
    const fnDelete=(bookId)=>{

        if(bookId){
            setDeletePopup(true)
            setDeleteid(bookId)
        }
    }
    return(
        <>
        <main className="main-content">
            <section className="content">
                <div className="card">
                    <div className="add-new-wrapper">
                    <h3>Manage Books</h3><Button type='button' className='btn-add-new' value='Add New' onClick={()=>setPopupForm(true)}/>
                    </div>
                    <p>Here you can add, edit, or delete books in the store.</p>
                </div>
                <TableContent books={books} fnDelete={fnDelete} fnEdit={fnEdit} isLoading={isLoading}/>
                {
                    paginationPropsValues.total>0 && !isLoading &&
                <Pagination paginationPropsValues={paginationPropsValues}/>
                }

            </section>

        </main>
        {
            popupForm && 
        <AddNewBook setPopupForm={setPopupForm} edit={edit} setEdit={setEdit} categories={categories}/>
        }
        {
            deletePopup &&
            <ConfirmationPopup deleteConfigurations={deleteConfigurations}/>
        }
        </>
    )
}
export default MainContent