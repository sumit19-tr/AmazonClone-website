import React from 'react';
import './ProductSection.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom';


const ProductSection = (props) => {

    const history = useHistory();

    const handleClick = (id) => {
        history.push(`/details?id=${id}`);
    }

    const renderSportsandFitness = ({ Sportsandfitness }) => {

        if (Sportsandfitness) {

            if (Sportsandfitness.length > 0) {

                return Sportsandfitness.map((item) => {

                    const id = item.productId;

                    return (
                        
                            <div 
                            key={item.productId} 
                            className="product" 
                            onClick={() => handleClick(id)} 
                            style={{ backgroundImage: `url(${item.Image})`}}></div>
                        
                    )
                })
            }

            else {
                return (
                    <div className="col-6 text-center text-muted">
                        <h5>No Data Found</h5>
                    </div>
                )
            }

        }

        else {
            return (
                <div>
                    <div className="spinner-border text-warning"></div>
                </div>
            )
        }

    }

    return (
        <>
            <section className="viewed c3" >
                <div className="viewed1">
                    <div className='position-absolute'><h3>Sports & Fitness</h3></div>
                    {renderSportsandFitness(props)}
                    
                </div>
            </section>
        </>
    )

}

export default ProductSection