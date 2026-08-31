import React, {useState} from "react";
import "./FilterBtns.css";

function FilterBtns({changeFilter, filter, sale, toggleSale}){

    return(
    <div id="filterBtnContainer">
            <button id="all" className={`filterBtn ${filter == "all" ? "active" : ""}`} onClick={() => changeFilter('all')}>All</button>
            <button id="favorites" className={`filterBtn ${filter == "favorites" ? "active" : ""}`} onClick={() => changeFilter('favorites')}>Favorites</button>
            <button id="seasonal" className={`filterBtn ${filter == "seasonal" ? "active" : ""}`} onClick={() => changeFilter('seasonal')}>Seasonal</button>
            <button id="homeCollection" className={`filterBtn ${filter == "home collection" ? "active" : ""}`} onClick={() => changeFilter('home collection')}>Home</button>
            <button id="sale" className={`filterBtn ${sale ? "active" : ""}`} onClick={() => toggleSale()}>Sale</button>
    </div>
    )
}

export default FilterBtns