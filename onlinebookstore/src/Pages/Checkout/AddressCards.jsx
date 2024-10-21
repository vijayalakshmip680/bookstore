import './addresscard.css'
const AddressCards=({myadd,fnChangeActiveAddress})=>{

    return(
        <div className='address-card' onClick={()=>fnChangeActiveAddress(myadd.id)}>
            <div className={`card-item ${myadd.active?'activeadd':''}`} >

            <p>{myadd.house}</p>
            <p>{myadd.area}</p>
            <p>{myadd.city}</p>
            <p>{myadd.pin}</p>
            </div>
        </div>
    )
}
export default AddressCards