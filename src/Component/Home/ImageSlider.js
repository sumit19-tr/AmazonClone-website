import React from 'react';

const ImageSlider = () => {
    return (
        <>
            <div id="carouselExampleDark" className="carousel carousel-dark slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" data-bs-interval="20000">
                    <img src="https://i.ibb.co/x3tFPh5/Imaga-Slider-Img1.jpg" className="d-block w-100" alt="..." />
                    
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://i.ibb.co/gT4LQQN/Imaga-Slider-Img2.jpg" className="d-block w-100" alt="..."/>
                           
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://i.ibb.co/44g6FKH/Imaga-Slider-Img3.jpg" className="d-block w-100" alt="..."/>
                            
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://i.ibb.co/VgDBRt3/Imaga-Slider-Img4.jpg" className="d-block w-100" alt="..."/> 
                    </div>
                    <div className="carousel-item" data-bs-interval="2000">
                        <img src="https://i.ibb.co/kGnY5Jw/Imaga-Slider-Img5.jpg" className="d-block w-100" alt="..."/> 
                    </div>
                </div>
                
            </div>


        </>
    );
};

export default ImageSlider;
