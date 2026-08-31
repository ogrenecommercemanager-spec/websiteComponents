import React from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";
import "./CartSideBar.css";
import Cart from "../Cart/Cart";


function CartSideBar({  toggleCart, 
                        isOpen, 
                        toggleQuantity, 
                        cart, 
                        total,
                        setCartOpen,
                    }) {
    const isCartEmpty = cart.length === 0;

    const location = useLocation();
    const navigate = useNavigate();

    const checkShopPage = () => {
        if (!location.pathname.includes('/Shop')) {
            navigate("/Shop#shopTopOfPage");
        }
        setCartOpen(false);
    }

    return (
        <div id="cartSideBar" className={isOpen ? "open" : "closed"}>
            <div className="cartHeader">
                <h2 id="cartHeaderTitle">Your Cart</h2>
                <button className="closeCart" onClick={toggleCart}>x</button>
            </div>
            
            {cart.length > 0 && (<div id="cartItemsContainer">
                {cart.map(item => (
                <Cart   key={item.id}
                        item={item}
                        toggleQuantity={toggleQuantity}/>
                ))}
            </div>)}

            {cart.length === 0 && (<div id="EmptyCartContainer">
                <div id="EmptyCartHeader">
                    <img src="Logo.png" alt="Scents of Hope Logo" />
                    <p id="CartSideBarEmpty">Your Cart is Empty</p>
                    <p className="emptyCartText">Add a candle to your cart in the <a onClick={checkShopPage}>shop</a></p>
                    <p className="emptyCartText">25% of procedes get donated to charity</p>
                    <button id="cartBrowseCandles" onClick={checkShopPage}>Browse Candles</button>
                </div>
                <div id="emptyCartBtnContainer">
                    <button id="inactiveCheckout">Nothing in your cart yet</button>
                </div>
            </div>)}

            {cart.length !== 0 && (<div className="cartFooter">
                <p id="cartsubTotalPrice">Subtotal<span>${(total).toFixed(2)}</span></p>
                <p id="cartDonationPrice">Donation (25%)<span>${(total * 0.25).toFixed(2)}</span></p>
                <p id="cartTaxAmount">Tax (8.13%) <span>${(total  * 0.0813).toFixed(2)}</span></p>
                <p id="cartTotalPrice">Total<span>${(total  * 1.0813).toFixed(2)}</span></p>
                <Link to={isCartEmpty ? "#" : "/Checkout"}><button className="checkoutBtn">Proceed to Checkout</button></Link>
            </div>)}
        </div>
    );
}

export default CartSideBar;