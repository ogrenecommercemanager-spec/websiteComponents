import React, {useEffect, useState} from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./NavBar.css";
import { auth } from "../../firebase";


function NavBar({onCartClick, 
                cart, 
                location,
                currentUser}) {

    const numberOfItems = cart.reduce((total, item) => total + item.quantity, 0);
    const [hamburgerActive, setHamburgerActive] = useState(false);
    const navLocation = useLocation();

    useEffect(() => {
        setHamburgerActive(false);
    }, [navLocation])

    return(
        <nav className="navBar">
            {currentUser && (
                <div id="navUserName">
                    <p id="userGreeting">Welcome back,</p>
                    <p id="userDisplayName">{currentUser.displayName}</p>
                </div>
            )}
            <div id="navDrawerContainer" className={hamburgerActive ? "Active": "Inactive"}>
                <NavLink to="/#topOfPageContainer" className="navBtn">Home</NavLink>
                <NavLink to="/Shop#shopTopOfPage" className="navBtn">Shop</NavLink>
                <NavLink to="/#aboutMeContainer" className="navBtn">About</NavLink>
                <NavLink to="/#requestsFeedbackContainer" className="navBtn">Contact</NavLink>
                <NavLink to="/LogIn#logInTopOfPage" className="navBtn">Log in</NavLink>
            </div>
            {location.pathname !== "/Checkout" && (
                <div id="checkoutBtnContainer" className={hamburgerActive ? "Active": "Inactive"}>
                    <div id="checkoutBtn" onClick={onCartClick}>Checkout</div>
                    <span id="checkoutCartCounter">{numberOfItems}</span>
                </div>
            )}

            <button id="navHamburger" className={hamburgerActive ? "Active": "Inactive"} onClick={() => setHamburgerActive(prev => !prev)}>
                <span></span>
                <span></span>
                <span></span>
            </button>
        </nav>
    )
}
export default NavBar;