import { useDispatch } from "react-redux";
import Button from "../../Components/Common/Button"
import { IoCloseCircle } from "react-icons/io5";
import { deleteBook } from "../../features/bookSlice";

const ConfirmationPopup=({deleteConfigurations})=>{
    const {deletePopup,setDeletePopup,deleteid,setDeleteid}=deleteConfigurations
    const dispatch=useDispatch()

    const fnConfirmDelete=()=>{
        if(deleteid){
            const ID=deleteid
            setDeletePopup(false)
            setDeleteid('')
            dispatch(deleteBook(ID))
        }
    }
    return(
        <div className="addnew-modal">
            <div className='confirmation-modal-cover'>
            <span className='cancel-close' onClick={()=>setDeletePopup(false)}><IoCloseCircle /></span>
                <h4>Are You Sure ?</h4>
                <p>Are you sure you want to delete this item.? This action cannot be undone</p>
                <div className="cancel-delete-wrapper">
                <Button className="btn-cancel" value="Cancel" type="button" onClick={()=>setDeletePopup(false)}/>
                <Button className="btn-confirm" value="Delete" type="button" onClick={fnConfirmDelete}/>
                </div>
            </div>
        </div>
    )
}
export default ConfirmationPopup