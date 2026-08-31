import React, {useEffect, useState} from "react";
import "./ListingCard.css";
import { getImageUrl } from "../../firebase";

function ListingCard({listing, addToCart, toggleDescription, setScentInfo }){

    const openDesc = () => {setScentInfo(listing); toggleDescription()};

    let listingCollection;

    if (listing.collection === "Favorites") {
        listingCollection = "Favorites Plus";
    } else if (listing.collection === "Home Collection") {
        listingCollection = "Home";
    } else if (listing.collection === "None"){
        listingCollection = null
    } else {
        listingCollection = listing.collection
    }

    return(
        <div className="ListingCard" >
            <div id="ListingCardUpper">
                <img src={listing.img || "/Logo.png"} alt="Candle Image" className="candleCardImage"/>
                <div className="ListingCardTags">
                    {listingCollection && <span    className="ListingCardCollectionTag" 
                                                >
                                                    {listingCollection}
                                                </span>
                    }
                    {listing.sale && <span className="ListingCardOnSaleTag">Sale</span>}
                </div>
            </div>
            <div className="ListingCardDetails" id="candleDetails">
                
                <h4 className="ListingCardName"> {listing.name} </h4>
                <h4 className="ListingCardPrice">${listing.price.toFixed(2)}</h4>
                <div className="CandleCardButtons">
                    <button className="ListingCardInfoBtn"
                            onClick={() => openDesc()}
                    >
                        Scent Info
                    </button>
                    <button 
                        className="ListingCardBuyBtn"
                        onClick={() => addToCart(listing)}
                    >
                        + Add to Cart
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ListingCard;