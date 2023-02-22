import React, { useState, useEffect } from 'react';
import firebase from "firebase/app";
import "firebase/firestore";

const DifficultyCounter = (props) => {
    const { gameId } = props;
    const [difficultyCount, setDifficultyCount] = useState(0);
    const fiveMinutesAgo = new Date(Date.now() - 1000 * 60 * 5);

    useEffect(() => {
        if (!firebase.apps.length) {
            console.log("firebase issue");
            firebase.initializeApp({
                // your Firebase configuration
            });
        }

        const db = firebase.firestore();

        const unsubscribe = db.collection(`gameId/${gameId}/difficulty_points`)
        .where('timestamp', '>', fiveMinutesAgo)
        .onSnapshot(snapshot => {
            setDifficultyCount(snapshot.size);
        });

        return () => unsubscribe();
    }, [gameId]);

    return (
        <div style={{ userSelect: 'none' }}>
            <div style={{ marginBottom: '10px',textAlign: 'left', fontWeight: "bold", fontSize: "20px", width: '100%' }}>
                Difficulty Points (Last 5 Minutes): 
            </div>
            <div style={{fontWeight:'bold', fontSize:'50px'}}>
                {difficultyCount}
            </div>
            
        </div>
    );
};

export default DifficultyCounter;
