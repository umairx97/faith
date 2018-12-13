import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyC9c5anTI82-EuBeHFuVWXE2zpIsht-DgE",
    authDomain: "faithmeetslove-d4d6a.firebaseapp.com",
    databaseURL: "https://faithmeetslove-d4d6a.firebaseio.com",
    projectId: "faithmeetslove-d4d6a",
    storageBucket: "faithmeetslove-d4d6a.appspot.com",
    messagingSenderId: "390674890211"
};
const settings = { timestampsInSnapshots: true };
firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings(settings);

export default firebase;
