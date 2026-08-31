import React, {useState, useEffect} from "react";
import "./Cart.css";
import { getImageUrl } from "../../firebase";

function Cart({item, toggleQuantity}){

    const [imgSource, setImgSource] = useState("placeholder.jpg");

    useEffect (() => {
        const fetchImage = async () => {
            const url = await getImageUrl(item.id);
            if (url) setImgSource(url);
        }; fetchImage();
    }, [item.img]);


    return(
        <div className="cartItem">
            <img src={imgSource} atl={item.name} className="cartItemImg"/>
            <div className="cartItemInfo">
                <p className="cartItemName">{item.name}</p>
                <p className="cartItemUnitPrice">${(item.price).toFixed(2)} each</p>
                <div className="toggleQuantity" id="toggleQuantity">
                    <button className="minusCheckout" onClick={() => toggleQuantity(item.id, -1)}>-</button>
                    <span className="cartItemQuantity">{item.quantity}</span>
                    <button className="plusCheckout" onClick={() => toggleQuantity(item.id, 1)} >+</button>
                </div>
            </div>
            <button className="removeBtn" onClick={() => toggleQuantity(item.id, -item.quantity)}>Remove</button>
        </div>
    )
}

export default Cart