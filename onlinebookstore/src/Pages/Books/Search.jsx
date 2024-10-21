import { useEffect, useState } from "react"
import Input from "../../Components/Common/Input"
import SearchIcon from "../../assets/Search-icon.png"
import useDebounce from "../../Hooks/useDebounce"
import SearchModal from "./SearchModal"
import { useDispatch, useSelector } from "react-redux"
import { getSearch } from "../../features/bookSlice"
import searchclose from "../../assets/cross-icon.png"

const Search=({fnAddtoCart})=>{
    const [searchTerm,setSearchTerm]=useState('')
    const [serachResult,setSearchResult]=useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch=useDispatch()
    const {searchData}=useSelector((state)=>state.books)

    const debouncedSearchTerm=useDebounce(searchTerm,300)   // 300 s debounce

    useEffect(()=>{

        if(debouncedSearchTerm){

            // call the api for search
            dispatch(getSearch(searchTerm))
            setIsModalOpen(true)
        }
    },[debouncedSearchTerm])
    const handleSearch=(e)=>{
        setSearchTerm(e.target.value)

    }
    return(
        <div className="search-wrapper">

            <Input className="search-input" name='search' placeholder="Search by title, author or genre...." value={searchTerm} onChange={handleSearch}/>
            <img src={SearchIcon} className="searchiconimg"/>
            {/* <img src={searchclose} className="searchclose"/> */}
            {
                isModalOpen && searchTerm.length>0  && <SearchModal books={searchData} fnAddtoCart={fnAddtoCart} setSearchTerm={setSearchTerm}/>
            }

        </div>
    )
}
export default Search