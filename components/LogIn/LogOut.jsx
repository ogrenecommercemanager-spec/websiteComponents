import React from "react"
import "./LogIn.css";
import { auth } from "../../firebase";
import { signOut } from "firebase/auth";


function LogOut() {

    const handleSignOut = async () => {
        await signOut(auth);
    }

    return (
        <div className="logInOutContainer" id="logOutPageContainer">
            <div className="logInOutTopOfPage" id="logOutTopOfPage"></div>
            <div className="logInOutTitleContainer" id="logOutTitleContainer">
                <h2>Log out</h2>
                <p className="logInOutSubtitle" id="logOutSubtitle">Logged in as: {auth.currentUser.displayName}</p>
            </div>
            <div className="logInOutFormContainer" id="logOutFormContainer">
                <button className="logInOutGoogleBtn" onClick={handleSignOut}>Log Out</button>
            </div>
        </div>
    )
}

export default LogOut