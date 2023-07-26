import React, { useState } from 'react'
import SearchBarResultList from './SearchBarResultList';
import axios from 'axios';

function SearchBar(props) {

    const [input, setInput] = useState("");
    const [result, setResult] = useState([]);
    const [selectedOption, setSelectedOption] = useState('0');
    const [selectedOptionName, setSelectedOptionName] = useState("All");

    const [hideList, setHideList] = useState(
        { display: 'none' }
    );


    const fetchAllProductData = async (value) => {
        let category_id = null;
        if (selectedOption === '0') {
            category_id = "0";
        }
        else if (selectedOption === '1') {
            category_id = 1;
        }
        else if (selectedOption === '2') {
            category_id = 2;
        }
        else if (selectedOption === '3') {
            category_id = 3;
        }
        else if (selectedOption === '4') {
            category_id = 4;
        }

        if (category_id === "0") {
            let response = await axios.get("https://amazon-clone-restapi-production.up.railway.app/product");

            let data = response.data;
            const result = data.filter((user) => {
                return value && user && user.product_name && user.product_name.toLowerCase().includes(value);
            })
            setResult(result);
        }
        else {
            let response = await axios.get(`https://amazon-clone-restapi-production.up.railway.app/products/${category_id}`);

            let data = response.data;
            const result1 = data.filter((user) => {
                return value && user && user.product_name && user.product_name.toLowerCase().includes(value);
            })
            setResult(result1);
        }
    }

    const handleChange = (value) => {
        setInput(value)
        fetchAllProductData(value)
        setHideList(
            { display: 'block' }
        )
    }

    const handleChange2 = async (event) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);

        if (selectedValue === '0') {
            setSelectedOptionName("All");
        }
        else {
            let response = await axios.get(`https://amazon-clone-restapi-production.up.railway.app/products/${selectedValue}`);
            let data = response.data[0];
            const result = data.category;
            setSelectedOptionName(result);
        }
    }

    return (
        <>
            <div className='searchBar'>
                <select value={selectedOption.toString()} onChange={(e) => handleChange2(e)} name="category" onMouseUp={props.setBorder} style={props.select}>
                    <option value='0'>{selectedOptionName}</option>
                    {props.catagory}
                </select>
                <input type="text" className="input1" onMouseUp={props.setBorder1} style={props.input1}
                    value={input} placeholder={`search in ${selectedOptionName}`} onChange={(e) => handleChange(e.target.value)} />
                <button type="submit" className="btn1"><i className="fa fa-search "></i></button>
                <div className='searchBarCopy' style={hideList}>
                    <SearchBarResultList result={result} hideList={hideList} />
                </div>
            </div>
        </>
    )
}

export default SearchBar