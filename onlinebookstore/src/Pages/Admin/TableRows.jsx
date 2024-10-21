import Button from "../../Components/Common/Button"

const TableRow=({book,fnDelete,fnEdit})=>{
    return(

        <tr>
            <td>{book.bookname}</td>
            <td>{book.authorname}</td>
            <td>{book.price}</td>
            <td>{book.quantity}</td>
            <td className="edit-delete-wrapper">
            <Button type='button' className='btn-edit' value='Edit' onClick={()=>fnEdit(book)}/>
            <Button type='button' className='btn-delete' value='Delete' onClick={()=>fnDelete(book.id)}/>
            </td>
        </tr>
    )
}
export default TableRow