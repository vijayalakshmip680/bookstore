import { Link } from "react-router-dom"
import "./header.css"
import HeaderMenu from "./HeaderMenu"
const Header=()=>{
    return(
        <div className="header">
            <Link to='/'><h2>BOOK STORE</h2></Link>
            <div className="menu-item">
            <HeaderMenu/>
            </div>
        </div>
    )
}

export default Header