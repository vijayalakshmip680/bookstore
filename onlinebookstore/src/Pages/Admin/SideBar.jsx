const SideBar=({setCurrentTab})=>{
   return(
    <aside className="sidebar">
    <h2>Admin Panel</h2>
    <ul>
        <li onClick={()=>setCurrentTab(1)}>Manage Books</li>
        <li onClick={()=>setCurrentTab(2)}>Orders</li>
        <li onClick={()=>setCurrentTab(3)}>Sales</li>
    </ul>
</aside>
   )
}
export default SideBar