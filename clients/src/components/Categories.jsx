import React from 'react'
import { categories } from '../data'

const Categories = () => {
    return (
        <div className='categories'>
            <h1>Explore Top categories</h1>
            <p>Explore our wide range of vacation rentals that cater to all types of travelers. immerse yourself in the local culture, enjoy the comforts of home, and create unforgettable memories in your dream destination</p>
            <div className="categories_list">
                {categories ?.slice(1,7).map((category,index)=>(
                    <Link to="" ></Link>
                ))}
            </div>
        </div>
    )
}

export default Categories
