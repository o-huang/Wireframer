import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// THIS IS USED TO INITIALIZE THE firebase OBJECT
// PUT YOUR FIREBASE PROJECT CONFIG STUFF HERE
var firebaseConfig = {
    apiKey: "AIzaSyDg2zNHE48vHb3CRHJs-I5tdH07Oiq-sJk",
    authDomain: "wireframedatabase.firebaseapp.com",
    databaseURL: "https://wireframedatabase.firebaseio.com",
    projectId: "wireframedatabase",
    storageBucket: "wireframedatabase.appspot.com",
    messagingSenderId: "98833289853",
    appId: "1:98833289853:web:f00acb951a860729cb9714",
    measurementId: "G-W7G4WN7SZ8"
};
firebase.initializeApp(firebaseConfig);

// NOW THE firebase OBJECT CAN BE CONNECTED TO THE STORE
export default firebase;