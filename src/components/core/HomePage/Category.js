import React from "react";
import '../Styles.css'
import { Link } from "react-router-dom";
function Category(){
    return(
        <div className="custom-container category w-11/12 mx-auto">
            <div className="category-section-1">
                <h3 style={{ color: "black" , fontSize: "2em" }}> Order By Category</h3>
            </div>
            <div className="category-section-2">
            <a href="/newarival"><div className="category-card11 card-11">Desserts</div></a> 
               <a href="/newarival"><div className="category-card22 card-22">Combos</div></a> 
               <a href="/newarival"><div className="category-card33 card-33">Pizza</div></a> 
               <a href="/newarival"><div className="category-card44 card-44">Thali</div></a> 
               <a href="/newarival"><div className="category-card55 card-55">Flavor Fiesta</div></a> 
                <Link>
                <div className="category-card6 card-6">
                    {/* <img src="./images/category_images/arrow.png"></img> */}
                </div>
                </Link>
            </div>
        </div>
    );
}

export default Category;