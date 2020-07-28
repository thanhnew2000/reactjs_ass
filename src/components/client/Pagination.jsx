import React from 'react'
import PropTypes from 'prop-types'

function Pagination({productPerPage,totolProduct,paginate}) {

    const  pageNumbers =[];
    for(let i = 1 ; i <= Math.ceil(totolProduct / productPerPage);i++){
        pageNumbers.push(i)
    }
    return (
        <div>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=> paginate(number)} className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

Pagination.propTypes = {

}

export default Pagination

