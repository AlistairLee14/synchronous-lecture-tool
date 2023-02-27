const firebase = require("firebase");

var REACT_APP_FIREBASE_CONFIG={
  "apiKey": "AIzaSyCgz1Jo6ueG0pTIC4mwhaD6kGa0ehIWLsQ",
    "authDomain": "synchronous-lecture-tool.firebaseapp.com",
    "projectId": "synchronous-lecture-tool",
    "storageBucket": "synchronous-lecture-tool.appspot.com",
    "messagingSenderId": "237302221266",
    // "appId": "1:237302221266:web:373375efd019c40b81e00b",
    "appId": "1:237302221266:web:486cc51643874cba81e00b",
    // "measurementId": "G-YSQFTPKE7E"
    "measurementId": "G-TB78VJS4SG",
    "databaseURL": "https://synchronous-lecture-tool.firebaseio.com"

}

var string = JSON.stringify(REACT_APP_FIREBASE_CONFIG);
// console.log(string);
const FIREBASE_CONFIG = JSON.parse(string);


class BaseStore {
  constructor(props) {
    // workaround to prevent initializing multiple times
    if (!firebase.apps.length) {
      firebase.initializeApp(FIREBASE_CONFIG);
      // firebase.firestore.setLogLevel('debug');
    }

    this.firestore = firebase.firestore();
    this.auth = firebase.auth();
  }
}

export default BaseStore;
