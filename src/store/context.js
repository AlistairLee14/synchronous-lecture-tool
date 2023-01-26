import React from 'react'
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyCgz1Jo6ueG0pTIC4mwhaD6kGa0ehIWLsQ",
  authDomain: "synchronous-lecture-tool.firebaseapp.com",
  projectId: "synchronous-lecture-tool",
  storageBucket: "synchronous-lecture-tool.appspot.com",
  messagingSenderId: "237302221266",
  appId: "1:237302221266:web:373375efd019c40b81e00b",
  measurementId: "G-YSQFTPKE7E"
};
firebase.initializeApp(firebaseConfig);

const StoreContext = React.createContext(firebase.firestore());
export const StoreProvider = StoreContext.Provider
export default StoreContext
