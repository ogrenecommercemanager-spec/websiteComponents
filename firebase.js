import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getDownloadURL, ref, getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };

export const storage = getStorage(app); 
export const auth = getAuth(app);

export const getImageUrl = async (path) => {
    if (!path) return null;

    try {
        const storageRef = ref(storage, `businesses/${businessID}/images/${path}`);
        let url = await getDownloadURL(storageRef);
        return url
    } catch (error) {
        if (error.code !== 'storage/object-not-found') {
            console.log("Unexpected storage error: ", error);
        }

        try {
            const oldRef = ref(storage, `candle_images/${path}`);
            let url = await getDownloadURL(oldRef);
            return url;
        } catch (fallbackError) {
            return null;
        }
    }
};

if (window.location.hostname === "localhost") {
  self.FIREBASE_APPCHECK_DEBUG_TOKEN = "be2e003b-5ec9-4910-86aa-60e4aab41138";
}

const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider("6LfUyWAtAAAAANcwI1YfNeYSI7KzlLTol7GM3-tA"),
  isTokenAutoRefreshEnabled: true
});

export { app, appCheck };
