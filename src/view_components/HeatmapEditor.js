import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/storage';
import MyPdfViewer from './MyPdfViewer';

const HeatmapEditor = ({ gameId }) => {
  const [pdfUrl, setPdfUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storage = firebase.storage();

    try {
      const pdfRef = storage.ref(`lectureSlides/${gameId}/CS355_LAB1.pdf`);
      pdfRef.getDownloadURL().then((url) => {
        setPdfUrl(url);
        console.log("url: " + url);
        setLoading(false);
      });
    } catch (error) {
      console.error("Error retrieving PDF data: ", error);
    }
  }, [gameId]);

  if (loading) {
    return <div>Loading PDF data...</div>;
  }

  return (
    <div>
      <h1>Heatmap Editor {gameId}</h1>
      <MyPdfViewer pdfUrl={pdfUrl} />
    </div>
  );
};

export default HeatmapEditor;
