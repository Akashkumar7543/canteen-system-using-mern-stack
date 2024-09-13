import React from 'react';
import '../Styles.css';
function Featured() {
    return (
        <div className='custom-container featured w-11/12 mx-auto'>
            <div className='featured-section1'>
                <h2 style={{ color: "black" , fontSize: "2em" }}>New Launches</h2>
            </div>
            <div className='featured-section2'>
                <a href='/newarival'>
                <div className='featured-section2-part11'>
                       <span >New Launches</span>
                       {/* <span className='title'>Launches</span>  */}
                </div>
                </a>
                
                <div className='featured-section2-part2'>
                    <div className='featured-section2-part2-part1'>
                    <a href='/'>
                        <div className='featured-section2-part2-part1-cardd'>
                            <div className='pricee'>Rs 100</div>
                            <div className='image'><img src='./images/category_images/pngegg (1).png'></img></div>
                             <div className='title'> Pesticides</div> 
                        </div>
                        </a>
                        <div className='featured-section2-part2-part1-cardd'>
                            <div className='pricee'>Rs 150</div>
                            <div className='image'><img src='./images/category_images/pngegg (4).png'></img></div>
                            <div className='title'>Pizza</div>
                        </div>
                        <div className='featured-section2-part2-part1-cardd'>
                            <div className='pricee'>Rs 50</div>
                            <div className='image'><img src='./images/category_images/pngwing.com (3).png'></img></div>
                            <div className='title'>Combos</div>
                        </div>
                    </div>
                    <div className='featured-section2-part2-part2'>
                        <div className='featured-section2-part2-part2-card11'>
                        <div className='price'>Rs 70</div>
                            <div className='image'><img src='./images/category_images/0d6c21c26e61e533a6430d5a555f5282.png'></img></div>
                            <div className='title'>Thali</div>
                        </div>
                        <div className='featured-section2-part2-part2-card22'>
                            <div className='section1'>
                                <div className='section1-content'>
                                <h4 className="fisstname" style={{ color: "green" , fontSize: "2em" }}> Last Order By {localStorage.getItem('firstName')}</h4>
                                    <span>Get ready to embark on a delightful journey with our Scrumptious Dessert Extravaganza. <br></br>At the Amity Cafeteria! </span>
                                </div>
                                <a href='#'><div className='section1-offer'>Order Again</div></a>
                            </div>
                            <div className='section2'>
                                <img src='./images/category_images/pngwing.com (1).png' width="480px"></img>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>             
    );
}
export default Featured;