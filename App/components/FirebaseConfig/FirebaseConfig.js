import * as firebase from "firebase";
import "firebase/firestore";

const config = {
  apiKey: "AIzaSyCICR1Xph4oS4Rk0Ew0-XkYrkK_F-yzIPo",
  authDomain: "faith-meets.firebaseapp.com",
  databaseURL: "https://faith-meets.firebaseio.com",
  projectId: "faith-meets",
  storageBucket: "faith-meets.appspot.com",
  messagingSenderId: "314942341001"
};
const settings = { timestampsInSnapshots: true };
firebase.initializeApp(config);
const firestore = firebase.firestore();
firestore.settings(settings);

export default firebase;
