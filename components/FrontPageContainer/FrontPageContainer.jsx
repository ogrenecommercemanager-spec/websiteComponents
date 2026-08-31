import React from "react";
import "./FrontPageContainer.css";

function FrontPageContainer(){
    return(
        <div id="topOfPageContainer">
            <span id="frontPageSpan"><img id="frontPageLogo" src="/Logo.png" alt="Scents of Hope Logo Image"/></span>
            <p id="subLogo">Handpoured soy candles • Rochester, MN</p>
            <p id="brandName">Scents of Hope</p>
            <p id="slogan">Made with purpose for a purpose</p>
            <p id="donationSlogan">25% of sales are donated to charity</p>
        </div>  
    )
}

export default FrontPageContainer;