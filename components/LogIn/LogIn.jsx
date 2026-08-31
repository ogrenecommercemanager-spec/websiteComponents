// LogIn.jsx
import React, { useState } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import {
    signInWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup,
    sendEmailVerification,
    getAdditionalUserInfo,
    signOut
} from "firebase/auth";
import { auth } from "../../firebase";
import "./LogIn.css";

// Hardcoded per-site, same pattern as your other business-scoped functions —
// never sent by a client, always known by this deployment.
const BUSINESS_ID = "scentsOfHope"; // replace with this site's actual businessID
const CREATE_ACCOUNT_URL = "https://sohwebsite-d3695-4033c.firebaseapp.com/create_account";
const functions = getFunctions()

function LogIn({ onLoginSuccess }) {

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);
    const [unverifiedUser, setUnverifiedUser] = useState(null);
    const [resendMessage, setResendMessage] = useState("");

    function goToSignUp() {
        const params = new URLSearchParams({
            business: BUSINESS_ID,
            return: window.location.href,
        });
        window.location.href = `${CREATE_ACCOUNT_URL}?${params.toString()}`;
    }

    async function handleLogin() {
        setError("");
        setResendMessage("");
        setUnverifiedUser(null);

        if (formData.email === "" || formData.password === "") {
            setError("Please enter your email and password");
            return;
        }

        setSubmitting(true);
        try {
            const result = await signInWithEmailAndPassword(auth, formData.email, formData.password);

            if (!result.user.emailVerified) {
                setUnverifiedUser(result.user);
                setError("Please verify your email before logging in");
                return;
            }

            const confirmVerified = httpsCallable(functions, 'confirmEmailVerified');
            await confirmVerified();
            onLoginSuccess?.(result.user);
        } catch (err) {
            console.error("Login error:", err);
            if (err.code === "auth/invalid-credential") {
                setError("Incorrect email or password");
            } else {
                setError("Something went wrong, please try again");
            }
        } finally {
            setSubmitting(false);
        }
    }

    async function handleGoogleLogin() {
        setError("");
        setSubmitting(true);
        try {
            const provider = new GoogleAuthProvider();
            const result = await signInWithPopup(auth, provider);
            
            const additionalInfo = getAdditionalUserInfo(result);
            if (additionalInfo?.isNewUser) {
                await signOut(auth);

                const params = new URLSearchParams({
                    business: BUSINESS_ID,
                    return: window.location.href,
                })
                window.location.href = `${CREATE_ACCOUNT_URL}?${params.toString()}`;
                return;
            }
            onLoginSuccess?.(result.user);
        } catch (err) {
            console.error("Google login error:", err);
            setError("Something went wrong with Google sign-in, please try again");
        } finally {
            setSubmitting(false);
        }
    }

    async function handleResendVerification() {
        setResendMessage("checking if already verified");
        if (!unverifiedUser) return;
        try {
            await sendEmailVerification(unverifiedUser);
            setResendMessage("Verification email sent — check your inbox");
        } catch (err) {
            console.error("Resend verification error:", err);
            setResendMessage("Couldn't resend right now, please try again shortly");
        }
    }

    return (
        <div className="logInOutContainer" id="logInPageContainer">
            <div className="logInOutTopOfPage" id="logInTopOfPage"></div>
            <div className="logInOutTitleContainer" id="logInTitleContainer">
                <h2>Log In</h2>
                <p className="logInOutSubtitle" id="logInSubtitle">Welcome back</p>
            </div>

            <div className="logInOutFormContainer" id="logInFormContainer">

                <p className="inputTitle">Email</p>
                <input
                    className="LogInInput"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                />

                <p className="inputTitle">Password</p>
                <input
                    className="LogInInput"
                    type="password"
                    placeholder="Enter your password"
                    value={formData.password}
                    onChange={e => setFormData(prev => ({ ...prev, password: e.target.value }))}
                />

                {error && <p id="logInError">{error}</p>}

                {unverifiedUser && (
                    <button id="resendVerificationBtn" onClick={handleResendVerification}>
                        Resend verification email
                    </button>
                )}
                {resendMessage && <p id="logInResendMessage">{resendMessage}</p>}

                <button id="logInBtn" onClick={handleLogin} disabled={submitting}>
                    {submitting ? "Logging in..." : "Log In"}
                </button>

                <div id="logInOrDivider">
                    <span></span>
                    <p>or</p>
                    <span></span>
                </div>

                <button className="logInOutGoogleBtn" onClick={handleGoogleLogin} disabled={submitting}>
                    Continue with Google
                </button>

                <p id="logInSignUpPrompt">
                    Don't have an account?{" "}
                    <span id="logInSignUpLink" onClick={goToSignUp}>Sign up</span>
                    <span> </span>with Ogren Ecommerce Manager
                </p>

            </div>
        </div>
    );
}

export default LogIn;