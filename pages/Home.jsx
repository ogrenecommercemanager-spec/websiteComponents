import React from "react";
import FrontPageContainer from "../components/FrontPageContainer/FrontPageContainer.jsx";
import CandleCollections from "../components/CandleCollections/CandleCollections.jsx";
import AboutMe from "../components/AboutMe/AboutMe.jsx";
import RequestsAndFeedback from "../components/RequestsAndFeedback/RequestsAndFeedback.jsx";

function Home({changeFilter, cart, currentUser }){

    return(
        <div id="HomeBody">
            <FrontPageContainer />
            <CandleCollections changeFilter={changeFilter}/>
            <AboutMe />
            <RequestsAndFeedback  currentUser={currentUser}/>
            <div id="bottomOfPage"></div>
        </div>
    )
}

export default Home