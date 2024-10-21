import { useState } from "react"

const usePagination=(initialPage=1,totalPages)=>{

    const [page,setPage]=useState(initialPage)

    const fnPrevPage = () => {
        if (page > 1) setPage((page) => page - 1)
    }
    const fnNextPage = () => {
        if (page < totalPages) setPage((page) => page + 1)
    }
    const fnChangePage = (page) => {
        setPage(page)
    }

    return {
        page,
        fnNextPage,
        fnChangePage,
        fnPrevPage
    }
}
export default usePagination