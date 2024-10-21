const Button=({type,className,value,onClick=()=>{}})=>{
    return(
        <button type={type} className={className} onClick={onClick}>{value}</button>
    )
}
export default Button