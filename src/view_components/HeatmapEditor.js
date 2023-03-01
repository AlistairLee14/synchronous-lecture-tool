import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

const HeatmapEditor = ({ gameId }) => {
    const [pdfUrl, setPdfUrl] = useState(null);
    const [loading, setLoading] = useState(true);
    const [buffer, setBuffer] = useState(null);
    const iframeRef = useRef(null);

    useEffect(() => {
        const storage = firebase.storage();

        try {
            const pdfRef = storage.ref(
                `lectureSlides/${gameId}/CS355_LAB1.pdf`
            );

            pdfRef.getDownloadURL().then((url) => {
                fetch(url)
                    .then((res) => {
                        const reader = res.body.getReader();
                        return new ReadableStream({
                            start(controller) {
                                return pump();
                                function pump() {
                                    return reader
                                        .read()
                                        .then(({ done, value }) => {
                                            // When no more data needs to be consumed, close the stream
                                            if (done) {
                                                controller.close();
                                                return;
                                            }
                                            // Enqueue the next data chunk into our target stream
                                            controller.enqueue(value);
                                            return pump();
                                        });
                                }
                            },
                        });
                    })
                    .then((stream) => new Response(stream))
                    .then((response) => response.arrayBuffer())
                    .then((buf) => setBuffer(buf));
            });
        } catch (error) {
            console.error("Error retrieving PDF data: ", error);
        }
    }, [gameId]);

    useEffect(() => {
        if (!buffer) return;

        const helper = async () => {
            console.log("buffer", buffer);
            const pdfDoc = await PDFDocument.load(buffer);
            const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });

            setPdfUrl(pdfDataUri);
            setLoading(false);
        };
        helper();
    }, [buffer]);

    if (loading) {
        return <div>Loading PDF data...</div>;
    }

    return (
        <div>
            <h1>Heatmap Editor {gameId}</h1>
			<iframe title="pdf-viewer" ref={iframeRef} src={pdfUrl} frameborder="0" style={{ width: '100%', height: '60vh' }}></iframe>
            {/* <MyPdfViewer pdfUrl={pdfUrl} gameId={gameId} /> */}
        </div>
    );
};

export default HeatmapEditor;