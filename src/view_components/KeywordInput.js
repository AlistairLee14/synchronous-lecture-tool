import React, { useState, useEffect } from 'react';
import { startTimer } from '../utils/calculateTimeLeft';

import * as firebase from "firebase/app";
import "firebase/database";
import { Button } from 'reactstrap';


const KeywordInput = ({ gameId, keywordCooldown, setKeywordCooldown }) => {
    const [keyword, setKeyword] = useState('');

    useEffect(() => {
        const keywordsRef = firebase.firestore().collection(`gameId/${gameId}/keywords`);

        return () => {
            keywordsRef.off();
        };
    }, [gameId]);

    const submitKeyword = () => {
        if (!keyword.trim()) {
            return;
        }
        // Write the keyword to the Firebase database
        const keywordsRef = firebase.firestore().collection(`gameId/${gameId}/keywords`);
        keywordsRef.add({
            keyword,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(function(docRef) {
        })
        .catch(function(error) {
            console.error("Error adding keyword: ", error);
        });
        
        startTimer({ seconds: 5, intervalCallback: setKeywordCooldown, endedCallback: () => setKeywordCooldown(0) });
		setKeywordCooldown(5);
        setKeyword(''); // reset the keyword state after submitting
    }

    return (

        (keywordCooldown <= 0) ?
        (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <form>
                    <label 
                        style={{ 
                            color: 'black', 
                            textDecoration: 'none', 
                            ":hover": {
                            textDecoration: 'none'
                            }
                        }} >
                        Enter a keyword:
                    </label>
                    <input
                    style={{ width: "100%", height: "40px" }}
                    type="text"
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                    />
                    <Button
                    style={{ marginTop: "20px" }}
                    color="primary"
                    onClick={() => {
                        submitKeyword(gameId, keyword);
                        setKeywordCooldown(5);
                    }}
                    >
                    Submit
                    </Button>
                </form>
            </div>
        )
        :
        (
            <div style={{ padding: "20px", textAlign: "center" }}>
                <form>
                    <label 
                        style={{ 
                            color: 'black', 
                            textDecoration: 'none', 
                            ":hover": {
                            textDecoration: 'none'
                            }
                        }} >
                        Please wait to submit another keyword
                    </label>
                    <input
                    style={{ width: "100%", height: "40px" }}
                    type="text"
                    value={keyword}
                    onChange={(event) => {
                        setKeyword(event.target.value);
                    }}
                    />
                    <Button
                    disabled
                    style={{ marginTop: "20px" }}
                    color="primary"
                    
                    >
                    Submit
                    </Button>
                </form>
            </div>
        )
        
        
    );
};


export default KeywordInput;