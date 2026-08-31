import React from "react";
import "./ScentDescription.css";

function ScentDescription({ isScentDescriptionActive, toggleDescription, scentInfo, addToCart }){

    return(
            <div className={`ListingSidePanel ${isScentDescriptionActive ? "Active" : ""}`} >
                <button className="ListingSidePanelCloseBtn" onClick={() => toggleDescription()}>x</button>
                <div id="scentProfileTop">
                    <p id="listingCardScentProfile">Scent Profile</p>
                    <p id="ScentProfileName">{scentInfo.name}</p>
                </div>
                <div id="scentProfileBottom">
                    <div id="scentProfileBoxContiner">
                        <div className="scentProfileBox">
                            <p className="scentBoxLabel">PRICE</p>
                            <p className="scentBoxValue">${Number(scentInfo.price).toFixed(2)}</p>
                        </div>
                        <div className="scentProfileBox">
                            <p className="scentBoxLabel">DONATION</p>
                            <p className="scentBoxValue">25% of sale</p>
                        </div>
                        {scentInfo.collection !== "" && (<div className="scentProfileBox">
                            <p className="scentBoxLabel">COLLECTION</p>
                            <p className="scentBoxValue">{scentInfo.collection === "Home Collection" ? "Home" : scentInfo.collection === "Favorites" ? "Favorites Plus": scentInfo.collection}</p>
                        </div>)}
                        {scentInfo.sale && (<div className="scentProfileBox">
                            <p className="scentBoxLabel">SALE</p>
                            <p className="scentBoxValue">ON SALE!!!</p>
                        </div>)}
                    </div>
                    
                    <p id="scentProfileDesc">{scentInfo.desc}</p>
                    <button id="scentProfileAddToCart" onClick={() => addToCart(scentInfo)}>+ Add to Cart</button>
                </div>
            </div>
    )
}

export default ScentDescription;