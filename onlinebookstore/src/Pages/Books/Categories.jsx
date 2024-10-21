import React from "react"
import CategorySkeleton from "./CategorySkeleton"

const Categories=({categories,getCategoryBooks,isLoading})=>{
    return(
        <div className="categories">
            <h4 className="categories-title">Categories</h4>
        
            {
                isLoading ?( Array.from({ length: 5 }).map((_, index) => (
                    <CategorySkeleton key={index}/>
                ))):
               categories?.map((category,index)=>
                <div className="category-item" key={index}>
                    <h5 className="category-title" onClick={()=>getCategoryBooks(category.id)}>{category.category}</h5>
                </div>         
            )
            }

        </div>
    )
}

export default Categories