import React, {useState} from "react";
import "./RequestsAndFeedback.css";
import { db, appCheck } from "../../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getToken } from "firebase/app-check";
import { data, useNavigate } from "react-router-dom";

function RequestsAndFeedback({ currentUser }){
    const navigate = useNavigate();

    const handleSubmit = async () => {
         console.log("RequestsAndFeedback currentUser:", currentUser);
        if (currentUser === null) {
            navigate("/LogIn");
            return { success: false, message: 'must be logged in to send a message'};
        }

        try{
            const { token: appCheckToken } = await getToken(appCheck, false);
            const idToken = await currentUser.getIdToken();

            const response = await fetch("https://us-central1-sohwebsite-d3695.cloudfunctions.net/recordInteration", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Firebase-AppCheck": appCheckToken,
                    "Authorization": `Bearer ${idToken}`,
                },
                body: JSON.stringify({
                    data: {
                        ...message,
                        status: "received",
                        businessID: businessID,
                        interactionType: "message",
                    }
                })
            })

            if (!response.ok) {
                throw new Error(`Email send failed: ${response.status}, ${response.statusText}`)
            }

            return { success: true }
        } catch (err) {
            console.log("Failed to submit: ", err);
        }

    }

    const [message, setMessage] = useState({
        name: "",
        phone: "", 
        email: "",
        comments: ""
    })

    const businessID = "scentsOfHope";

    const updateMessage = (event) => {
        setMessage({ ...message, [event.target.id]: event.target.value});
    }

    const submitMessage = async (event) => {
        console.log("first")
        event.preventDefault();
        console.log('second')
        const form = event.target;
        console.log('third')
        if (!form.checkValidity()) {
            form.reportValidity();
            return; 
        }
        console.log('fourth')
        try {
            console.log("Calling handle submit")
            const result = await handleSubmit();

            if (result.success === false) {
                alert(result.message);
                return
            }

            alert("Message sent! Thank you for your input.");
            setMessage({ name: "", phone: "", email: "", comments: "" });

        } catch (error) {
            console.error("Error saving message:", error);
            alert("Something went wrong sending your message. Please try again.");
        }
    };

    return(
        <form id="requestsFeedbackContainer" onSubmit={submitMessage}>
            <h2 id="RequestsHeaders">Special Requests & Feedback</h2>
            <div id="requestsBox">
            <div id="requestsUpperBox" className="requestsTextBoxDiv">
                <div id="nameBox">
                    <label htmlFor="name">Name</label>
                    <input  className="requestsTextBoxDiv" 
                            id="name" 
                            type="text" 
                            placeholder="John Doe" 
                            maxLength="40" 
                            minLength="2" 
                            required
                            value={message.name}
                            onChange={updateMessage}/>
                </div>
                <div id="phoneBox">
                    <label htmlFor="phone">Phone Number</label>
                    <input  className="requestsTextBoxDiv" 
                            id="phone" 
                            type="tel" 
                            placeholder="123-456-7890" 
                            maxLength="12" 
                            minLength="7" 
                            required
                            value={message.phone}
                            onChange={updateMessage}/>
                </div>
            </div>
            <div id="emailBox" className="textBoxDiv">
                <label htmlFor="email">Email</label>
                <input  className="requestsTextBoxDiv" 
                        id="email" 
                        type="email" 
                        placeholder="yourEmail@gmail.com" 
                        maxLength="40" 
                        min="5"
                        required
                        value={message.email}
                        onChange={updateMessage}/>
            </div>
            <div id="commentBox" className="textBoxDiv">
                <label htmlFor="comments">Comments</label>
                <textarea  className="requestsTextBoxDiv" 
                        id="comments" 
                        placeholder="Ask Scents of Hope for a special request or give us feedback."
                        maxLength="600" 
                        required
                        value={message.comments}
                        onChange={updateMessage}/>
            </div>
                <button id="submitComment" type="submit">Submit</button>
            </div>
        </form>
    )
}

export default RequestsAndFeedback