const CategoryItems=({category})=>{
    return(
        <>
        {
           <div className="category-items">
           {category?.books?.map((cat, index) => (
               <span className="category-item" key={index}>
                   {cat.name}
               </span>
           ))}
        </div>
                
        }
        </>
    )
}
export default CategoryItems