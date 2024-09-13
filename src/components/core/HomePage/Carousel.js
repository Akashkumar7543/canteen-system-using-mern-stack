import React from 'react';
import '../Styles.css';
import { Size } from '@syncfusion/ej2-charts/src/sparkline/utils/helper';

function Carousel() {
    return (
        
        <div className='custom-container w-11/12 mx-auto'>
            <div className='card-section1'>
                <h1 className="fisstname" style={{ color: "black" , fontSize: "3em" }}> Hii {localStorage.getItem('firstName')} Welcome to Amity Cannten </h1> <h1 className="welcome" style={{ color: "#33cabb", fontSize: "3em"}}>Nexus.....</h1>
                {/* <br></br> */}
                {/* <h2>Thanks For Vist</h2> */}
                <h3 className="mt-4"style={{ color: "black" , fontSize: "1.4em" }} >Order Now Your Favourite Food</h3>
                
               
            </div>
            <div className='card-section2' >
                <div id="carouselExampleDark" className="carousel carousel-dark slides" data-bs-ride="carousel" >
                    <div className="carousel-indicators">
                        <button  data-bs-target="#carouselExampleDark" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="1" aria-label="Slide 2"></button>
                        <button type="button" data-bs-target="#carouselExampleDark" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    </div>
                    <div className="carousel-inner">
                        <div className="carousel-item active" data-bs-interval="10000">
                            <div className='card3'>
                                <div className='discount'> 
                                     <span className='dis'>15% Discount</span> 
                                 </div> 
                                <div className='custom-container card3-elements'>
                                    <div className='card3-element1'>
                                        <span className='name'>Recommended For You</span><br />
                                        <span className='about'>Recommended Food As Per Previous Order<br></br>Special Offer <br></br>Enjoy 15% Off on any recommended dish!</span>
                                        <br />
                                        <br />
                                        {/* <span className=' old-price about'>$2000 </span> */}
                                        {/* <span className='name'> From</span> */}
                                        {/* <span className='new-price'> $1000</span> */}
                                        <div className='buy-btn'>
                                            <button className='buy'>VIEW NOW</button>
                                        </div>
                                    </div>
                                    <div className='card3-element2'>
                                        <img src='./images/category_images/pngwing.com (2).png'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item" data-bs-interval="2000">
                            <div className='card3'>
                                <div className='discount'>
                                <span className='dis'>50% Discount</span>
                                </div>
                                <div className='custom-container card3-elements'>
                                    <div className='card3-element1'>
                                        <span className='name'>New Launches Desserts</span><br />
                                        <span className='about'>latest indulgences at the Amity Cafeteria! <br></br>Chocolate Lava Cake, Velvety Cheesecake</span>
                                        <br />
                                        <br />
                                      
                                        <span className='name'> Starting At</span>
                                        <span className='new-price'> Rs100</span>
                                        <div className='buy-btn'>
                                            <button className='buy'>ORDER NOW</button>
                                        </div>
                                    </div>
                                    <div className='card3-element2'>
                                        <img src='./images/category_images/pngwing.com (1).png'></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <div className='card333'>
                                
                           
                                </div>
                                <div className='custom-containerr card33-elements'>
                                   
                                    <div className='card3-element22'>
                                        <img src="./images/category_images/addvit.png"></img>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="prev">
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleDark" data-bs-slide="next">
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
      
    );
}
export default Carousel;
