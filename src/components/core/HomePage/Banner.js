import React from "react";
import '../Styles.css'

function Banner(props) {
    const banner = props.banner;
    return (
        <div className="banner custom-container">
            {/* <img src={banner}></img> */}
        </div>
    );
}

export default Banner;
