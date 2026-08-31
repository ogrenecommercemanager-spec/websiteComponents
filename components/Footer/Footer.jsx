import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./Footer.css";

function Footer({ changeFilter }) {
    return(
        <footer className="footer">
            <div id="footerDesc" className="footerSection">
                <p id="footerTitle">Scents of Hope</p>
                <p className="footerText">Handpoured in Rochester, MN</p>
                <img src="Logo.png" alt="Scents of Hope Logo" />
            </div>
            <div id="keepInTouch" className="footerSection">
                <p className="footerTitle">Shop</p>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("seasonal")}>Seasonal</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("favorites")}>Favorites</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("home collection")}>Home Collection</p></NavLink>
                <NavLink to="/Shop#shopTopOfPage"><p className="footerText" onClick={() => changeFilter("all")}>All Candles</p></NavLink>
            </div>
            <div id="nonProfitLinks" className="footerSection">
                <p  className="footerTitle">Non profit links</p>
                <p className="footerText"><a href="https://www.cccrochester.org/cambodia" id="a">Creating Hope 4 Cambodia</a></p>
                <p className="footerText"><a href="https://inheritanceofhope.org" id="b">Inheritance of Hope</a></p>
                <p className="footerText"><a href="mailto:scentsofhope18@gmail.com" id="c">Email</a></p>
                <p className="footerText"><a href="https://www.instagram.com/hopescentsof/" id="d">Instagram</a></p>
            </div>
            <div id="help" className="footerSection">
                <p className="footerTitle">Help</p>
                <Link to="/ShippingAndReturns"><p className="footerText">Shipping & Returns</p></Link>
                <Link to="/PrivacyPolicy"><p className="footerText">Privacy Policy</p></Link> 
                <Link to="/FAQ"><p className="footerText">FAQ</p></Link> 
            </div>
            <div id="footerFooter">
                <p>@ 2026 Scents of Hope</p>
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