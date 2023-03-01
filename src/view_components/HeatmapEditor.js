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
	const [highlightedPdfUrl, setHighlightedPdfUrl] = useState(null);
	const [annotations, setAnnotations] = useState([]);
	const [highlightImageData, setHighlightImageData] = useState(null);
	const [highlightImageUrl, setHighlightImageUrl] = useState(null);
	const iframeRef = useRef(null);

	useEffect(() => {
		const storage = firebase.storage();

		try {
		const pdfRef = storage.ref(`lectureSlides/${gameId}/CS355_LAB1.pdf`);

		pdfRef.getDownloadURL().then((url) => {
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

	const handleHighlight = async (event) => {
		const { x, y, width, height } = iframeRef.current.getBoundingClientRect();
		const mouseX = event.clientX - x;
		const mouseY = event.clientY - y;
		const currentPage = pdfDoc.getPages()[0];
		const annotationsCopy = annotations.slice();
		const pdfWidth = currentPage.getSize().width;
		const pdfHeight = currentPage.getSize().height;
		const actualWidth = (pdfWidth * width) / iframeRef.current.offsetWidth;
		const actualHeight = (pdfHeight * height) / iframeRef.current.offsetHeight;
	
		// Create a canvas element to capture the highlighted area as an image
		const canvas = document.createElement("canvas");
		canvas.width = actualWidth;
		canvas.height = actualHeight;
		const context = canvas.getContext("2d");
	
		// Wait for the iframe to load before calling drawImage()
		iframeRef.current.addEventListener("load", () => {
			context.drawImage(iframeRef.current.contentWindow, mouseX, mouseY, actualWidth, actualHeight, 0, 0, actualWidth, actualHeight);
			const imageDataUrl = canvas.toDataURL("image/png");
	
			// Set the captured image as the highlight image URL
			setHighlightImageUrl(imageDataUrl);
	
			const annotation = {
				x: mouseX,
				y: mouseY,
				width: actualWidth,
				height: actualHeight,
				color: { r: 255, g: 255, b: 0 },
			};
			annotationsCopy.push(annotation);
			setAnnotations(annotationsCopy);
		});
	};
	
	
	  

	const handleSave = async () => {
		const storage = firebase.storage();
	
		// Create a new PDF document with highlights
		const pdfDocCopy = await PDFDocument.load(buffer);
		const page = pdfDocCopy.getPages()[0];
		for (const annotation of annotations) {
			const { x, y, width, height, color } = annotation;
			const highlightImage = await fetch(highlightImageUrl).then((res) => res.blob());
			const highlightImageBytes = await new Promise((resolve) => {
				const reader = new FileReader();
				reader.readAsArrayBuffer(highlightImage);
				reader.onloadend = () => resolve(new Uint8Array(reader.result));
			});
			const highlightAppearanceStream = await pdfDocCopy.embedPng(highlightImageBytes);
			const highlightAnnotation = page.createAnnotation("Highlight")
				.setRectangle([x, y, x + width, y + height])
				.setColor(rgb(color.r / 255, color.g / 255, color.b / 255))
				.setAppearance(highlightAppearanceStream);
			page.node.Annots.push(highlightAnnotation);
		}
		const highlightedPdfBytes = await pdfDocCopy.save();
	
		// Save highlighted PDF to Firebase
		try {
			const pdfRef = storage.ref(`highlightedLectureSlides/${gameId}/CS355_LAB1.pdf`);
			await pdfRef.put(highlightedPdfBytes);
			console.log("Highlighted PDF saved to Firebase.");
		} catch (error) {
			console.error("Error saving highlighted PDF to Firebase: ", error);
		}
	};
	

	if (loading) {
		return <div>Loading PDF data...</div>;
	}

	return (
	<div>
		{/* <h1>Heatmap Editor {gameId}</h1> */}
		<iframe
			title="pdf-viewer"
			ref={iframeRef}
			src={highlightedPdfUrl || pdfUrl}
			frameBorder="0"
			style={{ width: "100%", height: "60vh" }}
		></iframe>
		
		<button onClick={handleHighlight}>Highlight</button>
		<button onClick={handleSave}>Save</button>

	</div>
	);
};

export default HeatmapEditor;