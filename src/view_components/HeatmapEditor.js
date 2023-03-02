import React, { useState, useEffect, useRef } from "react";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";

const HeatmapEditor = ({ gameId }) => {
	const [pdfUrl, setPdfUrl] = useState(null);
	const [loading, setLoading] = useState(true);
	const [buffer, setBuffer] = useState(null);
	const [pdfDoc, setPdfDoc] = useState(null);
    const [selectedPage, setSelectedPage] = useState(0);
	const [highlightedPdfUrl, setHighlightedPdfUrl] = useState(null);
	const [annotations, setAnnotations] = useState([]);
	const [highlightImageData, setHighlightImageData] = useState(null);
	const [highlightImageUrl, setHighlightImageUrl] = useState(null);
    const [pageCount, setPageCount] = useState(0);
	const iframeRef = useRef(null);
	const [pdfLoading, setPdfLoading] = useState(true);

	// useEffect(() => {
	// 	const storage = firebase.storage();

	// 	try {
	// 	const pdfRef = storage.ref(`lectureSlides/${gameId}/CS355_LAB1.pdf`);

	// 	pdfRef.getDownloadURL().then((url) => {
	// 		fetch(url)
	// 		.then((res) => {
	// 			const reader = res.body.getReader();
	// 			return new ReadableStream({
	// 			start(controller) {
	// 				return pump();
	// 				function pump() {
	// 				return reader.read().then(({ done, value }) => {
	// 					// When no more data needs to be consumed, close the stream
	// 					if (done) {
	// 					controller.close();
	// 					return;
	// 					}
	// 					// Enqueue the next data chunk into our target stream
	// 					controller.enqueue(value);
	// 					return pump();
	// 				});
	// 				}
	// 			},
	// 			});
	// 		})
	// 		.then((stream) => new Response(stream))
	// 		.then((response) => response.arrayBuffer())
	// 		.then((buf) => setBuffer(buf));
	// 	});
	// 	} catch (error) {
	// 	console.error("Error retrieving PDF data: ", error);
	// 	}
	// }, [gameId]);

	useEffect(() => {
		const storage = firebase.storage();
		
		try {
		  const slidesRef = storage.ref(`lectureSlides/${gameId}`);
		  slidesRef.listAll().then((result) => {
			if (result.items.length > 0) {
			  result.items[0].getDownloadURL().then((url) => {
				fetch(url)
				  .then((res) => {
					const reader = res.body.getReader();
					return new ReadableStream({
					  start(controller) {
						return pump();
						function pump() {
						  return reader.read().then(({ done, value }) => {
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
				  .then(async (buf) => {
					setBuffer(buf);
					const pdfDoc = await PDFDocument.load(buf);
					const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
					setPageCount(pdfDoc.getPageCount());
					setPdfDoc(pdfDoc);
					setPdfUrl(pdfDataUri);
					setPdfLoading(false);
				  });
			  });
			}
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

            setPageCount(pdfDoc.getPageCount())
			setPdfDoc(pdfDoc);
			setPdfUrl(pdfDataUri);
			setLoading(false);
		};
		helper();
	}, [buffer]);

	useEffect(() => {
		if (!pdfDoc) return;

		const helper = async () => {
		const page = pdfDoc.getPages()[0];

		const annotationsCopy = annotations.slice();
		for (const annotation of annotationsCopy) {
			const { x, y, width, height, color } = annotation;

			const highlightImageRes = await fetch(highlightImageUrl);
			const highlightImageArrayBuffer = await highlightImageRes.arrayBuffer();
			const highlightAppearanceStream = pdfDoc.register(
			await pdfDoc.embedPng(highlightImageArrayBuffer)
			);
			const highlightAnnotation = page
			.createAnnotation("Highlight")
			.setRectangle([x, y, x + width, y + height])
			.setColor(rgb(color.r / 255, color.g / 255, color.b / 255))
			.setAppearance(highlightAppearanceStream.ref);
			page.node.Annots.push(highlightAnnotation.ref);
		}

		const highlightedPdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
		setHighlightedPdfUrl(highlightedPdfDataUri);
		};
		helper();
	}, [pdfDoc, annotations, highlightImageUrl]);

	const saveCount = () => {
		console.log("selected page:", selectedPage);
	
		const countRef = firebase.firestore().doc(`gameId/${gameId}/DifficultPages/${selectedPage}`);
	
		firebase.firestore().runTransaction(function(transaction) {
			return transaction.get(countRef).then(function(doc) {
				const newCount = (doc.exists ? doc.data().count + 1 : 1);
				transaction.set(countRef, { count: newCount, timestamp: firebase.firestore.FieldValue.serverTimestamp() });
			});
		}).then(function() {
			console.log("Count added to firestore", selectedPage);
		}).catch(function(error) {
			console.error("Error adding count: yunh", error);
		});
	}


	if (loading) {
		return <div>Loading PDF data...</div>;
	}

	return (
		<div>
		  {pdfLoading && <div>Loading PDF data...</div>}
		  {!pdfLoading && (
			<>
			  <iframe
				title="pdf-viewer"
				ref={iframeRef}
				src={highlightedPdfUrl || pdfUrl}
				frameBorder="0"
				style={{ width: "100%", height: "60vh" }}
			  ></iframe>
			  <div style={{ display: "flex", justifyContent: "center" }}>
				<button onClick={saveCount}>Select Page</button>
				<select
				  name=""
				  id=""
				  onChange={(e) => setSelectedPage(e.target.value)}
				>
				  {Array(pageCount)
					.fill()
					.map((_, i) => i + 1)
					.map((i) => (
					  <option key={i} value={i}>
						{i}
					  </option>
					))}
				</select>
			  </div>
			</>
		  )}
		</div>
	  );
};

export default HeatmapEditor;