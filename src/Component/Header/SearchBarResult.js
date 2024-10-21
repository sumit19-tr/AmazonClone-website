import React from 'react'
import { Link, useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function SearchBarResult({ result, hideList }) {

    const history = useHistory();
    const handleClick = (value) => {
        //console.log("handleClick value", value);
        history.push(`/details?id=${result.productId}`)
    }

    return (
        <>
            <div className="SearchBarResult" style={hideList}>
                <Link to={`/details?id=${result.productId}`} className="searchbar-result-list" onClick={(e) => handleClick(e.target.value)} style={hideList} >{result.product_name} <small>in {result.category}</small> </Link>
            </div>
        </>
    )
}

export default SearchBarResult