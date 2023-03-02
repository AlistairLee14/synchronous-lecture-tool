import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const CountTracker = ({ gameId }) => {
    const [counts, setCounts] = useState({});

    useEffect(() => {
        const countsRef = firebase.firestore().collection(`gameId/${gameId}/DifficultPages`);
        const unsubscribe = countsRef.onSnapshot((snapshot) => {
            snapshot.docChanges().forEach((change) => {
                const selectedPage = change.doc.id;
                const count = change.doc.data().count;
                setCounts((prevCounts) => ({ ...prevCounts, [selectedPage]: count }));
            });
        });
        return unsubscribe;
    }, [gameId]);

    return (
        <table>
            <thead>
                <tr>
                    <th>Selected Page</th>
                    <th>Count</th>
                </tr>
            </thead>
            <tbody>
                {Object.keys(counts).map((selectedPage) => (
                    <tr key={selectedPage}>
                        <td>{selectedPage}</td>
                        <td>{counts[selectedPage]}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CountTracker;
