import React, { useState } from 'react';
import { Card, Button, Spinner, FormGroup, Label } from 'reactstrap';
import firebase from 'firebase';
const STATE_DEFAULT = 'Save';
const STATE_SAVING = 'Saving';
const STATE_SAVED = 'Saved';



export const SlideUploader = ( attributes ) => {
	console.log(attributes.lecture_id);
	const [slides, setSlides] = useState("");
	const [componentState, setComponentState] = useState(STATE_DEFAULT);
	const [slideLinks, setSlideLinks] = useState([])
	
	function handleUpload(file) {
	    if (!file) {
	        alert("Please choose a file first!");
			return 1;
	    }

		var storage = firebase.storage();
	
		// TODO: find a way to put the lecture session id (game name?) into the path here!!
		storage.ref(`lectureSlides/${attributes.lecture_id}/${slides.name}`).put(slides)
		.then(snapshot => {
			snapshot.ref.getDownloadURL()
			.then((url) => {
				console.log("download the file at: " + url);
				setSlideLinks(slideLinks.concat(url));
				console.log(slideLinks);
			});
		});

		return 0;
		
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
						if (handleUpload(slides) == 0) {
							setComponentState(STATE_SAVED);
						} else {
							setComponentState(STATE_DEFAULT);
						}
					}}
				>
					{componentState} {/** Saved, Saving or Saved (useState) */}
				</Button>
				}
			</Card>
		</div>
	);
};
