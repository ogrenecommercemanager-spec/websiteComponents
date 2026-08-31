import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";

function Footer({ changeFilter }) {
    return(
        <footer className="footer">
            <div id="footerDesc" className="footerSection">
                <p id="footerTitle">Business name</p>
                <p className="footerText">Hand crafted in Hometown, USA</p>
                <img src="Logo.png" alt="Business Logo" />
            </div>
            <div id="keepInTouch" className="footerSection">
                <p className="footerTitle">Shop</p>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("seasonal")}>Seasonal</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("favorites")}>Favorites</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("home collection")}>Home Collection</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("all")}>All</p></NavLink>
            </div>
            <div id="nonProfitLinks" className="footerSection">
                <p  className="footerTitle">Non profit links</p>
                <p className="footerText"><a href="link 2" id="a">Charirty one</a></p>
                <p className="footerText"><a href="link 1" id="b">charity 2</a></p>
                <p className="footerText"><a href="mailto:email@gmail.com" id="c">Email</a></p>
                <p className="footerText"><a href="https://www.instagram.com/" id="d">Instagram</a></p>
            </div>
            <div id="help" className="footerSection">
                <p className="footerTitle">Help</p>
                <Link to="/ShippingAndReturns"><p className="footerText">Shipping & Returns</p></Link>
                <Link to="/PrivacyPolicy"><p className="footerText">Privacy Policy</p></Link> 
                <Link to="/FAQ"><p className="footerText">FAQ</p></Link> 
            </div>
            <div id="footerFooter">
                <p>@ 2026 OEM</p>
                <div id="footerFooterLinks">
                    <Link to="/ShippingAndReturns"><p className="footerText">Shipping & Returns</p></Link>
                    <Link to="/PrivacyPolicy"><p className="footerText">Privacy Policy</p></Link> 
                    <Link to="/FAQ"><p className="footerText">FAQ</p></Link> 
                </div>
            </div>
        </footer>
    )
}
export default Footer;
