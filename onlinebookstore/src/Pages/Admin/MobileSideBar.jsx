const MobileSideBar = ({ setCurrentTab,setIsSidebarOpen }) => {
    const handleTabClick=(tabIndex)=>{
        setCurrentTab(tabIndex);
        setIsSidebarOpen(false);
    }
    return (
        <div className="mobile-sidebar">
            <ul>
                <li onClick={() => handleTabClick(1)}>Manage Books</li>
                <li onClick={() => handleTabClick(2)}>Orders</li>
                <li onClick={() => handleTabClick(3)}>Sales</li>
            </ul>
        </div>
    )
}
export default MobileSideBar