const Input=({value,name,type,id,className,placeholder='',onChange=()=>{},onFocus=()=>{}})=>{
    return(
        <input value={value} name={name} type={type} id={id} className={className} placeholder={placeholder} onChange={onChange} onFocus={onFocus}/>
    )
}

export default Input