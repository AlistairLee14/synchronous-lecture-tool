import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";
import fuzzysort from 'fuzzysort';
import FinalResultsRoute from '../routes/FinalResultsRoute';

const firebaseConfig = {
	// your Firebase configuration
	apiKey: "AIzaSyCgz1Jo6ueG0pTIC4mwhaD6kGa0ehIWLsQ",
	authDomain: "synchronous-lecture-tool.firebaseapp.com",
	projectId: "synchronous-lecture-tool",
	storageBucket: "synchronous-lecture-tool.appspot.com",
	messagingSenderId: "237302221266",
	appId: "1:237302221266:web:373375efd019c40b81e00b",
	measurementId: "G-YSQFTPKE7E", 	
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
                    d[i-1][j] + 1,
                    d[i][j-1] + 1,
                    d[i-1][j-1] + 1
                );
            }
        }
    }
    
    // Return the Levenshtein distance
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
  
    useEffect(() => {
        const unsubscribe = firebase.firestore().collection(`gameId/${gameId}/keywords`).onSnapshot((snapshot) => {
            const updatedKeywords = [];
            const updatedStrongKeywords = [];
            console.log("unsubscribe running");
            snapshot.forEach((doc) => {

                if (fuzzyMatch(doc.data().keyword, updatedKeywords)) {
                    updatedStrongKeywords.push(doc.data().keyword);
                    console.log("pushing " + doc.data().keyword);
                }
                updatedKeywords.push(doc.data().keyword);

            });
            setKeywords(updatedKeywords);
            setStrongKeywords(updatedStrongKeywords);
            // If a keyword has a strength < 10 then we want to make it a strongKeyword?
        });
    
        return () => {
            unsubscribe();
        };
    }, [gameId]);
  
    return (
        <div style={{ userSelect: 'none' }}>
            <div style={{ marginBottom: '10px',textAlign: 'left', fontWeight: "bold", fontSize: "20px", width: '100%' }}>
                Keywords:
            </div>
            {/* keywords is the targets of fuzzysort.go() */}
            {/* real list: 
            {strongKeywords && strongKeywords.length > 0 ? removeAlmostDuplicates(removeWhitespaceAndPunctuation(strongKeywords)).join(", ") : "No keywords yet"}
            <br/>
            <br/>
            all strongkeywords: 
            {strongKeywords.join(", ")}

            <br/>
            <br/>
            all keywords: 
            {keywords && keywords.length > 0 ? keywords.join(", ") : "No keywords yet"} */}

<div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
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
