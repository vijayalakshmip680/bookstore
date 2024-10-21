import TableRow from "./TableRows"

const TableContent=({books,fnDelete,fnEdit,isLoading})=>{
    return(
        <>
        {
            isLoading ?  <div className="load-wrapper"><div className="loader"></div></div>:<table className="books-table">

            <thead>
                <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    books?.map((book,index)=>
                        <TableRow key={index} book={book} fnDelete={fnDelete} fnEdit={fnEdit}/>
                    )
                }
            </tbody>
            </table>
        }
        </>
    )
}
export default TableContent