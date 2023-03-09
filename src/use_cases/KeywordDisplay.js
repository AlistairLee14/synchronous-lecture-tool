import React, { useState, useEffect, useRef } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import FinalResultsRoute from '../routes/FinalResultsRoute';
import { Card } from 'reactstrap';

var firebaseConfig = {
    apiKey: "AIzaSyCgz1Jo6ueG0pTIC4mwhaD6kGa0ehIWLsQ",
    authDomain: "synchronous-lecture-tool.firebaseapp.com",
    projectId: "synchronous-lecture-tool",
    storageBucket: "synchronous-lecture-tool.appspot.com",
    messagingSenderId: "237302221266",
    // appId: "1:237302221266:web:373375efd019c40b81e00b",
    // measurementId: "G-YSQFTPKE7E"
    appId: "1:237302221266:web:486cc51643874cba81e00b",
    measurementId: "G-TB78VJS4SG",
    databaseURL: "https://synchronous-lecture-tool.firebaseio.com"

  };

// firebase.initializeApp(firebaseConfig);
const firestore = firebase.firestore();

function fuzzyMatch(string, array) {
    // Remove whitespaces and convert to lowercase
    string = string.replace(/\s/g, '').toLowerCase();
    
    // Calculate the Levenshtein distance for each string in the array
    for (let i = 0; i < array.length; i++) {
        let s = array[i].replace(/\s/g, '').toLowerCase();
        let distance = levenshteinDistance(string, s);
        console.log("word: " + s + ", distance: " + distance);
        
        // If the distance is below a certain threshold, consider it a match
        if (distance <= 4) {
            return true;
        }
    }
    
    // If no matches were found, return false
    return false;
}
  
  // Implementation of the Levenshtein distance algorithm
function levenshteinDistance(s, t) {
    let m = s.length;
    let n = t.length;
    let d = [];
    
    // Initialize the matrix
    for (let i = 0; i <= m; i++) {
        d[i] = [i];
    }
    for (let j = 0; j <= n; j++) {
        d[0][j] = j;
    }

    // Calculate the matrix
    for (let j = 1; j <= n; j++) {
        for (let i = 1; i <= m; i++) {
            if (s[i-1] === t[j-1]) {
                d[i][j] = d[i-1][j-1];
            } else {
                d[i][j] = Math.min(
                    d[i-1][j] + 1, // deletion
                    d[i][j-1] + 1, // insertion
                    d[i-1][j-1] + 1 // substitution
                );
                
                // Check for transposition
                if (i > 1 && j > 1 && s[i-1] === t[j-2] && s[i-2] === t[j-1]) {
                    d[i][j] = Math.min(
                        d[i][j],
                        d[i-2][j-2] + 1 // transposition
                    );
                }
            }
        }
    }

    // Return the Levenshtein-Damerau distance
    return d[m][n];
}

function removeAlmostDuplicates(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let isDuplicate = false;
        for (let j = i + 1; j < array.length; j++) {
            let distance = levenshteinDistance(array[i], array[j]);
            if (distance < 2) {
                isDuplicate = true;
                break;
            }
        }
        if (!isDuplicate) {
            result.push(array[i]);
        }
    }
    return result;
}

function removeWhitespaceAndPunctuation(array) {
    let result = [];
    for (let i = 0; i < array.length; i++) {
        let cleanString = array[i].replace(/[^\w\s]/g, '').replace(/\s/g, '');
        result.push(cleanString);
    }
    return result;
}

const KeywordDisplay = ({gameId}) => {
    const [keywords, setKeywords] = useState([]);
    const [strongKeywords, setStrongKeywords] = useState([]);
    const contentRef = useRef(null);

    useEffect(() => {
        // Set up useEffect with a listener to the collection in Firebase, via onSnapshot()
        const unsubscribe = firebase.firestore().collection(`gameId/${gameId}/keywords`).onSnapshot((snapshot) => {

            // Initialise new keywords and strongKeywords arrays
            const updatedKeywords = [];
            const updatedStrongKeywords = [];

            // Add each word to keywords, and strongKeywords if appropriate
            snapshot.forEach((doc) => {

                if (fuzzyMatch(doc.data().keyword, updatedKeywords)) {
                    updatedStrongKeywords.push(doc.data().keyword);
                    console.log("pushing " + doc.data().keyword);
                }
                updatedKeywords.push(doc.data().keyword);

            });

            // Set the state variables keywords and strongKeywords
            setKeywords(updatedKeywords);
            setStrongKeywords(updatedStrongKeywords);
        });
    
        return () => {
            unsubscribe();
        };
    }, [gameId]);
  
    return (
        <div style={{ height: '0 auto', userSelect: 'none' }}>
            <div style={{ marginBottom: '10px',textAlign: 'left', fontWeight: "bold", fontSize: "20px", width: '100%' }}>
                Keywords:
            </div>

            <div style={{ height: '0 auto',display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
            {removeAlmostDuplicates(removeWhitespaceAndPunctuation(strongKeywords)).length === 0 ? (
                <div style={{
                    background: "#A7C7E7",
                    borderRadius: "30px",
                    padding: "15px 30px",
                    margin: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5A5A5A",
                    fontSize: "20px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                }}>
                No keywords yet
                </div>
            ) : (
                removeAlmostDuplicates(removeWhitespaceAndPunctuation(strongKeywords)).map((keyword, index) => (
                <div
                    key={index}
                    style={{
                    background: "#A7C7E7",
                    borderRadius: "30px",
                    padding: "15px 30px",
                    margin: "15px",
                    fontWeight: "bold",
                    textAlign: "center",
                    color: "#5A5A5A",
                    fontSize: "20px",
                    boxShadow: "2px 2px 5px rgba(0,0,0,0.1)"
                    }}
                >
                    {keyword}
                </div>
                ))
            )}
            </div>


        </div>
    );

  };

export default KeywordDisplay;
