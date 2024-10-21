
import './pagination.css'
const Pagination=({paginationPropsValues})=>{
    const {page,perPage,total,fnPrevPage,fnChangePage,fnNextPage,totalPages}=paginationPropsValues

    return(
        <div className="pagination">
            <div className="pagination-wrapper">
                {
                    page!==1 && 
                <button className={`btn-prev ${page===1?'disable':''}`} onClick={fnPrevPage}>Prev</button>
                }
                <div className='page-count-wrapper'>

                {
                   Array.from({length:Math.ceil(total/perPage)},(_,i)=>i+1)?.map((pagenumber,index)=>
            
                        <span className={`pagecount ${pagenumber===page?'active':''}`} key={index} onClick={()=>fnChangePage(pagenumber)}>{pagenumber}</span>
                    )
                }
                </div>

                    {
                        page!==totalPages &&
                <button className={`btn-next ${page===totalPages?'disable':''}`} onClick={fnNextPage}>Next</button>
                    }
            </div>
        </div>
    )
}

export default Pagination