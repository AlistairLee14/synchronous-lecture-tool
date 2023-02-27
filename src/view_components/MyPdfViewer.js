import React, { useEffect, useRef } from 'react';
import WebViewer from '@pdftron/webviewer';

const MyPdfViewer = ({ pdfUrl, gameId }) => {
  let viewerRef = useRef<HTMLDivElement>(null);
  console.log(pdfUrl + ", " + gameId);
  console.log('path:', 'lib');

  useEffect(() => {

    WebViewer({
        path: '/dist/public/webviewer',
      }, document.getElementById('viewer'))
        .then(instance => {
          const { UI, Core } = instance;
          const { documentViewer, annotationManager, Tools, Annotations } = Core;
          // call methods from UI, Core, documentViewer and annotationManager as needed
      
          documentViewer.addEventListener('documentLoaded', () => {
            // call methods relating to the loaded document
          });
      
          instance.UI.loadDocument(pdfUrl);
        })
  }, [pdfUrl]);

  return (
    <div id="viewer" style={{ height: '100vh' }} />
  );
};

export default MyPdfViewer;
