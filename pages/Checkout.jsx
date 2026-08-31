import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.css"
import Cart from "../components/Cart/Cart";
import Paypal from "../components/paypal/paypal";

function Checkout({total, cart, toggleQuantity, setCart, numCandles, currentUser}) {

    const navigate = useNavigate();

    useEffect(() => {
        if (cart.length == 0) {
            alert("Your cart is empty! Returning to the home page")
            navigate("/");
            return
        }

        if (currentUser === null) {
            alert("Must be signed in to purchase candles");
            navigate("/LogIn");
            return
        }
    }, [cart.length, navigate]);

    const [shipping, setShipping] = useState(false);
    const shippingCost = shipping ? (numCandles > 2) ? 20 : 10 : 0;

    const toggleShipping = (deliveryOption) => {setShipping(deliveryOption)}

    const totalDonation = total * 0.25;
    const totalTax = total * 0.0813;
    const totalCost = Number((total + totalTax + shippingCost).toFixed(2));

    return(
    <div id="checkoutContainer">
        <div id="checkoutHeader">
            <p id="checkoutP">Checkout</p>
        </div>
        <div className="checkoutList">
            <div id="yourCartHeader">
                <p id="checkoutMyCart">Your Cart</p>
                <p id="numCandles">{numCandles} candles</p>
            </div>
            <div id="checkoutItemsContainer">
                {cart.map(item => (
                <Cart   key={item.id}
                        item={item}
                        toggleQuantity={toggleQuantity}/>
                ))}
                {cart.length == 0 && <p>Your Cart is Empty</p>}
            </div>
        </div>
        <div className="checkoutSummary">
            <p id="orderSummary">Order Summary</p>
            <div className="deliveryToggle" id="deliveryToggle">
                <p id="deliveryMethodLabel">Delivery Method</p>
                <button id="shippingBtn" 
                        className={`deliveryBtn ${shipping ? "active" : ""}`} 
                        onClick={() => toggleShipping(true)}
                    >
                    <span className="outterSpan"><span className="innerSpan"></span></span>
                    <div className="shippingMiddle">
                        <p className="shippingName">Standard Shipping</p>
                        <p className="shippingDetail">3-10 business days</p>
                    </div>
                    <p className="shippingPriceTag">$10</p>
                    </button>
                <button id="pickupBtn" 
                        className={`deliveryBtn ${!shipping ? "active" : ""}`} 
                        onClick={() => toggleShipping(false)}
                    >
                    <span className="outterSpan"><span className="innerSpan"></span></span>
                    <div className="shippingMiddle">
                        <p className="shippingName">Rochester, MN Pickup</p>
                        <p className="shippingDetail">We will send an email</p>
                    </div>
                    <p className="shippingPriceTag">Free</p>
                    </button>
            </div>
            <div id="orderDetails">
                <p id="orderSubTotal" className="orderDetailsP">Subtotal ({numCandles} candles) <span id="orderSubTotalSpan">${(total).toFixed(2)}</span></p>
                <p id="orderDonation" className="orderDetailsP">Donation (25%) <span>${(totalDonation).toFixed(2)}</span></p>
                {shipping ? (<p className="orderDetailsP">Shipping<span>${shippingCost}</span></p>) : (<p className="orderDetailsP">Pickup<span>Free</span></p>)}
                <p id="orderTax" className="orderDetailsP">Sales Tax (8.13%) <span>${(totalTax).toFixed(2)}</span></p>
                <p id="orderTotal" className="orderDetailsP">Total <span>${(totalCost).toFixed(2)}</span></p>
            </div>
        </div>
        <div id="paymentOptions">
            <p id="paymentP">Payment</p>
            <Paypal totalCost={totalCost} cart={cart} setCart={setCart} total={total} shipping={shipping} numCandles={numCandles} currentUser={currentUser}/>
        </div>
    </div>
    )
}

export default Checkout