import app from 'firebase/app';
import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD_qrRz0HxWE3xBMHLP8fjTf-ZgT0C_eRs",
  authDomain: "reactnavigation-78eeb.firebaseapp.com",
  projectId: "reactnavigation-78eeb",
  storageBucket: "reactnavigation-78eeb.appspot.com",
  messagingSenderId: "676214400058",
  appId: "1:676214400058:web:120934eafa13896ee14103"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const storage = firebase.storage();
export const db = app.firestore();

