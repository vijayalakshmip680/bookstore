import React from 'react';
import './searchmodal.css'; // Create a CSS file for styling
import Item from './Item';
import notFound from '../../assets/search-notfound.jpg'

const SearchModal = ({ books, fnAddtoCart,setSearchTerm }) => {
    return (
        <div className="search-results">
            {
             books.length>0 &&
            <h2>Search Results</h2>
            }
             <span className='clear-serach' onClick={()=>setSearchTerm('')}>Clear</span>
            <div className='search-items-wrapper'>
            {
                
                  books?.map((book, index) => (
                    <Item book={book} key={index} fnAddtoCart={fnAddtoCart} />
                ))
            }
              {
                books.length===0 && <div className='not-foundwrapper'>
                    <h3>No Results Found</h3>
                    <p>We couldn't find any books matching your search.</p>
                    <div className="not-found-image">
                            <img src={notFound} alt="Not Found" />
                        </div>
                </div>
            }
            </div>
          
        </div>
    );
};

export default SearchModal;
