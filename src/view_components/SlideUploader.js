import React, { useState } from 'react';
import { Card, Button, Spinner, FormGroup, Label } from 'reactstrap';
import { getDownloadURL } from "firebase/storage";
import firebase from 'firebase';
const STATE_DEFAULT = 'default';
const STATE_SAVING = 'saving';



export const SlideUploader = ( ) => {
	const [slides, setSlides] = useState("");
	const [componentState, setComponentState] = useState(STATE_DEFAULT);

	const updateSelectedFile = (selectedFile) => {
		setSlides(Object.assign({}, slides, selectedFile));
	}
	
	function handleUpload(file) {
	    if (!file) {
	        alert("Please choose a file first!");
			return;
	    }

		var storage = firebase.storage();
	
		storage.ref(`lectureSlides/${slides.name}`).put(slides)
		.then(snapshot => {
			snapshot.ref.getDownloadURL()
			.then((url) => {
				console.log("download the file at: " + url);
			});
		});
		
	}

	return (
		<div>
			<Card body className="mt-4 mb-4">
				
				<FormGroup>
					<Label for="slideFileUpload">Upload your lecture slides as a PDF:</Label>

					<input
					type="file"
					name="slideFileUpload"
					id="slideFileUpload"
					data-testid="slideFileUpload"
					onChange={(e) => setSlides(e.target.files[0]) }
					/>
				</FormGroup>

				{componentState === STATE_SAVING ?
				<Button disabled color="primary" className="mt-4">
					<Spinner type="grow" size="sm" color="info" className="mr-2" />
					Saving...
				</Button>
				:
				<Button
					color="primary"
					className="mt-4"
					onClick={() => {
						setComponentState(STATE_SAVING);
						handleUpload(slides);
						setComponentState(STATE_DEFAULT);
					}}
				>
					Save
				</Button>
				}
			</Card>
		</div>
	);
};
