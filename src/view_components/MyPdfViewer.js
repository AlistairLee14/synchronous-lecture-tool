import React, { useState, useEffect } from 'react';
import { PDFDocument, Document, Page } from "pdf-lib";

const MyPdfViewer = ({ pdfUrl }) => {
  const [pdf, setPdf] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfPages, setPdfPages] = useState([]);

useEffect(() => {
    (async () => {
        try {
            console.log("url: " + pdfUrl);
            const res = await fetch(pdfUrl, {  });
            console.log("res: ");
            console.log(res);
            const pdfData = await res.arrayBuffer();

            if (!pdfData) {
                throw new Error("No PDF data found");
            }

            let pdfDoc;
            try {
                pdfDoc = pdfData && pdfData.byteLength > 0 && await PDFDocument.load(pdfData);
                console.log(pdfDoc);

            } catch (error) {
                console.error("Error loading PDF document: ", error);
            }

            if (!pdfDoc) {
                throw new Error("Error loading PDF document");
            }
            
            setPdf(pdfDoc);
            let pages = pdfDoc.getPages();
            setNumPages(pages.length);
            setPdfPages(pages);
        
        } catch (error) {
            console.error("Error fetching PDF data: ", error);
        }
    })();

}, [pdfUrl]);

    function handlePrevious() {
        setPageNumber(pageNumber - 1);
    }

    function handleNext() {
        setPageNumber(pageNumber + 1);
    }

    if (!pdf) {
        return <div>Loading PDF data...</div>;
    }

    return (
        <div>
            <PDFDocument pdf={pdf}>
                <Page pageNumber={pageNumber} />
            </PDFDocument>
            <div>
                <p>
                    Page {pageNumber} of {numPages}
                </p>
                <button disabled={pageNumber <= 1} onClick={handlePrevious}>
                    Previous
                </button>
                <button disabled={pageNumber >= numPages} onClick={handleNext}>
                    Next
                </button>
            </div>
        </div>
    );
};

export default MyPdfViewer;
