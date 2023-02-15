import React, { useState, useEffect } from 'react';
import * as firebase from "firebase/app";
import "firebase/database";

const KeywordInput = ({ gameId }) => {
  const [keyword, setKeyword] = useState('');

  useEffect(() => {
    const database = firebase.database();
    const keywordsRef = database.ref(`keywords/${gameId}`);

    return () => {
      keywordsRef.off();
    };
  }, [gameId]);

  const handleSubmit = (event) => {
    event.preventDefault();

    const database = firebase.database();
    const keywordsRef = database.ref(`keywords/${gameId}`);

    keywordsRef.push({ keyword });
    setKeyword('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
      />
      <button type="submit">Add Keyword</button>
    </form>
  );
};

export default KeywordInput;
